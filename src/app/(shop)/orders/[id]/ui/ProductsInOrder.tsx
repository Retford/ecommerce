'use client';

import clsx from 'clsx';
import { IoCartOutline } from 'react-icons/io5';
import { currencyFormat } from '@/utils/currencyFormat';
import Image from 'next/image';

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
    OrderItem: [
      {
        product: {
          title: string;
          slug: string;
          ProductImage: [{ url: string }];
        };
        size: string;
        price: number;
        quantity: number;
      }
    ];
    itemsInOrder: number;
    subTotal: number;
    tax: number;
    total: number;
    isPaid: boolean;
  };
}

export const ProductsInOrder = ({ order }: Props) => {
  return (
    <div className='flex flex-col mt-5'>
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
      {/* Items */}
      {order.OrderItem.map((item) => (
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
