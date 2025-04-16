import type { Metadata } from "next";

import Image from "next/image";
import ProductGrid from "@/components/productGrid";
import StarRatingDisplay from "@/components/starRatingDisplay";
import Pagination from "@/components/pagination";
import { fetchSingleUserById } from "@/app/lib/user-actions";
import { redirect } from "next/navigation";
import { fetchCategories } from "@/app/lib/category-actions";
import { formatDate } from "@/utils/formatting";
import { fetchProductPages } from "@/app/lib/product-actions";
import { Suspense } from "react";
import CardGridSkeleton from "@/components/cardGridSkeleton";

function average(arr: number[]): number {
  if (arr.length === 0) return NaN;
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return sum / arr.length;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const creator = await fetchSingleUserById(id);

  return {
    title: creator?.name,
  };
}

export default async function Page(props: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const page = searchParams?.page || 1;
  const params = await props.params;
  const id = params.id;

  const creatorResult = await fetchSingleUserById(id);

  if (!creatorResult) {
    throw new Error("Creator expected but not found");
  }

  if (creatorResult.role !== "SELLER") {
    // If it is not a seller we redirect to homepage
    redirect("/");
  }

  const avgRating = Math.ceil(
    average(creatorResult.reviews.map((x) => x.rating))
  );

  const reviewsTotal = {
    avgRating,
    amountOfReviews: creatorResult.reviews.length,
  };

  const categories = await fetchCategories({
    where: {
      id: {
        in: (creatorResult.settings as { specialties: Array<string> })
          .specialties,
      },
    },
  });

  const creator = {
    displayName: creatorResult.name,
    specialties: categories.map((x) => x.displayName),
    shortBio: (creatorResult.settings as { shortBio: string }).shortBio,
    joinDate: formatDate(creatorResult.createdAt),
    contact: creatorResult.email,
    fullBio: (creatorResult.settings as { fullBio: string }).fullBio,
    profilePicUrl: creatorResult.profilePictureUrl,
  };

  const productsQuery = JSON.stringify({
    sellerId: id,
  });

  const productCountData = await fetchProductPages(productsQuery);

  return (
    <main>
      <section className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-12">
        <aside className="prose max-w-none">
          <Image
            src={creator.profilePicUrl}
            width={720}
            height={720}
            alt={`Profile picture of ${creator.displayName}`}
            className="rounded-xl"
          />
          <h1>{creator.displayName}</h1>
          <p>
            <b>Specialties:</b> {creator.specialties.join(", ")}
          </p>
          <p>{creator.shortBio}</p>
          <div>
            <b>Products:</b> {productCountData.totalAmount}
            <br />
            <b>Join Date:</b> {creator.joinDate}
            <br />
            <b>Avg rating:</b>{" "}
            <StarRatingDisplay
              stars={reviewsTotal.avgRating}
              amountOfReviews={reviewsTotal.amountOfReviews}
            />
            <br />
            <b>Contact for sales:</b> {creator.contact}
          </div>
        </aside>
        <article className="prose max-w-none">
          <h2>About Me</h2>
          {creator.fullBio.split("\n").map((x, i) => (
            <p key={i}>{x}</p>
          ))}
        </article>
      </section>
      <section className="container mx-auto p-6">
        <h2 className="text-3xl font-title font-semibold mb-4">
          {creator.displayName}'s Products
        </h2>
        <Suspense
          fallback={
            <CardGridSkeleton
              amount={Math.min(
                productCountData.amountPerPage,
                productCountData.totalAmount
              )}
            />
          }
        >
          <ProductGrid query={productsQuery} page={Number(page)} />
        </Suspense>
        <Pagination totalPages={productCountData.totalPages} className="mt-5" />
      </section>
    </main>
  );
}
