import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export default function VerticalImageCard({
  children,
  imageSrc,
  imageAlt,
  href,
  width,
  height,
  className = "",
}: {
  children: ReactNode;
  imageSrc: string;
  imageAlt: string;
  href?: string;
  width: number;
  height: number;
  className?: string;
}) {
  // If there is no href, we asume there is no link present, so we just pass the article element
  // If there is no link, the className is applied to the article

  const articleClass = href
    ? "h-full w-full overflow-hidden rounded-xl bg-white"
    : clsx("h-full w-full overflow-hidden rounded-xl bg-white", className);

  const articleElement = (
    <article className={articleClass}>
      <div className="w-full aspect-square">
        <Image src={imageSrc} alt={imageAlt} width={width} height={height} />
      </div>
      <div className="p-6">{children}</div>
    </article>
  );

  return href ? (
    <Link href={href} className={className}>
      {articleElement}
    </Link>
  ) : (
    articleElement
  );
}
