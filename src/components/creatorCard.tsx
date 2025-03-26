import Image from "next/image";
import Link from "next/link";

export default function CreatorCard({
  imageSrc,
  name,
  specialty,
  description,
  href,
  width,
  height,
  className = "",
}: {
  imageSrc: string;
  name: string;
  specialty: string;
  description: string;
  href: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <Link href={href} className={className}>
      <article className="h-full w-full overflow-hidden rounded-xl bg-white grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="h-full">
          <Image
            src={imageSrc}
            alt={`Photograph of ${name}`}
            width={width}
            height={height}
          />
        </div>
        <div className="max-sm:px-6 max-sm:pb-6 sm:py-6 sm:pr-6">
          <h3 className="text-2xl font-title font-medium">{name}</h3>
          <p className="text-sm mb-3">Specialty: {specialty}</p>
          <p>{description}</p>
        </div>
      </article>
    </Link>
  );
}
