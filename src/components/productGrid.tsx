import ProductCard from "./productCard";

import spoonImage from "&/products/spoon.png";

export default function ProductGrid({
  query,
  page = 0,
}: {
  query: string;
  page?: number;
}) {
  // TODO: Change this when the DB exists
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

  return (
    <div
      className="grid gap-6 justify-items-center grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))]"
    >
      {products.map((x) => (
        <ProductCard key={x.name} {...x} className="max-w-xs" />
      ))}
    </div>
  );
}
