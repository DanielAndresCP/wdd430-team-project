import Button from "@/components/button";
import ProductCard from "@/components/productCard";
import CreatorCard from "@/components/creatorCard";

import johnWoodImage from "&/creators/john-wood.png";
import spoonImage from "&/products/spoon.png";

const products = [
  {
    description: "Some description of a super cool product",
    name: "Some Product",
    price: 100,
    imageSrc: spoonImage.src,
    width: spoonImage.width,
    height: spoonImage.height,
    href: "#",
  },
  {
    description: "Some description of a super cool product",
    name: "Some Product 2",
    price: 100,
    imageSrc: spoonImage.src,
    width: spoonImage.width,
    height: spoonImage.height,
    href: "#",
  },
  {
    description: "Some description of a super cool product",
    name: "Some Product 3 with long name",
    price: 100,
    imageSrc: spoonImage.src,
    width: spoonImage.width,
    height: spoonImage.height,
    href: "#",
  },
  {
    description:
      "Some description of a super cool product with ultra long description to test how does the overflow work",
    name: "Some Product 4",
    price: 100,
    imageSrc: spoonImage.src,
    width: spoonImage.width,
    height: spoonImage.height,
    href: "#",
  },
  {
    description: "Some description of a super cool product",
    name: "Some Product 5",
    price: 100,
    imageSrc: spoonImage.src,
    width: spoonImage.width,
    height: spoonImage.height,
    href: "#",
  },
];

const creators = [
  {
    imageSrc: johnWoodImage.src,
    height: johnWoodImage.height,
    width: johnWoodImage.width,
    name: "John Wood",
    specialty: "Woodworking",
    description:
      "I like making some cool wooden spoons, this is some lorem ipsum dolor sit amet, some more lorem ipsum dolor sit amet, and even more lorem ipsum dolor sit amet",
    href: "#",
  },
  {
    imageSrc: johnWoodImage.src,
    height: johnWoodImage.height,
    width: johnWoodImage.width,
    name: "John Wood 2",
    specialty: "Woodworking",
    description:
      "I like making some cool wooden spoons, this is some lorem ipsum dolor sit amet, some more lorem ipsum dolor sit amet, and even more lorem ipsum dolor sit amet",
    href: "#",
  },
  {
    imageSrc: johnWoodImage.src,
    height: johnWoodImage.height,
    width: johnWoodImage.width,
    name: "John Wood 3",
    specialty: "Woodworking",
    description:
      "I like making some cool wooden spoons, this is some lorem ipsum dolor sit amet, some more lorem ipsum dolor sit amet, and even more lorem ipsum dolor sit amet",
    href: "#",
  },
  {
    imageSrc: johnWoodImage.src,
    height: johnWoodImage.height,
    width: johnWoodImage.width,
    name: "John Wood 4",
    specialty: "Woodworking",
    description:
      "I like making some cool wooden spoons, this is some lorem ipsum dolor sit amet, some more lorem ipsum dolor sit amet, and even more lorem ipsum dolor sit amet",
    href: "#",
  },
];

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
            <Button text="See all products" type="terracota" />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
          {products.map((x) => (
            <ProductCard key={x.name} {...x} className="max-w-xs" />
          ))}
        </div>
      </section>
      <section className="p-6 mt-4">
        <h2 className="text-3xl font-title font-semibold mb-4">
          Featured Artisans and Crafters
        </h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 justify-items-center">
          {creators.map((x) => (
            <CreatorCard
              key={x.name}
              {...x}
              className="max-w-lg sm:max-w-4xl"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
