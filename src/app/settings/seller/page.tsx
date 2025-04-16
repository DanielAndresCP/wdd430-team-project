import { fetchCategories } from "@/app/lib/category-actions";
import { hasPermissions } from "@/app/lib/user-actions";
import { redirect } from "next/navigation";
import SellerSettingsForm from "@/components/sellerSettingsForm";

export default async function Page() {
  const permissions = await hasPermissions(["SELLER"]);
  if (!permissions.authenticated) {
    return redirect("/");
  }

  if (!permissions.authorized) {
    return redirect("/settings/account");
  }

  if (!permissions.userData) {
    throw new Error("User data is missing even though it was expected");
  }

  const allCategories = await fetchCategories("");

  const {
    specialties: creatorCategories,
    shortBio,
    fullBio,
  } = permissions.userData.settings as {
    specialties: Array<string>;
    shortBio: string;
    fullBio: string;
  };

  const userId = permissions.userData.id;

  return (
    <main>
      <h2 className="font-title text-2xl">Seller Profile Settings</h2>
      <SellerSettingsForm
        allCategories={allCategories}
        creatorCategories={creatorCategories}
        fullBio={fullBio}
        shortBio={shortBio}
        userId={userId}
      />
    </main>
  );
}
