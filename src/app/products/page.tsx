import Link from "next/link";
import { getAllProducts } from "@/app/lib/product-actions";
import Image from "next/image";

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <main className="p-6 max-w-6xl mx-auto font-[var(--font-literata)]">
      <h1 className="text-3xl font-bold text-terracota-dark mb-6">
        All Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
          >
            <Image
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-48 object-cover rounded-md"
              width={320}
              height={190}
            />
            <h2 className="text-xl font-semibold text-terracota-dark mt-2">
              {product.title}
            </h2>
            <p className="text-gray-600">${product.price}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
