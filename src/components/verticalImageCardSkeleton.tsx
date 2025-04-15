import clsx from "clsx";

export default function VerticalImageCardSkeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <article
      className={clsx(
        "h-full w-full overflow-hidden rounded-xl bg-white",
        className
      )}
    >
      <div className="w-full aspect-square bg-slate-200"></div>
      <div className="p-6">
        <p className="bg-slate-200 h-5 mb-2"></p>
        <p className="bg-slate-200 h-3 w-2/3"></p>
      </div>
    </article>
  );
}
