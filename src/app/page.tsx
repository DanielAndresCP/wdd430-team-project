import Link from "next/link";
import ProductGrid from "@/components/productGrid";
import CreatorGrid from "@/components/creatorGrid";

export default function Home() {
  return (
    <main className="container mx-auto">
      <section className="p-6 flex flex-col-reverse md:flex-row gap-6 items-center">
        <div className="grow">
          <div className="prose ml-auto">
            <h1>Handcrafted Haven</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non
              voluptate quasi obcaecati expedita animi eius atque odit delectus
              suscipit optio. Ratione quo natus qui? Voluptate similique
              necessitatibus incidunt enim voluptates?
            </p>
            <Link
              href="/search?min-price=0"
              className="py-1 px-4 rounded-full bg-terracota-dark text-black no-underline"
            >
              Search all products
            </Link>
          </div>
        </div>
        <div className="grow">
          <div className="max-w-md bg-slate-400 text-4xl p-6 aspect-[4/3]">
            (Some cool hero image)
          </div>
        </div>
      </section>
      <section className="p-6">
        <h2 className="text-3xl font-title font-semibold mb-4">
          Our top Products
        </h2>
        <ProductGrid query='' />
      </section>
      <section className="p-6 mt-4">
        <h2 className="text-3xl font-title font-semibold mb-4">
          Featured Artisans and Crafters
        </h2>
        <CreatorGrid query='' />
      </section>
    </main>
  );
}
