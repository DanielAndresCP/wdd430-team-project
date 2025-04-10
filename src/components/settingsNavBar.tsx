"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function SettingsNavBar({
  settingsNavLinks,
}: {
  settingsNavLinks: Array<{ href: string; text: string }>;
}) {
  const currentPath = usePathname();

  return (
    <nav className="flex flex-col gap-2">
      {settingsNavLinks.map((x, i, arr) => (
        <Link
          href={x.href}
          key={x.href}
          className={clsx("block", {
            "pl-2 border-l-4 border-green-900": currentPath === x.href,
          })}
        >
          {x.text}
        </Link>
      ))}
    </nav>
  );
}
