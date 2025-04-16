// app/auth/signout/route.ts
import { signOut } from '../../../../auth';

export async function POST() {
  return signOut({ redirectTo: '/' });
}
