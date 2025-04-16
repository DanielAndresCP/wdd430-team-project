import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import { getProductById } from "@/app/lib/product-actions";
import EditProductForm from "@/components/EditProductForm";
import { hasPermissions } from "@/app/lib/user-actions";

export default async function EditProductPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const session = await auth();

  console.log("Session:", session);
  console.log("Product ID:", id);

  const permissions = await hasPermissions(["SELLER"]);
  if (!permissions.authenticated) {
    return redirect("/");
  }

  if (!permissions.authorized) {
    return redirect("/");
  }

  if (!permissions.userData) {
    throw new Error("User data is missing even though it was expected");
  }

  const product = await getProductById(id);

  if (!product) {
    return redirect("/");
  }

  if (product.seller.email !== permissions.userData.email) {
    console.log("Producto:", product);
    return redirect("/");
  }

  if (!product || product.seller.email !== permissions.userData.email) {
    return redirect("/");
  }

  return <EditProductForm product={product} />;
}
