import { Title } from '@/components/ui/title/Title';
import { initialData } from '@/seed/seed';
import Image from 'next/image';
import Link from 'next/link';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CheckoutPage() {
  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Verificar orden' />
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Carrito */}

          <div className='flex flex-col mt-5'>
            <span className='text-xl'>Ajustar elementos</span>
            <Link href='/cart' className='underline mb-5'>
              Editar carrito aquí
            </Link>
            {/* Items */}

            {productsInCart.map((product) => (
              <div key={product.slug} className='flex mb-5'>
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  alt={product.title}
                  className='mr-5 rounded'
                />
                <div>
                  <p>{product.title}</p>
                  <p>${product.price} x 3</p>
                  <p className='font-bold'>Subtotal: ${product.price * 3}</p>
                  <button className='underline mt-3'>Remover</button>
                </div>
              </div>
            ))}
          </div>
          {/* Checkout -Summary */}
          <div className='bg-white rounded-xl shadow-xl p-7'>
            <h2 className='text-2xl font-bold mb-2'>Dirección de entrega</h2>
            <div className='mb-10'>
              <p className='text-xl'>Retford O&#39;briam</p>
              <p>Av. Ramsey 101</p>
              <p>San Borja</p>
              <p>Lima</p>
              <p>Perú</p>
              <p>CP: 15036</p>
            </div>
            {/* Divider */}
            <div className='w-full h-0.5 rounded bg-gray-200 mb-10' />
            <h2 className='text-2xl mb-2'>Resumen de Orden</h2>
            <div className='grid grid-cols-2'>
              <span>No. Productos</span>
              <span className='text-right'>3 artículos</span>

              <span>Subtotal</span>
              <span className='text-right'>$ 100.00</span>

              <span>Impuestos (15%)</span>
              <span className='text-right'>$ 100.00</span>

              <span className='mt-5 text-2xl'>Total:</span>
              <span className='mt-5 text-2xl text-right'>$ 100.00</span>
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
              <Link
                href='/orders/123'
                className='flex btn-primary justify-center'
              >
                Colocar orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
