import Link from "next/link";

const links = [
  {
    name: "Some Link",
    href: "#1",
  },
  {
    name: "Some Link",
    href: "#2",
  },
  {
    name: "Some Link",
    href: "#3",
  },
  {
    name: "Some Link",
    href: "#4",
  },
];

export default function Footer() {
  return (
    <footer className="bg-green-desaturated-light">
      <nav className="container p-6 mx-auto flex flex-col md:flex-row gap-6 justify-between">
        <div className="sm:flex flex flex-col sm:flex-row gap-3 sm:gap-6">
          {links.map((x) => (
            <Link key={x.href} href={x.href} className="inline-block">
              {x.name}
            </Link>
          ))}
        </div>
        <div>Developed for BYU-I WDD 430</div>
      </nav>
    </footer>
  );
}
