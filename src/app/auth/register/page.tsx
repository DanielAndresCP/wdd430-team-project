import { Suspense } from 'react';
import RegisterForm from '@/app/ui/register-form';

export const metadata = {
  title: 'Register | Handcrafted Haven',
};

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-terracota-lighter px-4 font-[var(--font-literata)]">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-md p-8 space-y-6">
        <Suspense>
          <RegisterForm />
        </Suspense>
      </div>
    </main>
  );
}
