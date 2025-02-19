import { getProductBySlug } from '@/actions/products/get-product-by-slug';
import { Title } from '@/components/ui/title/Title';
import { redirect } from 'next/navigation';
import { ProductForm } from './ui/ProductForm';
import { getCategories } from '@/actions/admin/get-categories';

interface Props {
  params: Promise<{ slug: string }>;
}
export default async function ProductPageBySlug({ params }: Props) {
  const { slug } = await params;

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
  ]);

  //   TODO: new
  if (!product) {
    redirect('/admin/products');
  }

  const title = slug === 'new' ? 'Nuevo Producto' : 'Editar Producto';

  return (
    <>
      <Title title={title} />
      <ProductForm product={product} categories={categories} />
    </>
  );
}
