'use client';

import { generatePaginationNumbers } from '@/utils/generatePaginationNumbers';
import clsx from 'clsx';
import Link from 'next/link';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const pageString = searchParams.get('page') ?? 1;
  const currentPage = isNaN(+pageString) ? redirect('/') : +pageString;
  if (currentPage < 1) {
    redirect('/');
  }

  const allPages = generatePaginationNumbers(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === '...') {
      return `${pathName}?${params.toString()}`;
    }

    if (Number(pageNumber) <= 0) {
      return `${pathName}`;
    }

    if (Number(pageNumber) > totalPages) {
      return `${pathName}?${params.toString()}`;
    }

    params.set('page', pageNumber.toString());

    return `${pathName}?${params.toString()}`;
  };

  return (
    <div className='flex items-center justify-center mt-10 mb-32'>
      <nav aria-label='Page navigation example'>
        <ul className='flex items-center list-style-none'>
          <li className='page-item'>
            <Link
              className='page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
              href={createPageUrl(currentPage - 1)}
            >
              <IoChevronBackOutline />
            </Link>
          </li>
          {allPages.map((page, index) => (
            <li className='page-item active' key={page + '-' + index}>
              <Link
                className={clsx(
                  'page-link relative block py-1.5 px-3 rounded border-0 outline-none transition-all duration-300 hover:text-gray-800 hover:bg-gray-200',
                  {
                    'bg-blue-600 text-white hover:text-white hover:bg-blue-800 focus:shadow-md':
                      page === currentPage,
                  }
                )}
                href={createPageUrl(page)}
              >
                {page} <span className='visually-hidden'></span>
              </Link>
            </li>
          ))}

          <li className='page-item'>
            <Link
              className='page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
              href={createPageUrl(currentPage + 1)}
            >
              <IoChevronForwardOutline />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
