'use client';

import { currencyFormat } from '@/utils/currencyFormat';
import clsx from 'clsx';
import { IoCartOutline } from 'react-icons/io5';

interface Props {
  order: {
    OrderAddress: {
      firstName: string;
      lastName: string;
      address: string;
      addressTwo: string;
      city: string;
      countryId: string;
      postalCode: string;
      phone: string;
    };
    itemsInOrder: number;
    subTotal: number;
    tax: number;
    total: number;
    isPaid: boolean;
  };
}

export const SummaryInOrder = ({ order }: Props) => {
  return (
    <div className='bg-white rounded-xl shadow-xl p-7'>
      <h2 className='text-2xl font-bold mb-2'>Dirección de entrega</h2>
      <div className='mb-10'>
        <p className='text-xl'>
          {order.OrderAddress.firstName} {order.OrderAddress.lastName}
        </p>
        <p>{order.OrderAddress.address}</p>
        <p>{order.OrderAddress.addressTwo}</p>
        <p>
          {order.OrderAddress.city} - {order.OrderAddress.countryId}
        </p>
        <p>{order.OrderAddress.postalCode}</p>
        <p>{order.OrderAddress.phone}</p>
      </div>
      {/* Divider */}
      <div className='w-full h-0.5 rounded bg-gray-200 mb-10' />
      <h2 className='text-2xl mb-2'>Resumen de Orden</h2>
      <div className='grid grid-cols-2'>
        <span>No. Productos</span>
        <span className='text-right'>
          {order.itemsInOrder === 1
            ? '1 artículo'
            : `${order.itemsInOrder} artículos`}
        </span>

        <span>Subtotal</span>
        <span className='text-right'>{currencyFormat(order.subTotal)}</span>

        <span>Impuestos (15%)</span>
        <span className='text-right'>{currencyFormat(order.tax)}</span>

        <span className='mt-5 text-2xl'>Total:</span>
        <span className='mt-5 text-2xl text-right'>
          {currencyFormat(order.total)}
        </span>
      </div>
      <div className='mt-5 mb-2 w-full'>
        <div
          className={clsx(
            'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
            {
              'bg-red-500': !order.isPaid,
              'bg-green-700': order.isPaid,
            }
          )}
        >
          <IoCartOutline size={30} />
          {/* <span className='mx-2'>Pendiente de pago</span> */}
          <span className='mx-2'>
            {order.isPaid ? 'Pagada' : 'Pendiente de pago'}
          </span>
        </div>
      </div>
    </div>
  );
};
