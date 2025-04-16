"use client";

import { useActionState } from "react";
import {
  updateAccountSettings,
  AccountSettingsState,
} from "@/app/lib/user-actions";

export default function AccountSettingsForm({
  displayName,
  profilePicture,
  allProfilePictures,
  email,
  userId,
}: {
  displayName: string;
  profilePicture: string;
  allProfilePictures: Array<{ path: string; name: string }>;
  email: string;
  userId: string;
}) {
  const initialState: AccountSettingsState = { message: null, errors: {} };
  const [state, formAction] = useActionState(
    updateAccountSettings,
    initialState
  );

  return (
    <form action={formAction} className="mt-5">
      <div className="flex flex-row gap-6 flex-wrap">
        <label className="w-full max-w-64">
          Display Name *
          <input
            type="text"
            name="displayName"
            className="block mt-1 px-3 py-1 w-full rounded-full bg-white shadow-lg outline-none"
            required
            defaultValue={displayName}
            aria-describedby="displayName-error"
          />
          <div id="displayName-error" aria-live="polite" aria-atomic="true">
            {state.errors?.displayName &&
              state.errors.displayName.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>

        <label className="w-full max-w-64">
          Profile Picture *
          <select
            name="profilePicture"
            className="block mt-1 px-3 py-1 w-full rounded-full bg-white shadow-lg outline-none"
            required
            defaultValue={profilePicture}
            aria-describedby="profilePicture-error"
          >
            <option value="">Select an option</option>
            {allProfilePictures.map((x) => (
              <option value={x.path} key={x.path}>
                {x.name}
              </option>
            ))}
          </select>
          <div id="profilePicture-error" aria-live="polite" aria-atomic="true">
            {state.errors?.profilePicture &&
              state.errors.profilePicture.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="w-full max-w-64">
          Email *
          <input
            type="email"
            name="email"
            className="block mt-1 px-3 py-1 w-full rounded-full bg-white shadow-lg outline-none"
            required
            defaultValue={email}
            aria-describedby="email-error"
          />
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <input type="hidden" name="userId" defaultValue={userId} />
      </div>
      <button
        type="submit"
        className="py-1 px-4 mt-5 rounded-full bg-green-dark text-white mr-3"
      >
        Save changes
      </button>
    </form>
  );
}
