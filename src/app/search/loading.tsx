import CardGridSkeleton from "@/components/cardGridSkeleton";
import Pagination from "@/components/pagination";

export default function Loading() {
  return (
    <main>
      <div className="container mx-auto px-6 pt-6 text-3xl font-title">
        <p className="bg-slate-200 h-10 w-lg"></p>
      </div>
      <section className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-12">
        <aside>
          <div className="p-6 rounded-xl bg-green-desaturated-light">
            <div>
              <h2 className="text-xl mb-3">Filters</h2>
              <p className="bg-slate-200 h-5 w-3/4 mb-2"></p>
              <p className="bg-slate-200 h-5 w-1/3 mb-2"></p>
              <p className="bg-slate-200 h-5 w-1/2 mb-2"></p>
              <p className="bg-slate-200 h-5 w-3/4 mb-2"></p>
              <p className="bg-slate-200 h-5 w-1/3 mb-2"></p>
              <p className="bg-slate-200 h-5 w-1/2 mb-2"></p>
              <p className="bg-slate-200 h-5 w-3/4 mb-2"></p>
              <p className="bg-slate-200 h-5 w-1/3 mb-2"></p>
              <p className="bg-slate-200 h-5 w-1/2 mb-2"></p>
              <p className="bg-slate-200 h-5 w-3/4 mb-2"></p>
              <p className="bg-slate-200 h-5 w-1/3 mb-2"></p>
              <p className="bg-slate-200 h-5 w-1/2 mb-2"></p>
              <div className="mt-6">
                <button
                  className="py-1 px-4 rounded-full w-20 h-8 bg-green-dark text-white mr-3 cursor-pointer"
                  type="submit"
                ></button>
              </div>
            </div>
          </div>
        </aside>
        <div>
          <div>
            <h2 className="font-title text-3xl mb-3">Artisans and Crafters</h2>
            <CardGridSkeleton amount={3} />

            <Pagination
              totalPages={2}
              className="mt-6"
              pageParam="creators-page"
            />
          </div>
          <div className="mt-6">
            <h2 className="font-title text-3xl mb-3">Products</h2>

            <>
              <CardGridSkeleton amount={10} />
              <Pagination
                totalPages={3}
                className="mt-6"
                pageParam="products-page"
              />
            </>
          </div>
        </div>
      </section>
    </main>
  );
}
