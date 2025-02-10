export const revalidate = 60;
export const dynamic = 'force-static';

import type { Metadata } from 'next';

import { getPaginatedProductsWithImages } from '@/actions/products/product-pagination';
import { ProductGrid } from '@/components/products/product-grid/ProductGrid';
import { Pagination } from '@/components/ui/pagination/Pagination';
import { Title } from '@/components/ui/title/Title';
import { Gender } from '@prisma/client';
import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ gender: string }>;
  searchParams: Promise<{ page: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const labels: Record<string, string> = {
    men: 'Hombres',
    women: 'Mujeres',
    kid: 'Niños',
    unisex: 'Unisex',
  };

  const { gender } = await params;

  return {
    title: labels[gender],
  };
}

export default async function GenderByIdPage({ params, searchParams }: Props) {
  const { gender } = await params;

  const labels: Record<string, string> = {
    men: 'para Hombres',
    women: 'para Mujeres',
    kid: 'para Niños',
    unisex: 'para todos',
  };

  // if (id === 'kids') {
  //   notFound();
  // }

  const { page: pages } = await searchParams;

  const page = pages ? parseInt(pages) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page: page,
    gender: gender as Gender,
  });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  return (
    <>
      <Title
        title={`Artículos ${labels[gender]}`}
        subtitle={'Todos los artículos'}
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
