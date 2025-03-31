'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError('Invalid email or password');
    } else {
      router.push('/');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-terracota-lighter px-4 font-[var(--font-literata)]">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl bg-white shadow-md p-8 space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-terracota-dark font-[var(--font-playfair-display)]">
          Welcome back
        </h1>

        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-terracota-medium focus:ring-terracota-medium"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-terracota-medium focus:ring-terracota-medium"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-terracota-dark text-white py-2 font-semibold hover:bg-terracota-medium transition-colors"
        >
          Log In
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/auth/register" className="text-terracota-medium hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </main>
  );
}
