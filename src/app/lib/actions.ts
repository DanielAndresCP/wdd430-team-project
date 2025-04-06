'use server';

import { signIn } from '../../../auth';
import { AuthError } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import bcrypt from 'bcrypt'



export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData); // ✔️ formData contiene redirectTo
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid email or password.';
        default:
          return 'Something went wrong.';
      }
    }

    throw error;
  }
}






const prisma = new PrismaClient();

// Validación incluyendo el rol
const userSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['USER', 'SELLER']),
});

export async function createUser(_: any, formData: FormData) {
  try {
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role'),
    };

    const parsed = userSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, message: parsed.error.errors[0].message };
    }

    const existing = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });

    if (existing) {
      return { success: false, message: 'Email already registered' };
    }

    const hashedPassword = await bcrypt.hash(parsed.data.password, 10);

    await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        password: hashedPassword,
        role: parsed.data.role,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('❌ Error creating user:', error);
    return { success: false, message: 'Something went wrong' };
  }
}