'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import { placeOrder } from '@/actions/order/place-order';

import { useAddressStore } from '@/store/address/address-store';
import { useCartStore } from '@/store/cart/cart-store';

import { currencyFormat } from '@/utils/currencyFormat';

export const PlaceOrder = () => {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore((state) => state.address);
  const { getSummaryInformation, clearCart } = useCartStore();
  const { itemsInCart, subTotal, tax, total } = getSummaryInformation();

  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoader(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    const resp = await placeOrder(productsToOrder, address);
    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
      return;
    }
    //* Todo sale bien
    clearCart();
    router.replace('/orders/' + resp.order?.id);
  };

  if (!loader) {
    return <span>Loading...</span>;
  }

  return (
    <div className='bg-white rounded-xl shadow-xl p-7'>
      <h2 className='text-2xl font-bold mb-2'>Dirección de entrega</h2>
      <div className='mb-10'>
        <p className='text-xl'>
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.addressTwo}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      {/* Divider */}
      <div className='w-full h-0.5 rounded bg-gray-200 mb-10' />

      <h2 className='text-2xl mb-2'>Resumen de Orden</h2>
      <div className='grid grid-cols-2'>
        <span>No. Productos</span>
        <span className='text-right'>
          {itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}
        </span>
        <span>Subtotal</span>
        <span className='text-right'>{currencyFormat(subTotal)}</span>
        <span>Impuestos (15%)</span>
        <span className='text-right'>{currencyFormat(tax)}</span>
        <span className='mt-5 text-2xl'>Total:</span>
        <span className='mt-5 text-2xl text-right'>
          {currencyFormat(total)}
        </span>
      </div>

      <div className='mt-5 mb-2 w-full'>
        <p className='mb-5'>
          {/* Disclaimer */}
          <span className='text-xs'>
            Al hacer click en &#34;Colocar orden&#34;, aceptas nuestros{' '}
            <a href='#' className='underline'>
              términos y condiciones
            </a>{' '}
            y{' '}
            <a href='#' className='underline'>
              políticas de privacidad
            </a>
          </span>
        </p>

        <p className='text-red-500 mb-1'>{errorMessage}</p>

        <button
          //  href='/orders/123'
          onClick={onPlaceOrder}
          className={clsx({
            'btn-primary': !isPlacingOrder,
            'btn-disabled': isPlacingOrder,
          })}
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};
