import SettingsNavBar from "@/components/settingsNavBar";

const settingsNavLinks = [
  {
    text: "Account Settings",
    href: "/settings/account",
    allowedRoles: ["USER","SELLER", "ADMIN"],
  },
  {
    text: "Seller Profile Settings",
    href: "/settings/seller",
    allowedRoles: ["SELLER", "ADMIN"],
  },
  {
    text: "My Products",
    href: "/settings/products",
    allowedRoles: ["SELLER", "ADMIN"],
  },
  {
    text: "Reviews to my products",
    href: "/settings/reviews",
    allowedRoles: ["SELLER", "ADMIN"],
  },
];

// TODO, make the shown links depend on the user role
const currentRole = "ADMIN";
const filteredNavLinks = settingsNavLinks
  .filter((x) => x.allowedRoles.includes(currentRole))
  .map((x) => ({ text: x.text, href: x.href }));

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-title mb-4">Settings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-12">
        <aside className="p-6 bg-green-desaturated-light rounded-xl max-h-fit">
          <SettingsNavBar settingsNavLinks={filteredNavLinks} />
        </aside>
        {children}
      </div>
    </div>
  );
}
