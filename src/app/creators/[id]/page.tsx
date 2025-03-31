import type { Metadata } from "next";

import Image from "next/image";
import ProductGrid from "@/components/productGrid";
import StarRatingDisplay from "@/components/starRatingDisplay";
import Pagination from "@/components/pagination";

import johnWodd from "&/creators/john-wood.png";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  // read route params
  const { id } = await params;

  // TODO fetch data
  const creator = { displayName: `${id} Creator` };

  return {
    title: creator.displayName,
  };
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  // TODO: this must fetch the creator
  const creator = {
    displayName: "John Wood",
    specialties: ["Woodworking", "Furniture", "Wooden Spoons"],
    shortBio:
      "I like making some cool wooden spoons, this is some lorem ipsum dolor sit amet, some more lorem ipsum dolor sit amet, and even more lorem ipsum dolor sit amet",
    joinDate: new Date().toISOString().split("T")[0],
    fullBio: `I still remember the first time I carved a wooden spoon. It was a rainy afternoon, and I was sitting in my grandfather’s old workshop, watching him work on a chair. I found a small scrap of wood, picked up a carving knife, and started whittling. The result was rough, uneven, and barely functional—but I was hooked.  

Growing up, I was always drawn to working with my hands. Whether it was fixing things around the house or sketching out ideas for small projects, I loved the process of creating something from nothing. But it wasn’t until years later, after working an unfulfilling office job, that I decided to turn my passion into my life’s work.  

Woodworking, for me, is more than just a craft—it’s a way of connecting with nature and tradition. I work primarily with locally sourced hardwoods, shaping each piece with care and patience. From sturdy farmhouse tables to delicate hand-carved spoons, I aim to create pieces that are not just functional but also full of character.  

A lot of my inspiration comes from old-world craftsmanship. I admire the way traditional artisans built things to last, with careful joinery and an eye for detail. Every time I pick up my tools, I strive to honor that legacy, making furniture and kitchenware that will stand the test of time.  

One of the most rewarding parts of my work is knowing that my pieces become part of people’s daily lives. A wooden spoon stirring a family meal, a dining table where stories are shared—these objects carry memories, and that’s what makes them special.  

My journey as a woodworker has been one of learning, patience, and a deep appreciation for the material itself. Wood has a way of teaching you—about resilience, adaptability, and the beauty of imperfections. No two pieces are ever the same, and that’s what makes this craft so endlessly fascinating.  

Whether you’re here to browse my work or simply share a love for handmade craftsmanship, I’m grateful to have you along for the journey.`,
  };

  // TODO: this must be fetched, and it is not actually the avg but the median
  const reviewsTotal = { avgRating: 4, amountOfReviews: 30 };

  // TODO: this must be fetched
  const productAmount = 5;

  return (
    <main>
      <section className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-12">
        <aside className="prose max-w-none">
          <Image
            src={johnWodd.src}
            width={johnWodd.width}
            height={johnWodd.height}
            alt={`Profile picture of ${creator.displayName}`}
            className="rounded-xl"
          />
          <h1>{creator.displayName}</h1>
          <p>
            <b>Specialties:</b> {creator.specialties.join(", ")}
          </p>
          <p>{creator.shortBio}</p>
          <div>
            <b>Products:</b> {productAmount}
            <br />
            <b>Join Date:</b> {creator.joinDate}
            <br />
            <b>Avg rating:</b>{" "}
            <StarRatingDisplay
              stars={reviewsTotal.avgRating}
              amountOfReviews={reviewsTotal.amountOfReviews}
            />
          </div>
        </aside>
        <article className="prose max-w-none">
          <h2>About Me</h2>
          {/* TODO: how will we handle text? */}
          {creator.fullBio.split("\n").map((x, i) => (
            <p key={i}>{x}</p>
          ))}
        </article>
      </section>
      <section className="container mx-auto p-6">
        <h2 className="text-3xl font-title font-semibold mb-4">
          {creator.displayName}'s Products
        </h2>
        <ProductGrid query="temp" />
        <Pagination totalPages={5} className="mt-5" />
      </section>
    </main>
  );
}
