'use client';

import { useActionState, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { createUser } from '@/app/lib/actions';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const reset = searchParams.get('reset') === 'true';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, formAction, isPending] = useActionState(
    createUser,
    undefined,
  );

  const accountCreated = errorMessage === undefined && !isPending && !reset;

  // 🔁 Limpiar los inputs cuando se crea el usuario con éxito
  useEffect(() => {
    if (accountCreated) {
      setName('');
      setEmail('');
      setPassword('');
    }
  }, [accountCreated]);

  return (
    <form action={formAction} className="space-y-5">
      <h1 className="text-3xl font-bold text-center text-terracota-dark font-[var(--font-playfair-display)]">
        Create your account
      </h1>

      {accountCreated && (
        <div className="text-green-600 text-sm text-center">
          ✅ Account created!{' '}
          <a href="/auth/login" className="underline text-green-700">
            You can now log in.
          </a>
        </div>
      )}

      {errorMessage && !accountCreated && (
        <div className="text-red-600 text-sm text-center flex items-center justify-center gap-1">
          <ExclamationCircleIcon className="h-5 w-5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {!accountCreated && (
        <>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-terracota-medium focus:ring-terracota-medium"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-terracota-medium focus:ring-terracota-medium"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-terracota-medium focus:ring-terracota-medium"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-terracota-dark text-white py-2 font-semibold hover:bg-terracota-medium transition-colors"
            aria-disabled={isPending}
          >
            Sign Up <ArrowRightIcon className="ml-2 inline h-5 w-5 text-white" />
          </button>
        </>
      )}

      {!accountCreated && (
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/auth/login" className="text-terracota-medium hover:underline">
            Log in
          </a>
        </p>
      )}
    </form>
  );
}
