'use client';

import { useEffect, useState } from 'react';
import { fetchReviewsByProductId } from '@/app/lib/client/fetch-reviews';

type Review = {
  id: string;
  rating: number;
  comment: string;
  user: {
    name: string;
  };
};

export default function ReviewList({
  productId,
  refreshTrigger, // 👈 nuevo
}: {
  productId: string;
  refreshTrigger: number; // 👈 tipo número para trigger
}) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      setLoading(true);
      const data = await fetchReviewsByProductId(productId);
      setReviews(data);
      setLoading(false);
    }

    loadReviews();
  }, [productId, refreshTrigger]);

  if (loading) {
    return <p className="text-gray-500">Loading reviews...</p>;
  }

  if (reviews.length === 0) {
    return <p className="text-gray-600">No reviews yet.</p>;
  }

  return (
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
  );
}
