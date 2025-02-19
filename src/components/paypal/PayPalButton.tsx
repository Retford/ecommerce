'use client';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from '@paypal/paypal-js';
import { setTransactionId } from '@/actions/payments/set-transaction-id';
import { payPalCheckPayment } from '@/actions/payments/paypal-check-payment';

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ amount, orderId }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = Math.round(amount * 100) / 100;

  if (isPending) {
    return (
      <div className='animate-pulse'>
        <div className='h-11 bg-gray-300 rounded mb-[14px]' />
        <div className='h-11 bg-gray-300 rounded mb-[14px]' />
        <div className='h-4 bg-gray-300' />
      </div>
    );
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            currency_code: 'USD',
            value: `${roundedAmount}`,
          },
        },
      ],
    });

    const { ok } = await setTransactionId(transactionId, orderId);

    if (!ok) {
      throw new Error('No se pudo actualizar la orden');
    }

    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();
    if (!details) return;

    await payPalCheckPayment(details.id!);
  };

  return <PayPalButtons createOrder={createOrder} onApprove={onApprove} />;
};
