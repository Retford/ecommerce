'use client';

import { useCartStore } from '@/store/cart/cart-store';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoCartOutline } from 'react-icons/io5';

export const CartButton = () => {
  const [loaded, setLoaded] = useState(false);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Link href='/cart' className='mx-2'>
      <div className='relative'>
        {loaded && totalItemsInCart > 0 && (
          <span className='absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white'>
            {totalItemsInCart}
          </span>
        )}
        <IoCartOutline className='w-5 h-5' />
      </div>
    </Link>
  );
};
