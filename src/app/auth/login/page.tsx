import { Suspense } from 'react';
import LoginForm from '@/app/ui/login-form';

export const metadata = {
  title: 'Login | Handcrafted Haven',
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-terracota-lighter px-4 font-[var(--font-literata)]">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-md p-8 space-y-6">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
