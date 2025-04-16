import { auth } from '../../../../auth';
import CreateProductForm from '@/components/CreateProductForm';
import { redirect } from 'next/navigation';

export default async function ProtectedCreateProductPage() {
  const session = await auth();
  // Si no hay sesión o no es SELLER, redirigimos
  if (!session?.user || session.user.role !== 'SELLER') {
    return redirect('/');
  }

  return <CreateProductForm />;
}
