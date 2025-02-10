import { Size } from '@/interfaces/product.interface';
import clsx from 'clsx';

interface Props {
  selectedSize?: Size;
  availableSizes: Size[];

  onSizeChanged: (size: Size) => void;
}

export const SizeSelector = ({
  availableSizes,
  selectedSize,
  onSizeChanged,
}: Props) => {
  return (
    <div className='my-5'>
      <h3 className='font-bold mb-4'>Tallas disponibles</h3>

      <div className='flex'>
        {availableSizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChanged(size)}
            className={clsx('mx-2 hover:underline text-lg', {
              'border border-black px-2 bg-black text-white':
                size === selectedSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
