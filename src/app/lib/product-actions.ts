import { PrismaClient } from "@prisma/client";
import { fuseFilters } from "./filterParsing";

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
