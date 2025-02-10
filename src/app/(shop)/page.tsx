export const dynamic = 'force-static';
export const revalidate = 60;

import { getPaginatedProductsWithImages } from '@/actions/products/product-pagination';
import { ProductGrid } from '@/components/products/product-grid/ProductGrid';
import { Pagination } from '@/components/ui/pagination/Pagination';
import { Title } from '@/components/ui/title/Title';
import { redirect } from 'next/navigation';

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: Props) {
  const pages = (await searchParams).page;
  const page = pages ? parseInt(pages) : 1;
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page: page,
  });

  if (products.length === 0) {
    redirect('/');
  }

  return (
    <>
      <Title title='Tienda' subtitle='Todos los productos' className='mb-2' />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
