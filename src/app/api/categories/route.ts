import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await prisma.category.findMany({
    select: { id: true, displayName: true },
    orderBy: { displayName: "asc" },
  });

  return NextResponse.json({ categories });
}
