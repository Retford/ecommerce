// export const revalidate = 604800;

import { notFound } from 'next/navigation';
import type {
  Metadata,
  // ResolvingMetadata
} from 'next';

import { titleFont } from '@/config/fonts';
import { ProductSlideshow } from '@/components/product/slideShow/ProductSlideshow';
import { ProductMobileSlideshow } from '@/components/product/slideShow/ProductMobileSlideshow';
import { getProductBySlug } from '@/actions/products/get-product-by-slug';
import { StockLabel } from '@/components/product/stock-label/StockLabel';
import { AddToCart } from './ui/AddToCart';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: Props): // parent: ResolvingMetadata
Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  console.log(product?.images[1]);

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? '',
      description: product?.description ?? '',
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductBySlugPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className='mt-5 mb-20 grid md:grid-cols-3 gap-3'>
      {/* Slideshow */}
      <div className='col-span-1 md:col-span-2'>
        {/* Mobile Slideshow */}
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className='block md:hidden'
        />
        {/* Desktop Slideshow */}
        <ProductSlideshow
          title={product.title}
          images={product.images}
          className='hidden md:block'
        />
      </div>
      {/* Detalles */}
      <div className='col-span-1 px-5'>
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <StockLabel slug={product.slug} />
        <p className='text-lg mb-5'>${product.price.toFixed(2)}</p>
        <AddToCart product={product} />
        {/* descripción */}
        <h3 className='font-bold text-sm'>Descripción</h3>
        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  );
}
