'use client';

import { NotificationPay } from '@/components/order/notification-pay/NotificationPay';
import { currencyFormat } from '@/utils/currencyFormat';

interface Props {
  orderAddress: {
    firstName: string;
    lastName: string;
    address: string;
    addressTwo: string | null;
    city: string;
    countryId: string;
    postalCode: string;
    phone: string;
  } | null;
  payment: boolean;
  itemsInOrder: number;
  subTotal: number;
  tax: number;
  total: number;
}

export const SummaryInOrder = ({
  orderAddress,
  payment,
  itemsInOrder,
  subTotal,
  tax,
  total,
}: Props) => {
  return (
    <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
      <h2 className='text-2xl font-bold mb-2'>Dirección de entrega</h2>
      <div className='mb-10'>
        <p className='text-xl'>
          {orderAddress!.firstName} {orderAddress!.lastName}
        </p>
        <p>{orderAddress!.address}</p>
        <p>{orderAddress!.addressTwo}</p>
        <p>
          {orderAddress!.city} - {orderAddress!.countryId}
        </p>
        <p>{orderAddress!.postalCode}</p>
        <p>{orderAddress!.phone}</p>
      </div>
      {/* Divider */}
      <div className='w-full h-0.5 rounded bg-gray-200 mb-10' />
      <h2 className='text-2xl mb-2'>Resumen de Orden</h2>
      <div className='grid grid-cols-2'>
        <span>No. Productos</span>
        <span className='text-right'>
          {itemsInOrder === 1 ? '1 artículo' : `${itemsInOrder} artículos`}
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
        <NotificationPay payment={payment} />
      </div>
    </div>
  );
};
