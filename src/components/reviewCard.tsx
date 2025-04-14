import clsx from "clsx";
import StarRatingDisplay from "./starRatingDisplay";

export default function ReviewCard({
  date,
  stars,
  content,
  user,
  productName,
  className,
}: {
  date: string;
  stars: number;
  content?: string | null;
  user: string;
  productName: string;
  className?: string;
}) {
  return (
    <article className={clsx("p-6 rounded-xl bg-white", className)}>
      <div className="flex flex-row items-center gap-2">
        <span>({date})</span>
        <StarRatingDisplay stars={stars} />
      </div>

      <h3 className="text-xl font-title font-medium">
        {user} on {productName}
      </h3>

      {content && <p className="mt-3">{content}</p>}
    </article>
  );
}
