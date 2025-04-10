import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/16/solid";

export default function StarRatingDisplay({
  stars,
  amountOfReviews,
}: {
  stars: number;
  amountOfReviews?: number;
}) {
  // Creates an array of 5 elements, with true for each star and false for a non-earned star
  const starArray = [
    ...Array(stars).fill(true),
    ...Array(5 - stars).fill(false),
  ];

  const starClassname = "inline-block w-4 text-green-dark";

  return (
    <>
      <div className="inline-grid grid-cols-5 gap-0.5">
        {starArray.map((x, i) =>
          x ? (
            <StarIconSolid key={i} className={starClassname} />
          ) : (
            <StarIconOutline key={i} className={starClassname} />
          )
        )}
      </div>
      {amountOfReviews && <span>({amountOfReviews})</span>}
    </>
  );
}
