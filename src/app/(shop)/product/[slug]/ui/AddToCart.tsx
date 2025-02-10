'use client';

import { QuantitySelector } from '@/components/product/quantity-selector/QuantitySelector';
import { SizeSelector } from '@/components/product/size-selector/SizeSelector';
import { Product, Size } from '@/interfaces/product.interface';
import { useState } from 'react';

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);
    if (!size) return console.log('Seleccione una talla');
    console.log(size, quantity);
  };

  return (
    <>
      {posted && !size && (
        <span className='mt-2 text-red-500 fade-in'>
          Debe de seleccionar una talla*
        </span>
      )}
      {/* Selector de tallas */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />
      {/* Selector de cantidad */}
      <QuantitySelector
        quantity={quantity}
        onQuantityChanged={(quantity) => setQuantity(quantity)}
      />
      {/* Button */}
      <button onClick={addToCart} className='btn-primary my-5'>
        Agregar al carrito
      </button>
    </>
  );
};
