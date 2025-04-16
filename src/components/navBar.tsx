"use client";

import Link from "next/link";
import { useState } from "react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import clsx from "clsx";

const links = [
  {
    name: "Products",
    href: "/products",
  },
  {
    name: "Page Link",
    href: "#2",
  },
  {
    name: "Page Link",
    href: "#3",
  },
  {
    name: "Page Link",
    href: "#4",
  },
  {
    name: "Page Link",
    href: "#5",
  },
  {
    name: "Page Link",
    href: "#6",
  },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <button
        className="block sm:hidden w-8 mx-auto"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <span className="sr-only">{open ? "Close" : "Open"} Navigation Bar</span>
        {open ? <XMarkIcon /> : <Bars3Icon />}
      </button>

      <div
        className={clsx(
          "sm:flex flex flex-col sm:flex-row gap-3 sm:gap-6 items-center",
          { hidden: !open }
        )}
      >
        {links.map((x) => (
          <Link key={x.href} href={x.href} className="inline-block">
            {x.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
