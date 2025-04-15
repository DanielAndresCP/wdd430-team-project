export async function fetchReviewsByProductId(productId: string) {
    const res = await fetch(`/api/reviews?productId=${productId}`, {
      method: 'GET',
      cache: 'no-store',
    });
  
    if (!res.ok) throw new Error('Failed to fetch reviews');
    const data = await res.json();
    return data.reviews;
  }