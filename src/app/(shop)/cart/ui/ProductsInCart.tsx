'use client';

import { useEffect, useState } from 'react';

import { QuantitySelector } from '@/components/product/quantity-selector/QuantitySelector';
import { useCartStore } from '@/store/cart/cart-store';
import Link from 'next/link';
import { currencyFormat } from '@/utils/currencyFormat';
import { ProductImage } from '@/components/product/product-image/ProductImage';

export const ProductsInCart = () => {
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );

  const removeProduct = useCartStore((state) => state.removeProduct);
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
          <Link href={`/product/${product.slug}`}>
            <ProductImage
              src={product.image}
              width={100}
              height={100}
              alt={product.title}
              className='mr-5 rounded aspect-square object-cover'
            />
          </Link>
          <div>
            <Link
              className='hover:underline cursor-pointer'
              href={`/product/${product.slug}`}
            >
              {product.size} - {product.title}
            </Link>
            <p>{currencyFormat(product.price)}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) =>
                updateProductQuantity(product, quantity)
              }
            />
            <button
              className='underline mt-3'
              onClick={() => removeProduct(product)}
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
