import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function fetchReviewsFromSeller(sellerId: string) {
  const reviews = await prisma.review.findMany({
    where: {
      product: {
        sellerId: sellerId,
      },
    },
    include: {
      product: true,
      user: true,
    },
  });

  return reviews;
}
