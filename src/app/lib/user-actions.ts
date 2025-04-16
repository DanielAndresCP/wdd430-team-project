"use server";

import { PrismaClient, User as UserType } from "@prisma/client";
import { fuseFilters } from "./filterParsing";
import { auth } from "../../../auth";
import { z } from "zod";
import { JsonObject } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const SELLERS_PER_PAGE = 5;

const SellerSettingsSchema = z.object({
  userId: z.string(),

  shortBio: z
    .string({ message: "Please provide a short biography" })
    .min(80, { message: "The short biography must be at least 80 characters" })
    .max(170, {
      message: "The short biography must be maximun 170 characters",
    }),

  fullBio: z
    .string({ message: "Please provide a full biography" })
    .min(700, { message: "The full biography must be at least 700 characters" })
    .max(2100, {
      message: "The full biography must be maximun 2100 characters",
    }),

  specialties: z.array(z.string()).nonempty({
    message: "Please provide at least 1 specialty",
  }),
});

const AccountSettingsSchema = z.object({
  userId: z.string(),

  displayName: z
    .string({ message: "Please provide a Display Name" })
    .min(3, { message: "The Display Name must be at least 3 characters" })
    .max(25, {
      message: "The Display Name must be maximun 25 characters",
    }),

  profilePicture: z
    .string()
    .nonempty({ message: "Please provide a Profile Picture" }),

  email: z
    .string({ message: "Please provide an Email" })
    .email({ message: "The email must be valid" }),
});

const ChangePasswordSchema = z
  .object({
    userId: z.string(),

    password: z
      .string({ message: "Please provide a Display Name" })
      .min(5, { message: "The password must be at least 5 characters" }),

    confirmPassword: z
      .string()
      .min(5, { message: "The password must be at least 5 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export async function fetchSellers(query: string, page: number) {
  const offset = (page - 1) * SELLERS_PER_PAGE;

  const options: { skip: number; take: number; where: object } = {
    skip: offset,
    take: SELLERS_PER_PAGE,
    where: fuseFilters(query, { role: "SELLER" }),
  };

  const result = await prisma.user.findMany(options);

  return result;
}

export async function fetchSellersPages(query: string) {
  const options = {
    where: fuseFilters(query, { role: "SELLER" }),
  };

  const result = await prisma.user.count(options);

  return {
    totalPages: Math.ceil(result / SELLERS_PER_PAGE),
    totalAmount: result,
    amountPerPage: SELLERS_PER_PAGE,
  };
}

export async function fetchSingleUser(email: string) {
  const result = await prisma.user.findUnique({ where: { email: email } });

  return result;
}

export async function hasPermissions(
  allowedRoles: Array<"USER" | "SELLER" | "ADMIN">
): Promise<{
  canPass: boolean;
  authorized: boolean;
  authenticated: boolean;
  userData?: UserType;
}> {
  const session = await auth();
  if (!session || !session.user?.email) {
    return {
      canPass: false,
      authenticated: false,
      authorized: false,
    };
  }

  const user = await fetchSingleUser(session.user.email);

  if (!user) {
    // Should we sign out?
    return { canPass: false, authenticated: false, authorized: false };
  }

  if (!allowedRoles.includes(user.role)) {
    return { canPass: false, authenticated: true, authorized: false };
  }

  return {
    canPass: true,
    authenticated: true,
    authorized: true,
    userData: user,
  };
}

export type State = {
  errors?: {
    userId?: string[];
    shortBio?: string[];
    fullBio?: string[];
    specialties?: string[];
  };
  message?: string | null;
};

export async function updateSellerSettings(
  prevState: State,
  formData: FormData
) {
  const validatedFields = SellerSettingsSchema.safeParse({
    userId: formData.get("userId"),
    shortBio: formData.get("shortBio"),
    fullBio: formData.get("fullBio"),
    specialties:
      formData.getAll("specialties").length > 0
        ? formData.getAll("specialties")
        : [],
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Seller Settings",
    };
  }

  const { fullBio, shortBio, specialties, userId } = validatedFields.data;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new Error("Missing User when one was expected");
    }

    const settings = {
      ...((user.settings ?? {}) as JsonObject),
      shortBio,
      fullBio,
      specialties: specialties || [],
    };

    await prisma.user.update({
      where: { id: userId },
      data: {
        settings: settings,
      },
    });
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Failed to Update Seller Settings" };
  }

  revalidatePath("/settings/seller");
  redirect("/settings/seller");
}

export type AccountSettingsState = {
  errors?: {
    userId?: string[];
    displayName?: string[];
    profilePicture?: string[];
    email?: string[];
  };
  message?: string | null;
};

export async function updateAccountSettings(
  prevState: State,
  formData: FormData
) {
  const validatedFields = AccountSettingsSchema.safeParse({
    userId: formData.get("userId"),
    displayName: formData.get("displayName"),
    profilePicture: formData.get("profilePicture"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Account Settings",
    };
  }

  const { displayName, email, profilePicture, userId } = validatedFields.data;

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        email: email,
        name: displayName,
        profilePictureUrl: profilePicture,
      },
    });
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Failed to Update Account Settings" };
  }

  revalidatePath("/settings/account");
  redirect("/settings/account");
}

export type PassChangeState = {
  errors?: {
    userId?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
};

export async function changePassword(
  prevState: PassChangeState,
  formData: FormData
) {
  const validatedFields = ChangePasswordSchema.safeParse({
    userId: formData.get("userId"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Account Password",
    };
  }

  const { password, userId } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Failed to Update Account Password" };
  }

  revalidatePath("/settings/account");
  redirect("/settings/account");
}

export async function fetchSingleUserById(id: string) {
  const result = await prisma.user.findUnique({
    where: { id: id },
    include: {
      products: {
        include: { reviews: true },
      },
      reviews: true,
    },
  });

  return result;
}
