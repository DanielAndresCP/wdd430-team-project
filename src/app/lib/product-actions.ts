"use server";
import { PrismaClient } from "@prisma/client";
import { fuseFilters } from "./filterParsing";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
