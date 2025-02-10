// export const revalidate = 604800;

import { notFound } from 'next/navigation';

import { titleFont } from '@/config/fonts';
import { SizeSelector } from '@/components/product/size-selector/SizeSelector';
import { QuantitySelector } from '@/components/product/quantity-selector/QuantitySelector';
import { ProductSlideshow } from '@/components/product/slideShow/ProductSlideshow';
import { ProductMobileSlideshow } from '@/components/product/slideShow/ProductMobileSlideshow';
import { getProductBySlug } from '@/actions/products/get-product-by-slug';
import { StockLabel } from '@/components/product/stock-label/StockLabel';

interface Props {
  params: Promise<{ slug: string }>;
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
        {/* Selector de tallas */}
        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />
        {/* Selector de cantidad */}
        <QuantitySelector quantity={2} />
        {/* Button */}
        <button className='btn-primary my-5'>Agregar al carrito</button>
        {/* descripción */}
        <h3 className='font-bold text-sm'>Descripción</h3>
        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  );
}
