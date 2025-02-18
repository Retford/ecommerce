import Link from 'next/link';

import { auth } from '@/auth.config';
import { Title } from '@/components/ui/title/Title';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';
import { getOrdersByUser } from '@/actions/order/get-orders-by-user';
import { Pagination } from '@/components/ui/pagination/Pagination';

interface Props {
  searchParams: Promise<{ page: string }>;
}

export default async function OrdersPage({ searchParams }: Props) {
  const pages = (await searchParams).page;
  const page = pages ? parseInt(pages) : 1;

  const session = await auth();

  if (session === null) {
    redirect('/auth/login');
  }

  const {
    ok,
    orders = [],
    totalPages = 1,
  } = await getOrdersByUser({
    userId: session!.user.id,
    page: page,
  });

  if (!ok) {
    redirect('/auth/login');
  }

  return (
    <>
      <Title title='Orders' />
      <div className='mb-10'>
        <table className='min-w-full'>
          <thead className='bg-gray-200 border-b'>
            <tr>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                #ID
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Nombre completo
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Estado
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length !== 0 ? (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'
                >
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {order.id.split('-').at(-1)}
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    {order.OrderAddress?.firstName}{' '}
                    {order.OrderAddress?.lastName}
                  </td>
                  <td className='flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    {order.isPaid ? (
                      <>
                        <IoCardOutline className='mx-2 text-green-800' />
                        <span className='mx-2 text-green-800'>Pagado</span>
                      </>
                    ) : (
                      <>
                        <IoCardOutline className='mx-2 text-red-800' />
                        <span className='mx-2 text-red-800'>
                          Pendiente de pago
                        </span>
                      </>
                    )}
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 '>
                    <Link
                      href={`/orders/${order.id}`}
                      className='hover:underline'
                    >
                      Ver orden
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className='text-center py-4 text-gray-500'>
                  Todavía no existen órdenes
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
