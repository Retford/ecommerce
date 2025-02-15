import clsx from 'clsx';
import { IoCartOutline } from 'react-icons/io5';

interface Props {
  payment: boolean;
}

export const NotificationPay = ({ payment }: Props) => {
  return (
    <>
      <div
        className={clsx(
          'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
          {
            'bg-red-500': !payment,
            'bg-green-700': payment,
          }
        )}
      >
        <IoCartOutline size={30} />
        <span className='mx-2'>{payment ? 'Pagada' : 'Pendiente de pago'}</span>
      </div>
    </>
  );
};
