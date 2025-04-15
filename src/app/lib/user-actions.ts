import { PrismaClient } from "@prisma/client";
import { fuseFilters } from "./filterParsing";

const prisma = new PrismaClient();

const SELLERS_PER_PAGE = 5;

export async function fetchSellers(query: string, page: number) {
  const offset = (page - 1) * SELLERS_PER_PAGE;

  const options: { skip: number; take: number; where: Object } = {
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
