'use client';

import { useEffect, useState } from 'react';

import { useCartStore } from '@/store/cart/cart-store';
import { currencyFormat } from '@/utils/currencyFormat';
import { ProductImage } from '@/components/product/product-image/ProductImage';

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);

  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug} - ${product.size}`} className='flex mb-5'>
          <ProductImage
            src={product.image}
            width={100}
            height={100}
            alt={product.title}
            className='mr-5 rounded aspect-square object-cover'
          />
          <div>
            <span>
              {product.size} - {product.title} ({product.quantity})
            </span>
            <p className='font-bold'>
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
