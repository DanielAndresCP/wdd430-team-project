'use client';

import { useActionState, useEffect, useState } from 'react';
import { createUser } from '@/app/lib/actions';
import { toast } from 'sonner';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'USER' | 'SELLER'>('USER');

  const [formState, formAction, isPending] = useActionState(createUser, undefined);
  const router = useRouter();



  // ✅ Mostrar toast según el resultado
  useEffect(() => {
    if (formState?.success) {
      toast.success('Account created successfully!', {
        description: 'You can now log in.',
        icon: '✅',
        className: 'bg-green-600 text-white',
      });
  
      setName('');
      setEmail('');
      setPassword('');
      setRole('USER');
  
      // ⏳ Esperamos 2 segundos antes de redirigir
      const timeout = setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
  
      return () => clearTimeout(timeout);
    }
  
    if (formState?.success === false && formState.message) {
      toast.error(formState.message, {
        icon: '❌',
        className: 'bg-red-600 text-white',
      });
    }
  }, [formState, router]);
  
  return (
    <form action={formAction} className="space-y-5">
      <h1 className="text-3xl font-bold text-center text-terracota-dark font-[var(--font-playfair-display)]">
        Create your account
      </h1>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-terracota-medium focus:ring-terracota-medium"
        />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Account type
        </label>
        <select
          id="role"
          name="role"
          required
          value={role}
          onChange={(e) => setRole(e.target.value as 'USER' | 'SELLER')}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-terracota-medium focus:ring-terracota-medium"
        >
          <option value="USER">User</option>
          <option value="SELLER">Seller</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-terracota-dark text-white py-2 font-semibold hover:bg-terracota-medium transition-colors flex items-center justify-center"
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
          <>
            Sign Up <ArrowRightIcon className="ml-2 inline h-5 w-5 text-white" />
          </>
        )}
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <a href="/auth/login" className="text-terracota-medium hover:underline">
          Log in
        </a>
      </p>
    </form>
  );
}
