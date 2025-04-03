import CreatorCard from "./creatorCard";
import SmallCreatorCard from "./smallCreatorCard";

import johnWoodImage from "&/creators/john-wood.png";
import clsx from "clsx";

export default function CreatorGrid({
  query,
  page = 0,
  cardStyle = "normal",
}: {
  query: string;
  page?: number;
  cardStyle?: "normal" | "small";
}) {
  // TODO: Change this when the DB exists
  const creators = [
    {
      imageSrc: johnWoodImage.src,
      height: johnWoodImage.height,
      width: johnWoodImage.width,
      name: "John Wood",
      specialty: "Woodworking",
      description:
        "I like making some cool wooden spoons, this is some lorem ipsum dolor sit amet, some more lorem ipsum dolor sit amet, and even more lorem ipsum dolor sit amet",
      href: "#1",
    },
    {
      imageSrc: johnWoodImage.src,
      height: johnWoodImage.height,
      width: johnWoodImage.width,
      name: "John Wood",
      specialty: "Woodworking",
      description:
        "I like making some cool wooden spoons, this is some lorem ipsum dolor sit amet, some more lorem ipsum dolor sit amet, and even more lorem ipsum dolor sit amet",
      href: "#2",
    },
    {
      imageSrc: johnWoodImage.src,
      height: johnWoodImage.height,
      width: johnWoodImage.width,
      name: "John Wood",
      specialty: "Woodworking",
      description:
        "I like making some cool wooden spoons, this is some lorem ipsum dolor sit amet, some more lorem ipsum dolor sit amet, and even more lorem ipsum dolor sit amet",
      href: "#3",
    },
    {
      imageSrc: johnWoodImage.src,
      height: johnWoodImage.height,
      width: johnWoodImage.width,
      name: "John Wood",
      specialty: "Woodworking",
      description:
        "I like making some cool wooden spoons, this is some lorem ipsum dolor sit amet, some more lorem ipsum dolor sit amet, and even more lorem ipsum dolor sit amet",
      href: "#4",
    },
  ];

  return (
    <div
      className={clsx("grid gap-6 justify-items-center", {
        "grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))]":
          cardStyle === "small",
        "grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(500px,_1fr))]": cardStyle === "normal",
      })}
    >
      {cardStyle === "normal" &&
        creators.map((x) => (
          <CreatorCard
            key={x.href}
            description={x.description}
            height={x.height}
            width={x.width}
            href={x.href}
            imageSrc={x.imageSrc}
            name={x.name}
            specialty={x.specialty}
            className="max-w-lg sm:max-w-4xl"
          />
        ))}
      {cardStyle === "small" &&
        creators.map((x) => (
          <SmallCreatorCard
            key={x.href}
            height={x.height}
            width={x.width}
            href={x.href}
            imageSrc={x.imageSrc}
            name={x.name}
            specialty={x.specialty}
            className="max-w-xs"
          />
        ))}
    </div>
  );
}
