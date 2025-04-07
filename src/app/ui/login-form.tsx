'use client';

import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { authenticate } from '@/app/lib/actions';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-5">
      <h1 className="text-3xl font-bold text-center text-terracota-dark font-[var(--font-playfair-display)]">
        Welcome back
      </h1>

      {errorMessage && (
        <div className="text-red-600 text-sm text-center flex items-center justify-center gap-1">
          <ExclamationCircleIcon className="h-5 w-5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="relative">
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            className="peer block w-full rounded-md border border-gray-300 py-2 pl-10 text-sm focus:border-terracota-medium focus:ring-terracota-medium"
          />
          <AtSymbolIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 peer-focus:text-gray-700" />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Enter your password"
            className="peer block w-full rounded-md border border-gray-300 py-2 pl-10 text-sm focus:border-terracota-medium focus:ring-terracota-medium"
          />
          <KeyIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 peer-focus:text-gray-700" />
        </div>
      </div>

      <input type="hidden" name="redirectTo" value={callbackUrl} />

      <button
          type="submit"
          className="w-full rounded-md bg-terracota-dark text-white py-2 font-semibold hover:bg-terracota-medium transition-colors flex justify-center items-center"
          aria-disabled={isPending}
        >
          {isPending ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="none"
                d="M4 12a8 8 0 0116 0"
                stroke="currentColor"
                strokeWidth="4"
              ></path>
            </svg>
          ) : (
            'Log In'
          )}
        </button>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <a href="/auth/register?reset=true" className="text-terracota-medium hover:underline">
          Sign up
        </a>
      </p>
    </form>
  );
}



