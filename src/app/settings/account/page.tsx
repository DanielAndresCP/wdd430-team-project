import AccountSettingsForm from "@/components/accountSettingsForm";
import { hasPermissions } from "@/app/lib/user-actions";
import { redirect } from "next/navigation";
import ChangePasswordForm from "@/components/changePasswordForm";

const profileAvatars = [
  { name: "Anastasia Weaver", path: "/creators/anastasia-weaver.png" },
  { name: "Base Avatar", path: "/creators/avatar-base.png" },
  { name: "Cool Avatar", path: "/creators/avatar-cool.png" },
  { name: "Ninja Avatar", path: "/creators/avatar-ninja.png" },
  { name: "Pirate Avatar", path: "/creators/avatar-pirate.png" },
  { name: "Avatar with a scarf", path: "/creators/avatar-scarf.png" },
  { name: "Smart Avatar", path: "/creators/avatar-smart.png" },
  { name: "John Wood", path: "/creators/john-wood.png" },
];

export default async function Page() {
  const permissions = await hasPermissions(["SELLER", "USER", "ADMIN"]);
  if (!permissions.authenticated) {
    return redirect("/");
  }

  if (!permissions.userData) {
    throw new Error("User data is missing even though it was expected");
  }

  const { name, email, profilePictureUrl, id } = permissions.userData;

  return (
    <main>
      <h2 className="font-title text-2xl">Account Settings</h2>
      <p className="text-sm">
        (You will have to login again after changing these settings)
      </p>
      <AccountSettingsForm
        userId={id}
        displayName={name}
        email={email}
        profilePicture={profilePictureUrl}
        allProfilePictures={profileAvatars}
      />
      <h3 className="font-title text-xl mt-12 font-medium"> Change Password</h3>
      <p className="text-sm">
        (Changing this setting does not require you to login again)
      </p>
      <ChangePasswordForm userId={id} />
    </main>
  );
}
