import { PrismaClient } from "@prisma/client";
import { fuseFilters } from "./filterParsing";

const prisma = new PrismaClient();

export async function fetchCategories(query: string | object) {
  const filters = fuseFilters(query);

  const result = await prisma.category.findMany(filters);

  return result;
}
