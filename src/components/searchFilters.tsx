"use client";

import clsx from "clsx";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchFilters({
  categories: allCategories,
  className,
}: {
  categories: Array<{ id: string; displayName: string }>;
  className?: string;
}) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // This object holds the filters present on search params.
  // minPrice and maxPrice are equal to null if they are not present on the
  // searchParams (Number(undefined) is NaN, NaN is falsy so null is returned)
  const searchParamsFilters = {
    categories:
      new URLSearchParams(searchParams).get("categories")?.split(",") || [],
    minPrice:
      Number(new URLSearchParams(searchParams).get("min-price")) || null,
    maxPrice:
      Number(new URLSearchParams(searchParams).get("max-price")) || null,
  };

  // We set the inital states of the filters to the values
  // that were present on the search parama
  const [minPrice, setMinPrice] = useState<number | null>(
    searchParamsFilters.minPrice
  );
  const [maxPrice, setMaxPrice] = useState<number | null>(
    searchParamsFilters.maxPrice
  );
  const [selectedCategories, setSelectedCategories] = useState(
    searchParamsFilters.categories
  );

  // The handle functions for the min and max values make sure that the min value
  // is not greater than the max value if present and viceversa. When the value
  // tries to exit the boundary, it returns the boundary (if the min tries to
  // get past the max, it returns the max), this make a nice effect that when
  // one of them is unset while the other is, it automatically takes the first
  // available value when the unset one is set (trust me bro, it makes sense :))
  function handleMinValue(newValue: number) {
    setMinPrice(() => {
      if (maxPrice && newValue > maxPrice) {
        return maxPrice;
      }

      if (newValue === 0) {
        return null;
      }

      return newValue;
    });
  }

  function handleMaxValue(newValue: number) {
    setMaxPrice(() => {
      if (minPrice && newValue < minPrice) {
        return minPrice;
      }

      if (newValue === 0) {
        return null;
      }

      return newValue;
    });
  }

  function handleCategories(id: string, selected: boolean) {
    setSelectedCategories((c) => {
      if (!selected) {
        // Return the values that are not the category that was deselected
        return c.filter((x) => x !== id);
      }

      // Add the category
      return [...c, id];
    });
  }

  function handleFilter() {
    const params = new URLSearchParams(searchParams);

    // Reset the page numbers
    params.set("creators-page", "1");
    params.set("products-page", "1");

    // Set the filter params
    // (if there was a query, we don't alter it, so it remains the same)
    if (minPrice) {
      params.set("min-price", minPrice.toString());
    } else {
      params.delete("min-price");
    }

    if (maxPrice) {
      params.set("max-price", maxPrice.toString());
    } else {
      params.delete("max-price");
    }

    if (selectedCategories.length) {
      params.set("categories", selectedCategories.join(","));
    } else {
      params.delete("categories");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div
      className={clsx("p-6 rounded-xl bg-green-desaturated-light", className)}
    >
      <h2 className="text-xl">Filters</h2>
      <p className="mt-6">
        <b>Categories</b>
      </p>
      <div>
        {allCategories.map((x, i) => (
          <label key={i} className="block">
            <input
              type="checkbox"
              name={x.id}
              id={x.id}
              className="mr-2"
              defaultChecked={searchParamsFilters.categories.some(
                (px) => px === x.id
              )}
              onChange={(x) => {
                handleCategories(x.target.id, x.target.checked);
              }}
            />
            {x.displayName}
          </label>
        ))}
      </div>

      <p className="mt-6">
        <b>Price</b>
      </p>
      <div className="flex flex-row flex-nowrap gap-1">
        <label htmlFor="min-price" className="sr-only">
          Minimum price
        </label>
        <input
          type="number"
          name="min-price"
          id="min-price"
          placeholder="min"
          className="px-3 py-1 max-w-20 rounded-full bg-terracota-lighter outline-0"
          min={0}
          value={minPrice ?? ""}
          onChange={(x) => handleMinValue(Number(x.target.value))}
        />
        <span>
          <b>—</b>
        </span>
        <label htmlFor="max-price" className="sr-only">
          Maximun price
        </label>
        <input
          type="number"
          name="max-price"
          id="max-price"
          placeholder="max"
          className="px-3 py-1 max-w-20 rounded-full bg-terracota-lighter outline-0"
          min={0}
          value={maxPrice ?? ""}
          onChange={(x) => handleMaxValue(Number(x.target.value))}
        />
      </div>
      <div className="mt-6">
        <button
          className="py-1 px-4 rounded-full bg-green-dark text-white mr-3"
          onClick={handleFilter}
        >
          Filter
        </button>
      </div>
    </div>
  );
}
