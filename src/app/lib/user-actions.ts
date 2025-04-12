import { PrismaClient } from "@prisma/client";
import { fuseFilters } from "./filterParsing";

const prisma = new PrismaClient();

export async function fetchSellers(query: string, page: number) {
  const SELLERS_PER_PAGE = 10;
  const offset = (page - 1) * SELLERS_PER_PAGE;

  const options: { skip: number; take: number; where: Object } = {
    skip: offset,
    take: SELLERS_PER_PAGE,
    where: fuseFilters(query, { role: "SELLER" }),
  };

  const result = await prisma.user.findMany(options);

  return result;
}
