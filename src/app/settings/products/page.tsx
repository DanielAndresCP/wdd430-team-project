import Pagination from "@/components/pagination";
import AdminProductGrid from "@/components/adminProductGrid";
import ProductSearchBar from "@/components/productSearchBar";
import { Suspense } from "react";
import CardGridSkeleton from "@/components/cardGridSkeleton";

import { fetchProductPages } from "@/app/lib/product-actions";
import { redirect } from "next/navigation";
import { hasPermissions } from "@/app/lib/user-actions";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const page = searchParams?.page || 1;

  const permissions = await hasPermissions(["SELLER"]);
  if (!permissions.authenticated) {
    return redirect("/");
  }

  if (!permissions.authorized) {
    return redirect("/settings/account");
  }

  if (!permissions.userData) {
    throw new Error("User data is missing even though it was expected");
  }

  const productsQuery = JSON.stringify({
    title: {
      contains: query,
      mode: "insensitive",
    },
    sellerId: permissions.userData.id,
  });

  const productAmountResult = await fetchProductPages(productsQuery);

  return (
    <main>
      <h2 className="font-title text-2xl mb-6">My Products</h2>
      <ProductSearchBar />
      {/* TODO: we need to redirect to the edit page, not the product page */}
      <Suspense
        fallback={<CardGridSkeleton amount={productAmountResult.totalAmount} />}
      >
        <AdminProductGrid query={productsQuery} page={Number(page)} />
      </Suspense>
      <Pagination
        totalPages={productAmountResult.totalPages}
        className="mt-6"
      />
    </main>
  );
}
