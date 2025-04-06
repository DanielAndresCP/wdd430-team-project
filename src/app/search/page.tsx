import { Metadata } from "next";

import SearchFilters from "@/components/searchFilters";
import ProductGrid from "@/components/productGrid";
import CreatorGrid from "@/components/creatorGrid";
import Pagination from "@/components/pagination";

export const metadata: Metadata = {
  title: "Search",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    // I think we don't need this one -Daniel
    // page?: string;
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

  // TODO: this must be fetched
  const categories = [
    { displayName: "Woodworking", id: "woodworking" },
    { displayName: "Furniture", id: "furniture" },
    { displayName: "Metalworking", id: "metalworking" },
  ];

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

  // TODO: replace these with fetched data
  const totalCreatorPages = 3;
  const totalProductPages = 5;

  return (
    <main>
      <h1 className="container mx-auto px-6 pt-6 text-3xl font-title">
        {totalCreatorPages + totalProductPages} results{" "}
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
            <CreatorGrid query="temp" cardStyle="small" />
            <Pagination
              totalPages={3}
              className="mt-6"
              pageParam="creators-page"
            />
          </div>
          <div className="mt-6">
            <h2 className="font-title text-3xl mb-3">Products</h2>
            <ProductGrid query="temp" />
            <Pagination
              totalPages={3}
              className="mt-6"
              pageParam="products-page"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
