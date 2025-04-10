"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Pagination from "@/components/pagination";
import ProductGrid from "@/components/productGrid";
import { useDebouncedCallback } from "use-debounce";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Page() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <main>
      <h2 className="font-title text-2xl mb-6">My Products</h2>
      <label htmlFor="search" className="sr-only">
        Search in My Products
      </label>
      <div className="mb-6 flex flex-row gap-4">
        <input
          type="text"
          placeholder="Search in My Products"
          id="search"
          className="block px-3 py-1 w-full rounded-full bg-white shadow-lg outline-none"
          onChange={(x) => {
            handleSearch(x.target.value);
          }}
        />
        <Link
          href="#"
          className="w-12 py-1 px-2 rounded-full bg-green-dark text-white"
        >
          <PlusCircleIcon />
          <span className="sr-only">Add a product</span>
        </Link>
      </div>
      {/* TODO: we need to redirect to the edit page, not the product page */}
      <ProductGrid query="temp" />
      <Pagination totalPages={2} className="mt-6" />
    </main>
  );
}
