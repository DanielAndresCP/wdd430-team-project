"use server";
import { PrismaClient } from "@prisma/client";
import { fuseFilters } from "./filterParsing";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "../../../auth";

const prisma = new PrismaClient();
const PRODUCTS_PER_PAGE = 10;

export async function fetchProducts(query: string, page: number) {
  const offset = (page - 1) * PRODUCTS_PER_PAGE;

  const options: { skip: number; take: number; where: Object } = {
    skip: offset,
    take: PRODUCTS_PER_PAGE,
    where: fuseFilters(query),
  };

  const result = await prisma.product.findMany(options);

  return result;
}

export async function fetchProductPages(query: string) {
  const options = {
    where: fuseFilters(query),
  };

  const result = await prisma.product.count(options);

  return {
    totalPages: Math.ceil(result / PRODUCTS_PER_PAGE),
    totalAmount: result,
    amountPerPage: PRODUCTS_PER_PAGE,
  };
}

export async function getAllProducts() {
  return await prisma.product.findMany({
    include: {
      seller: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        seller: {
          select: {
            name: true,
            email: true,
          },
        },
        reviews: {
          include: {
            user: {
              select: { name: true },
            },
          },
        },
      },
    });

    return product;
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    return null;
  }
}

const DeleteProductSchema = z.object({
  productId: z.string({ message: "Product ID missing when expected" }),
});

export type DeleteProductState = {
  errors?: {
    productId?: string[];
  };
  message?: string | null;
};

export async function deleteProduct(
  prevState: DeleteProductState,
  formData: FormData
) {
  const validatedFields = DeleteProductSchema.safeParse({
    productId: formData.get("productId"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Delete Product",
    };
  }

  const { productId } = validatedFields.data;

  try {
    await prisma.review.deleteMany({ where: { productId: productId } });
    await prisma.product.delete({ where: { id: productId } });
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Failed to Delete Product" };
  }

  revalidatePath("/settings/products");
  redirect("/settings/products");
}

const productSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.string().transform((val) => parseFloat(val)),
  imageUrl: z.string().url(),
  categoryId: z.string().min(1),
});

export async function createProduct(formData: {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  categoryId: string;
}) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "SELLER") {
      return { success: false, message: "Unauthorized" };
    }

    const parsed = productSchema.safeParse(formData);
    if (!parsed.success) {
      return { success: false, message: "Invalid product data" };
    }

    const seller = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!seller) {
      return { success: false, message: "User not found" };
    }

    await prisma.product.create({
      data: {
        ...parsed.data,
        sellerId: seller.id,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("❌ Error creating product:", error);
    return { success: false, message: "Something went wrong" };
  }
}

const editProduct = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().positive(),
  imageUrl: z.string().url(),
  categoryId: z.string().min(1),
});

export async function updateProduct(formData: FormData) {
  try {
    const session = await auth();

    if (!session?.user?.email || session.user.role !== "SELLER") {
      return { success: false, message: "Unauthorized" };
    }

    const parsed = editProduct.safeParse({
      id: formData.get("id"),
      title: formData.get("title"),
      description: formData.get("description"),
      price: formData.get("price"),
      imageUrl: formData.get("imageUrl"),
      categoryId: formData.get("categoryId"),
    });

    if (!parsed.success) {
      return { success: false, message: parsed.error.errors[0].message };
    }

    const product = await prisma.product.findUnique({
      where: { id: parsed.data.id },
      include: { seller: true },
    });

    if (!product || product.seller.email !== session.user.email) {
      return { success: false, message: "Product not found or access denied" };
    }

    await prisma.product.update({
      where: { id: parsed.data.id },
      data: {
        title: parsed.data.title,
        description: parsed.data.description,
        price: parsed.data.price,
        imageUrl: parsed.data.imageUrl,
        categoryId: parsed.data.categoryId,
      },
    });

    return { success: true };
  } catch (err) {
    console.error("❌ Error updating product:", err);
    return { success: false, message: "Something went wrong" };
  }
}
