import Link from 'next/link';

import { Title } from '@/components/ui/title/Title';
import { Pagination } from '@/components/ui/pagination/Pagination';
import { getPaginatedProductsWithImages } from '@/actions/products/product-pagination';
import Image from 'next/image';
import { currencyFormat } from '@/utils/currencyFormat';

interface Props {
  searchParams: Promise<{ page: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const pages = (await searchParams).page;
  const page = pages ? parseInt(pages) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page: page,
  });

  return (
    <>
      <Title title='Mantenimiento de productos' />
      <div className='flex justify-end mb-5'>
        <Link href='/admin/product/new' className='btn-primary'>
          Nuevo producto
        </Link>
      </div>
      <div className='mb-10'>
        <table className='min-w-full'>
          <thead className='bg-gray-200 border-b'>
            <tr>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Imagen
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Título
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Precio
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Género
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Inventario
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Tallas
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length !== 0 ? (
              products.map((product) => (
                <tr
                  key={product.id}
                  className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'
                >
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    <Link href={`/product/${product.slug}`}>
                      <Image
                        src={`/products/${product.ProductImage[0].url}`}
                        width={80}
                        height={80}
                        alt={product.title}
                        className='w-20 h-20 object-cover rounded'
                      />
                    </Link>
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    <Link
                      href={`/admin/product/${product.slug}`}
                      className='hover:underline'
                    >
                      {product.title}
                    </Link>
                  </td>
                  <td className='text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap'>
                    {currencyFormat(product.price)}
                  </td>

                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    {product.gender}
                  </td>
                  <td className='text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap'>
                    {product.inStock}
                  </td>
                  <td className='text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap'>
                    {product.sizes.join(', ')}
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
