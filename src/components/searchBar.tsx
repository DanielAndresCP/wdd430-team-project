"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar({ className }: { className?: string }) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const queryParam = new URLSearchParams(searchParams).get("query");

  const [query, setQuery] = useState(queryParam ? queryParam : "");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const processedQuery = query.trim().toLocaleLowerCase();

    if (processedQuery !== "") {
      const params = new URLSearchParams(searchParams);
      params.set("query", processedQuery);

      if (params.get("creators-page")) {
        params.set("creators-page", "1");
      }

      if (params.get("products-page")) {
        params.set("products-page", "1");
      }

      replace(`/search?${params.toString()}`);
    }
  }

  return (
    <div className={className}>
      <label htmlFor="search-text" className="sr-only">
        Search products and sellers
      </label>
      <div className="overflow-hidden px-4 py-2 h-12 flex flex-row gap-2 rounded-full bg-white text-black">
        <form onSubmit={handleSubmit} className="contents">
          <input
            type="text"
            name="search-text"
            id="search-text"
            placeholder="Search products and sellers"
            className="block w-full outline-0"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <button type="submit" className="contents cursor-pointer">
            <span className="sr-only">Search Icon</span>
            <MagnifyingGlassIcon />
          </button>
        </form>
      </div>
    </div>
  );
}
