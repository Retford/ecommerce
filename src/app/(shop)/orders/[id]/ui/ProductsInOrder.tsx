'use client';

import Image from 'next/image';

import { currencyFormat } from '@/utils/currencyFormat';
import { NotificationPay } from '@/components/order/notification-pay/NotificationPay';

interface Props {
  orderItem: {
    product: {
      title: string;
      slug: string;
      ProductImage: { url: string }[];
    };
    size: string;
    price: number;
    quantity: number;
  }[];
  payment: boolean;
}

export const ProductsInOrder = ({ orderItem, payment }: Props) => {
  return (
    <div className='flex flex-col mt-5'>
      <NotificationPay payment={payment} />
      {/* Items */}
      {orderItem.map((item) => (
        <div key={`${item.product.slug} - ${item.size}`} className='flex mb-5'>
          <Image
            src={`/products/${item.product.ProductImage[0].url}`}
            width={100}
            height={100}
            alt={item.product.title}
            className='mr-5 rounded'
          />
          <div>
            <p>{item.product.title}</p>
            <p>
              {currencyFormat(item.price)} x {item.quantity}
            </p>
            <p className='font-bold'>
              Subtotal:&#32;
              {currencyFormat(item.price * item.quantity)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
