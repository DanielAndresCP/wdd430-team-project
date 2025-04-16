'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateProduct } from '@/app/lib/product-actions';
import { fetchCategories } from '@/app/lib/client/fetch-categories';

export default function EditProductForm({ product }: { product: any }) {
  const router = useRouter();
  const [form, setForm] = useState({
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    imageUrl: product.imageUrl,
    categoryId: product.categoryId,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<{ id: string; displayName: string }[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      const res = await updateProduct(formData);

      if (res?.success) {
        router.push(`/products/${form.id}`);
      } else {
        alert(res?.message || 'Error updating product');
      }
    } catch (error) {
      console.error('❌ Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="id" value={product.id} />
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Product Title"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border rounded"
        />
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded"
        />
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.displayName}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-terracota-dark text-white rounded"
        >
          {isSubmitting ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </main>
  );
}
