'use server';
import { PrismaClient } from "@prisma/client";
import { fuseFilters } from "./filterParsing";
import { auth } from '../../../auth'
import { z } from "zod";

const prisma = new PrismaClient();

export async function fetchProducts(query: string, page: number) {
  const PRODUCTS_PER_PAGE = 10;
  const offset = (page - 1) * PRODUCTS_PER_PAGE;

  const options: { skip: number; take: number; where: Object } = {
    skip: offset,
    take: PRODUCTS_PER_PAGE,
    where: fuseFilters(query),
  };

  const result = await prisma.product.findMany(options);

  return result;
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
      createdAt: 'desc',
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
    console.error('❌ Error fetching product:', error);
    return null;
  }
}



const reviewSchema = z.object({
  comment: z.string().min(2, 'Comment is too short'),
  rating: z.coerce.number().min(1).max(5),
  productId: z.string().min(1),
});

export async function submitReview(_: any, formData: FormData) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      throw new Error('Not authenticated');
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const data = {
      comment: formData.get('comment'),
      rating: formData.get('rating'),
      productId: formData.get('productId'),
    };

    const parsed = reviewSchema.safeParse(data);

    if (!parsed.success) {
      throw new Error(parsed.error.errors[0].message);
    }

    await prisma.review.create({
      data: {
        comment: parsed.data.comment,
        rating: parsed.data.rating,
        productId: parsed.data.productId,
        userId: user.id,
      },
    });

    console.log('✅ Review submitted successfully!');
  } catch (err) {
    console.error('❌ Error submitting review:', err);
    throw err;
  }
}