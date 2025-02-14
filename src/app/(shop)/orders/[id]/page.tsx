import { getOrderById } from '@/actions/order/get-order-by-id';
import { Title } from '@/components/ui/title/Title';
import { SummaryInOrder } from './ui/SummaryInOrder';
import { ProductsInOrder } from './ui/ProductsInOrder';
import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrdersPagePerID({ params }: Props) {
  const { id } = await params;

  // Todo: llamar el server action

  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect('/');
  }

  console.log(order);

  //   TODO:Verificar

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title={`Orden #${id.split('-').at(-1)}`} />
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Carrito */}

          <ProductsInOrder order={order} />
          {/* Checkout -Summary */}
          <SummaryInOrder order={order} />
        </div>
      </div>
    </div>
  );
}
