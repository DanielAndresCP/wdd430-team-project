"use client";

import { State, updateSellerSettings } from "@/app/lib/user-actions";
import { useActionState } from "react";

export default function SellerSettingsForm({
  shortBio,
  fullBio,
  creatorCategories,
  allCategories,
  userId,
}: {
  shortBio: string;
  fullBio: string;
  creatorCategories: Array<string>;
  allCategories: Array<{ id: string; displayName: string }>;
  userId: string;
}) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(
    updateSellerSettings,
    initialState
  );
  return (
    <form action={formAction} className="mt-5">
      <div className="flex flex-col gap-6">
        <label className="w-full max-w-none">
          Short Biography *
          <textarea
            name="shortBio"
            className="block mt-1 px-3 py-2 w-full rounded-t-2xl rounded-l-2xl bg-white shadow-lg outline-none"
            rows={3}
            defaultValue={shortBio}
            aria-describedby="shortBio-error"
          ></textarea>
        </label>
        <div id="shortBio-error" aria-live="polite" aria-atomic="true">
          {state.errors?.shortBio &&
            state.errors.shortBio.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
        <label className="w-full max-w-none">
          Full Biography *
          <textarea
            name="fullBio"
            className="block mt-1 px-3 py-2 w-full rounded-t-2xl rounded-l-2xl bg-white shadow-lg outline-none"
            rows={10}
            defaultValue={fullBio}
            aria-describedby="fullBio-error"
          ></textarea>
        </label>
        <div id="fullBio-error" aria-live="polite" aria-atomic="true">
          {state.errors?.fullBio &&
            state.errors.fullBio.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
        <fieldset>
          <legend>Specialties *</legend>
          {allCategories.map((x, i) => (
            <label key={i} className="block">
              <input
                type="checkbox"
                name="specialties"
                className="mr-2"
                defaultChecked={creatorCategories.some((px) => px === x.id)}
                aria-describedby="specialties-error"
                value={x.id}
              />
              {x.displayName}
            </label>
          ))}
        </fieldset>
        <div id="specialties-error" aria-live="polite" aria-atomic="true">
          {state.errors?.specialties &&
            state.errors.specialties.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <input type="hidden" name="userId" defaultValue={userId} />
      <button
        type="submit"
        className="py-1 px-4 mt-5 rounded-full bg-green-dark text-white mr-3"
      >
        Save changes
      </button>
    </form>
  );
}
