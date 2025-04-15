import clsx from "clsx";

export default function HorizontalImageCardSkeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <article className={clsx("h-full min-h-48 w-full overflow-hidden rounded-xl bg-white grid grid-cols-1 sm:grid-cols-2 gap-6", className)}>
      <div className="h-full bg-slate-200"></div>
      <div className="max-sm:px-6 max-sm:pb-6 sm:py-6 sm:pr-6">
        <p className="bg-slate-200 h-5 mb-2"></p>
        <p className="bg-slate-200 h-3 w-2/3"></p>
      </div>
    </article>
  );
}
