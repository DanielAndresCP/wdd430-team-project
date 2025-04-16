"use client";

import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function ProductSearchBar() {
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
    <div className="mb-6 flex flex-row gap-4">
      <label htmlFor="search" className="sr-only">
        Search in My Products
      </label>
      <input
        type="text"
        placeholder="Search in My Products"
        id="search"
        className="block px-3 py-1 w-full rounded-full bg-white shadow-lg outline-none"
        defaultValue={searchParams.get("query") || ""}
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
  );
}
