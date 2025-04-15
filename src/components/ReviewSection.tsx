'use client';

import { useState, useEffect } from 'react';
import { fetchReviewsByProductId } from '@/app/lib/client/fetch-reviews';

export default function ReviewSection({
  productId,
  user,
}: {
  productId: string;
  user?: { name?: string; email?: string };
}) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadReviews = async () => {
    setLoading(true);
    const data = await fetchReviewsByProductId(productId);
    setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment, rating: Number(rating), productId }),
      });

      if (res.ok) {
        setComment('');
        setRating('');
        await loadReviews();
      } else {
        console.error('❌ Failed to submit review');
      }
    } catch (error) {
      console.error('❌ Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : null;

  return (
    <>
      {/* Review List */}
      <div className="mt-16 flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-terracota-dark">Reviews</h2>
        {averageRating && (
          <div className="flex items-center text-yellow-500 font-semibold">
            <span className="text-xl">★</span>
            <span className="ml-1 text-base text-gray-800">{averageRating}/5</span>
            <span className="ml-2 text-sm text-gray-500">({reviews.length})</span>
          </div>
        )}
      </div>

      {loading ? (
        <p className="text-gray-500">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-600">No reviews yet.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review.id} className="border-b pb-4">
              <p className="text-gray-700">
                <strong>{review.user.name}</strong>: {review.comment}
              </p>
              <p className="text-sm text-gray-500">Rating: {review.rating}/5</p>
            </li>
          ))}
        </ul>
      )}

      {/* Review Form */}
      {user ? (
        <section className="mt-12">
          <h3 className="text-xl font-semibold text-terracota-dark mb-2">Leave a Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              name="comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review here..."
              className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-terracota-medium"
            />
            <select
              name="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
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
              disabled={isSubmitting}
              className="px-4 py-2 bg-terracota-dark text-white rounded-md hover:bg-terracota-medium transition"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </section>
      ) : (
        <p className="mt-6 text-gray-600">
          You must <a href="/auth/login" className="text-terracota-medium underline">log in</a> to leave a review.
        </p>
      )}
    </>
  );
}