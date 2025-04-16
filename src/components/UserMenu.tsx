'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LogOut, UserCircle2 } from 'lucide-react';

export default function UserMenu() {
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/session');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error('Error fetching session', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  if (loading) return null;

  return (
    <div className="relative">
      {user ? (
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-sm font-medium bg-white text-green-medium px-3 py-1.5 rounded-md shadow hover:bg-gray-100 transition"
          >
            <UserCircle2 className="w-5 h-5" />
            {user.name?.split(' ')[0] || 'User'}
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <Link
          href="/auth/login"
          className="bg-white text-green-medium px-4 py-2 text-sm rounded-md font-medium hover:bg-gray-100 transition"
        >
          Login
        </Link>
      )}
    </div>
  );
}
