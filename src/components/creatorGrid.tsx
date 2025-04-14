import CreatorCard from "./creatorCard";
import SmallCreatorCard from "./smallCreatorCard";

import { fetchSellers } from "@/app/lib/user-actions";
import { fetchCategories } from "@/app/lib/category-actions";
import clsx from "clsx";

export default async function CreatorGrid({
  query,
  page = 1,
  cardStyle = "normal",
}: {
  query: string;
  page?: number;
  cardStyle?: "normal" | "small";
}) {
  // Man, the things inside the settings column require such hacks :(

  const fetchedSellers = await fetchSellers(query, page);

  // This gets the categories where the id matches one of the first items of the specialties property
  // on the settings column from all sellers. This has to be done manually because there is no link
  // between user and categories due to the specialties being on a json column
  const categories = await fetchCategories({
    where: {
      id: {
        in: fetchedSellers.map(
          (x) => (x.settings as { specialties: Array<string> })?.specialties[0]
        ),
      },
    },
  });

  // Using the fetched data, we complete all information that is needed to render the grid
  const creators = fetchedSellers.map((x) => ({
    ...x,
    height: 720,
    width: 720,
    shortBio: (x.settings as { shortBio: string })?.shortBio,
    specialty:
      categories.find(
        (c) =>
          c.id ===
          (x.settings as { specialties: Array<string> })?.specialties[0]
      )?.displayName || "",
    href: `/creators/${x.id}`,
  }));

  return (
    <div
      className={clsx("grid gap-6 justify-items-center", {
        "grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))]":
          cardStyle === "small",
        "grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(500px,_1fr))]":
          cardStyle === "normal",
      })}
    >
      {cardStyle === "normal" &&
        creators.map((x) => (
          <CreatorCard
            key={x.email}
            description={x.shortBio}
            height={x.height}
            width={x.width}
            href={x.href}
            imageSrc={x.profilePictureUrl}
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
            imageSrc={x.profilePictureUrl}
            name={x.name}
            specialty={x.specialty}
            className="max-w-xs"
          />
        ))}
    </div>
  );
}
