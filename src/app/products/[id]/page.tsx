import { getProductById } from '@/app/lib/product-actions';
import { auth } from '../../../../auth';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ReviewSection from '@/components/ReviewSection';

export default async function ProductDetailPage({
  params,
}: {
  readonly params: { readonly id: string };
}) {
  const product = await getProductById(params.id);
  const session = await auth();

  if (!product) {
    return notFound();
  }

  return (
    <main className="max-w-5xl mx-auto p-6 font-[var(--font-literata)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={600}
            height={400}
            className="w-full rounded-lg object-cover"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-terracota-dark font-[var(--font-playfair-display)]">
            {product.title}
          </h1>
          <p className="text-lg text-gray-700 mt-4">{product.description}</p>
          <p className="text-2xl font-semibold text-terracota-medium mt-6">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-4 text-sm text-gray-600">
            Category: <strong>{product.category.displayName}</strong>
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Artisan: <strong>{product.seller.name}</strong>
          </p>
        </div>
      </div>

      <ReviewSection productId={product.id} user={session?.user} />
    </main>
  );
}
