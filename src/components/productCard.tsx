import Image from "next/image";
import { formatCurrency } from "@/utils/formatting";
import Link from "next/link";

export default function ProductCard({
  imageSrc,
  name,
  price,
  description,
  href,
  width,
  height,
  className = "",
}: {
  imageSrc: string;
  name: string;
  price: number;
  description: string;
  href: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <Link href={href} className={className}>
      <article className="h-full w-full overflow-hidden rounded-xl bg-white">
        <div className="w-full aspect-square">
          <Image
            src={imageSrc}
            alt={`Product image of ${name}`}
            width={width}
            height={height}
          />
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-title font-medium">{name}</h3>
          <p className="text-sm mb-3">Price: {formatCurrency(price)}</p>
          <p>{description}</p>
        </div>
      </article>
    </Link>
  );
}
