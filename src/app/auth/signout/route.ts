// app/auth/signout/route.ts
import { signOut } from '../../../../auth';
import { NextResponse } from 'next/server';

export async function POST() {
  return signOut({ redirectTo: '/' });
}
