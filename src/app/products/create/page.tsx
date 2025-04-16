import { hasPermissions } from "@/app/lib/user-actions";
import CreateProductForm from "@/components/CreateProductForm";
import { redirect } from "next/navigation";

export default async function ProtectedCreateProductPage() {
  const permissions = await hasPermissions(["SELLER"]);
  if (!permissions.canPass) {
    return redirect("/");
  }

  return <CreateProductForm />;
}
