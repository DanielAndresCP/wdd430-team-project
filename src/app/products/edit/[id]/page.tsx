import { auth } from '../../../../../auth';
import { redirect } from 'next/navigation';
import { getProductById } from '@/app/lib/product-actions';
import EditProductForm from '@/components/EditProductForm';

export default async function EditProductPage(props: {
    readonly params: { readonly id: string };
  }) {
    const { id } = await props.params;

  const session = await auth();

  console.log('Session:', session);
  console.log('Product ID:', id);

  if (!session?.user || session.user.role !== 'SELLER') {
    return redirect('/');
  }

  const product = await getProductById(id);

  if (!product) {
    console.log('🔴 Producto no encontrado');
    return redirect('/');
  }
  
  if (product.seller.email !== session.user.email) {
    console.log('🔴 El producto no pertenece al seller logueado');
    console.log('Producto:', product);
    return redirect('/');
  }

  if (!product || product.seller.email !== session.user.email) {
    return redirect('/');
  }

  return <EditProductForm product={product} />;
}
