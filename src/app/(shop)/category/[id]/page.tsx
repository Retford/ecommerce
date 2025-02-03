// import { notFound } from 'next/navigation';

import { ProductGrid } from '@/components/products/product-grid/ProductGrid';
import { Title } from '@/components/ui/title/Title';
import { initialData, Category } from '@/seed/seed';

interface Props {
  params: Promise<{ id: Category }>;
}

const seedProducts = initialData.products;

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;

  const labels: Record<Category, string> = {
    men: 'para hombres',
    women: 'para Mujeres',
    kid: 'para Niños',
    unisex: 'para todos',
  };

  // if (id === 'kids') {
  //   notFound();
  // }

  const products = seedProducts.filter((product) => product.gender === id);

  return (
    <>
      <Title
        title={`Artículos ${labels[id]}`}
        subtitle={`Artículos de ${id}`}
      />
      <ProductGrid products={products} />
    </>
  );
}
