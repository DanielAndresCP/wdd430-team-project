"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar({ className }: { className?: string }) {
  const handleSearch = (term: string) => {
    console.log("Missing implementation of search funcionality");
  };

  return (
    <div className={className}>
      <label htmlFor="search-text" className="sr-only">
        Search products and sellers
      </label>
      <div className="overflow-hidden px-4 py-2 h-12 flex flex-row gap-2 rounded-full bg-white text-black">
        {/* The search functionality will be implemented later */}
        <input
          type="text"
          name="search-text"
          id="search-text"
          placeholder="Search products and sellers"
          className="block w-full outline-0"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        <MagnifyingGlassIcon />
      </div>
    </div>
  );
}
