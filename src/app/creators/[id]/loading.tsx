import Pagination from "@/components/pagination";
import CardGridSkeleton from "@/components/cardGridSkeleton";

export default function Loading() {
  return (
    <main>
      <section className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-12">
        <aside className="prose max-w-none">
          <div className="bg-slate-200 w-full aspect-square mb-3"></div>
          <h1 className="bg-slate-200 h-10 w-1/3"></h1>
          <p className="bg-slate-200 h-5 w-1/3"></p>
          <p className="bg-slate-200 h-5 w-1/3"></p>
          <div>
            <span className="inline-block bg-slate-200 h-5 w-1/3"></span>
            <br />
            <span className="inline-block bg-slate-200 h-5 w-1/3"></span>
            <br />
            <span className="inline-block bg-slate-200 h-5 w-1/3"></span>
            <br />
            <span className="inline-block bg-slate-200 h-5 w-1/3"></span>
          </div>
        </aside>
        <article className="prose max-w-none">
          <h2 className="bg-slate-200 h-10 w-1/3"></h2>
          <p className="bg-slate-200 h-10 full"></p>
          <p className="bg-slate-200 h-5 w-3/4"></p>
          <p className="bg-slate-200 h-15 w-full"></p>
          <p className="bg-slate-200 h-5 w-3/4"></p>
          <p className="bg-slate-200 h-20 w-full"></p>
          <p className="bg-slate-200 h-5 w-3/4"></p>
          <p className="bg-slate-200 h-10 full"></p>
          <p className="bg-slate-200 h-5 w-3/4"></p>
          <p className="bg-slate-200 h-15 w-full"></p>
          <p className="bg-slate-200 h-10 full"></p>
          <p className="bg-slate-200 h-5 w-3/4"></p>
        </article>
      </section>
      <section className="container mx-auto p-6">
        <h2 className="text-3xl font-title font-semibold mb-4 bg-slate-200 h-10 w-1/3"></h2>

        <CardGridSkeleton amount={7} />

        <Pagination totalPages={3} className="mt-5" />
      </section>
    </main>
  );
}
