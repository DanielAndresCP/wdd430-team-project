import { getProductById, submitReview } from '@/app/lib/product-actions';
import { auth } from '../../../../auth';
import { notFound } from 'next/navigation';
import Image from 'next/image';

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

      {/* Reviews Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-terracota-dark mb-4">Reviews</h2>
        {product.reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet.</p>
        ) : (
          <ul className="space-y-4">
            {product.reviews.map((review) => (
              <li key={review.id} className="border-b pb-4">
                <p className="text-gray-700">
                  <strong>{review.user.name}</strong>: {review.comment}
                </p>
                <p className="text-sm text-gray-500">Rating: {review.rating}/5</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Leave a Review */}
      {session?.user ? (
        <section className="mt-12">
          <h3 className="text-xl font-semibold text-terracota-dark mb-2">Leave a Review</h3>
          <form action={submitReview} className="space-y-4">
            <input type="hidden" name="productId" value={product.id} />
            <textarea
              name="comment"
              rows={4}
              placeholder="Write your review here..."
              className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-terracota-medium"
            />
            <select
              name="rating"
              required
              className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-terracota-medium"
            >
              <option value="">Select rating</option>
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-terracota-dark text-white rounded-md hover:bg-terracota-medium transition"
            >
              Submit Review
            </button>
          </form>
        </section>
      ) : (
        <p className="mt-6 text-gray-600">
          You must <a href="/auth/login" className="text-terracota-medium underline">log in</a> to leave a review.
        </p>
      )}
    </main>
  );
}
