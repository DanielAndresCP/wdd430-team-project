import { formatCurrency } from "@/utils/formatting";
import VerticalImageCard from "./verticalImageCard";

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
    <VerticalImageCard
      imageSrc={imageSrc}
      href={href}
      imageAlt={`Product image of ${name}`}
      width={width}
      height={height}
      className={className}
    >
      <h3 className="text-2xl font-title font-medium">{name}</h3>
      <p className="text-sm mb-3">Price: {formatCurrency(price)}</p>
      <p>{description}</p>
    </VerticalImageCard>
  );
}
