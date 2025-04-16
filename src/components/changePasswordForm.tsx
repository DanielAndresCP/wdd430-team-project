"use client";
import { useActionState } from "react";

import { changePassword, PassChangeState } from "@/app/lib/user-actions";

export default function ChangePasswordForm({ userId }: { userId: string }) {
  const initialState: PassChangeState = { message: null, errors: {} };
  const [state, formAction] = useActionState(changePassword, initialState);

  return (
    <form action={formAction} className="mt-5">
      <div className="flex flex-row gap-4 mt-6 flex-wrap">
        <label className="w-full max-w-64">
          New password
          <input
            type="password"
            name="password"
            className="block mt-1 px-3 py-1 w-full rounded-full bg-white shadow-lg outline-none"
            aria-describedby="password-error"
          />
          <div id="password-error" aria-live="polite" aria-atomic="true">
            {state.errors?.password &&
              state.errors.password.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="w-full max-w-64">
          Repeat new password
          <input
            type="password"
            name="confirmPassword"
            className="block mt-1 px-3 py-1 w-full rounded-full bg-white shadow-lg outline-none"
            aria-describedby="confirmPassword-error"
          />
          <div id="confirmPassword-error" aria-live="polite" aria-atomic="true">
            {state.errors?.confirmPassword &&
              state.errors.confirmPassword.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
      </div>
      <input type="hidden" name="userId" defaultValue={userId} />
      <button
        type="submit"
        className="py-1 px-4 mt-5 rounded-full bg-green-dark text-white mr-3"
      >
        Change password
      </button>
    </form>
  );
}
