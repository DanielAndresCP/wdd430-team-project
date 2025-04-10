"use client";

import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const settingsNavLinks = [
  {
    text: "Account Settings",
    href: "/settings/account",
  },
  {
    text: "Seller Profile Settings",
    href: "/settings/seller",
  },
  {
    text: "My Products",
    href: "/settings/products",
  },
  {
    text: "Reviews to my products",
    href: "/settings/reviews",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const currentPath = usePathname();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-title mb-4">Settings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-12">
        <aside className="p-6 bg-green-desaturated-light rounded-xl max-h-fit">
          <nav className="flex flex-col gap-2">
            {settingsNavLinks.map((x, i, arr) => (
              <Link
                href={x.href}
                key={x.href}
                className={clsx("block", {
                  "pl-2 border-l-4 border-green-900":
                    currentPath === x.href,
                })}
              >
                {x.text}
              </Link>
            ))}
          </nav>
        </aside>
        {children}
      </div>
    </div>
  );
}
