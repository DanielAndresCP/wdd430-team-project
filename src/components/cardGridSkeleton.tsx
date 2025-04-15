import VerticalImageCardSkeleton from "./verticalImageCardSkeleton";
import HorizontalImageCardSkeleton from "./horizontalImageCardSkeleton";
import clsx from "clsx";

export default async function CardGridSkeleton({
  amount,
  type = "vertical",
}: {
  amount: number;
  type?: "vertical" | "horizontal";
}) {
  const products = [...new Array(amount).keys()];

  return (
    <div
      className={clsx("grid gap-6 justify-items-center", {
        "grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))]": type === "vertical",
        "grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))]":
          type === "horizontal",
      })}
    >
      {products.map((x) =>
        type === "vertical" ? (
          <VerticalImageCardSkeleton key={x} className="max-w-xs" />
        ) : (
          <HorizontalImageCardSkeleton key={x}  className="max-w-lg"/>
        )
      )}
    </div>
  );
}
