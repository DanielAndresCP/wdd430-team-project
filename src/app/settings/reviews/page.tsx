import ReviewCard from "@/components/reviewCard";
import { fetchReviewsFromSeller } from "@/app/lib/review-actions";
import { hasPermissions } from "@/app/lib/user-actions";
import { redirect } from "next/navigation";
import { formatDate } from "@/utils/formatting";

export default async function Page() {
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

  const reviewsResult = await fetchReviewsFromSeller(permissions.userData.id);

  const reviews = reviewsResult.map((x) => ({
    date: formatDate(x.createdAt),
    productName: x.product.title,
    stars: x.rating,
    user: x.user.name,
    content: x.comment,
  }));

  return (
    <main>
      <h2 className="font-title text-2xl mb-6">Reviews to my products</h2>
      <div className="grid gap-6 justify-items-center sm:justify-items-normal grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]">
        {reviews.map((x, i) => (
          <ReviewCard
            key={i}
            date={x.date}
            productName={x.productName}
            stars={x.stars}
            user={x.user}
            content={x.content}
          />
        ))}
      </div>
    </main>
  );
}
