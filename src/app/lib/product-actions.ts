import { PrismaClient } from "@prisma/client";
import { fuseFilters } from "./filterParsing";

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
  };
}
