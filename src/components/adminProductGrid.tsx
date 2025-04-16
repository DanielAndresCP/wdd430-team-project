"use server";
import AdminProductCard from "./adminProductCard";

import { fetchProducts } from "@/app/lib/product-actions";

export default async function AdminProductGrid({
  query,
  page = 1,
}: {
  query: string;
  page?: number;
}) {
  const fetchedProducts = await fetchProducts(query, page);

  const products = fetchedProducts.map((x) => ({
    ...x,
    imgWidth: 720,
    imgHeight: 720,
  }));

  return (
    <div className="grid gap-6 justify-items-center grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))]">
      {products.map((x) => (
        <AdminProductCard
          productId={x.id}
          key={x.title}
          description={x.description}
          imageSrc={x.imageUrl}
          name={x.title}
          price={x.price}
          height={x.imgHeight}
          width={x.imgWidth}
          className="max-w-xs"
        />
      ))}
    </div>
  );
}
