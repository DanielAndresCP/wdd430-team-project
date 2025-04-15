import { Metadata } from "next";

import SearchFilters from "@/components/searchFilters";
import ProductGrid from "@/components/productGrid";
import CreatorGrid from "@/components/creatorGrid";
import Pagination from "@/components/pagination";
import CardGridSkeleton from "@/components/cardGridSkeleton";

import { fetchCategories } from "../lib/category-actions";
import { fetchSellersPages } from "../lib/user-actions";
import { fetchProductPages } from "../lib/product-actions";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Search",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    "creators-page"?: string;
    "products-page"?: string;
    "min-price"?: string;
    "max-price"?: string;
    categories?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const minPrice = searchParams?.["min-price"] || "";
  const maxPrice = searchParams?.["max-price"] || "";
  const categoriesParam = searchParams?.categories || "";
  const creatorsPage = Number(searchParams?.["creators-page"]) || 1;
  const productsPage = Number(searchParams?.["products-page"]) || 1;

  const categories = await fetchCategories({});

  // If there is no query or filters, we return with a message to the user and the option to set filters.
  if (!query && !minPrice && !maxPrice && !categoriesParam) {
    return (
      <main>
        <section className="container mx-auto p-6 flex flex-col-reverse sm:flex-row gap-6">
          <SearchFilters categories={categories} />
          <div className="prose max-w-none">
            <h1>No search query or filters were provided</h1>
            <p>
              Please use the search bar or filters find products and sellers
            </p>
          </div>
        </section>
      </main>
    );
  }

  const sellersQuery = JSON.stringify({
    name: {
      contains: query,
      mode: "insensitive",
    },
    // This makes the settings filter conditional
    ...(categoriesParam && {
      // This filters if one of the specialties matches one of the selected categories
      // The OR is to workaround the behaviour of array_contains (which checks if all
      // the elements are contained on the specialties property)
      OR: categoriesParam.split(",").map((x) => ({
        settings: {
          path: ["specialties"],
          array_contains: x.trim(),
        },
      })),
    }),
  });

  const productsQuery = JSON.stringify({
    title: {
      contains: query,
      mode: "insensitive",
    },
    price: {
      gte: minPrice ? Number(minPrice) : undefined,
      lte: maxPrice ? Number(maxPrice) : undefined,
    },
    description: {
      contains: query,
      mode: "insensitive",
    },
    categoryId: {
      in: categoriesParam
        ? categoriesParam.split(",").map((x) => x.trim())
        : undefined,
    },
  });

  const [sellerAmountResult, productAmountResult] = await Promise.allSettled([
    fetchSellersPages(sellersQuery),
    fetchProductPages(productsQuery),
  ]);

  if (
    sellerAmountResult.status === "rejected" ||
    productAmountResult.status === "rejected"
  ) {
    throw Error("Error fetching the pages of the product results");
  }

  return (
    <main>
      <h1 className="container mx-auto px-6 pt-6 text-3xl font-title">
        {sellerAmountResult.value.totalAmount +
          productAmountResult.value.totalAmount}{" "}
        results{" "}
        {/* This is conditional because the user can search using just the filters and no search query */}
        {query && `for "${query}"`}
      </h1>
      <section className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-12">
        <aside>
          <SearchFilters categories={categories} />
        </aside>
        <div>
          <div>
            <h2 className="font-title text-3xl mb-3">Artisans and Crafters</h2>
            {productAmountResult.value.totalPages === 0 ? (
              <p>No search results</p>
            ) : (
              <>
                <Suspense
                  fallback={
                    <CardGridSkeleton
                      amount={Math.min(
                        sellerAmountResult.value.amountPerPage,
                        sellerAmountResult.value.totalAmount
                      )}
                    />
                  }
                >
                  <CreatorGrid
                    query={sellersQuery}
                    cardStyle="small"
                    page={creatorsPage}
                  />
                </Suspense>
                <Pagination
                  totalPages={sellerAmountResult.value.totalPages}
                  className="mt-6"
                  pageParam="creators-page"
                />
              </>
            )}
          </div>
          <div className="mt-6">
            <h2 className="font-title text-3xl mb-3">Products</h2>
            {productAmountResult.value.totalPages === 0 ? (
              <p>No search results</p>
            ) : (
              <>
                <Suspense
                  fallback={
                    <CardGridSkeleton
                      amount={Math.min(
                        productAmountResult.value.amountPerPage,
                        productAmountResult.value.totalAmount
                      )}
                    />
                  }
                >
                  <ProductGrid query={productsQuery} page={productsPage} />
                </Suspense>
                <Pagination
                  totalPages={productAmountResult.value.totalPages}
                  className="mt-6"
                  pageParam="products-page"
                />
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
