import { getOrderById } from '@/actions/order/get-order-by-id';
import { Title } from '@/components/ui/title/Title';
import { redirect } from 'next/navigation';
import { ProductsInOrder } from './ui/ProductsInOrder';
import { SummaryInOrder } from './ui/SummaryInOrder';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrdersPagePerID({ params }: Props) {
  const { id } = await params;

  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect('/');
  }

  const payment = order!.isPaid;
  const orderItem = order!.OrderItem;
  const orderAddress = order!.OrderAddress;
  const itemsInOrder = order!.itemsInOrder;
  const subTotal = order!.subTotal;
  const tax = order!.tax;
  const total = order!.total;

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title={`Orden #${id.split('-').at(-1)}`} />
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          <ProductsInOrder payment={payment} orderItem={orderItem} />
          {/* Checkout -Summary */}
          <SummaryInOrder
            itemsInOrder={itemsInOrder}
            subTotal={subTotal}
            tax={tax}
            total={total}
            orderAddress={orderAddress}
            payment={payment}
          />
        </div>
      </div>
    </div>
  );
}
