import VerticalImageCard from "./verticalImageCard";

export default function SmallCreatorCard({
  imageSrc,
  name,
  specialty,
  href,
  width,
  height,
  className = "",
}: {
  imageSrc: string;
  name: string;
  specialty: string;
  href: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <VerticalImageCard
      imageSrc={imageSrc}
      href={href}
      imageAlt={`Profile picture of ${name}`}
      width={width}
      height={height}
      className={className}
    >
      <h3 className="text-2xl font-title font-medium">{name}</h3>
      <p className="text-sm">Specialty: {specialty}</p>
    </VerticalImageCard>
  );
}
