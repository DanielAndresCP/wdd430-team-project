"use client";

import { formatCurrency } from "@/utils/formatting";
import VerticalImageCard from "./verticalImageCard";
import { PencilIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { DeleteProductState, deleteProduct } from "@/app/lib/product-actions";
import { useActionState, useState } from "react";

export default function AdminProductCard({
  productId,
  imageSrc,
  name,
  price,
  description,
  href,
  width,
  height,
  className = "",
}: {
  productId: string;
  imageSrc: string;
  name: string;
  price: number;
  description: string;
  href: string;
  width: number;
  height: number;
  className?: string;
}) {
  const initialState: DeleteProductState = { message: null, errors: {} };
  const [state, formAction] = useActionState(deleteProduct, initialState);

  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <VerticalImageCard
      imageSrc={imageSrc}
      imageAlt={`Product image of ${name}`}
      width={width}
      height={height}
      className={className}
    >
      <h3 className="text-2xl font-title font-medium">{name}</h3>
      <p className="text-sm mb-3">Price: {formatCurrency(price)}</p>
      <p>{description}</p>
      <div className="mt-3">
        <Link
          href="#"
          className="inline-block w-12 py-1 px-2 max-w-10 rounded-full bg-blue-900 text-white mr-2"
        >
          <span className="sr-only">Edit {name}</span>
          <PencilIcon />
        </Link>
        {/* I don't know why but only with inline-flex and inline-grid it doesn't have a margin on the top */}
        <form action={formAction} className="inline-flex">
          <input type="hidden" name="productId" value={productId} />
          {confirmDelete ? (
            <button
              type="submit"
              className="inline w-15 py-1 px-2 max-w-15 m-0 rounded-full bg-red-900 text-white cursor-pointer text-sm"
              aria-describedby="productId-error"
            >
              Sure?
            </button>
          ) : (
            <span
              className="inline w-12 py-1 px-2 max-w-10 m-0 rounded-full bg-red-900 text-white cursor-pointer"
              onClick={() => {
                setConfirmDelete(true);
              }}
            >
              <span className="sr-only">Delete {name}</span>
              <TrashIcon />
            </span>
          )}
          <div id="productId-error" aria-live="polite" aria-atomic="true">
            {state.errors?.productId &&
              state.errors.productId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </form>
      </div>
    </VerticalImageCard>
  );
}
