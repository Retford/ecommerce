'use client';

import { logout } from '@/actions/auth/logout';
import { useUIStore } from '@/store/ui/ui-store';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5';

export const SideBar = () => {
  const searchParams = useSearchParams();
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;

  const isAdmin = session?.user.role === 'admin';

  if (searchParams.has('auth')) {
    window.location.replace('/');
  }

  return (
    <>
      {/* Background black */}
      {isSideMenuOpen && (
        <div className='fixed top-0 left-0 w-screen h-screen z-[101] bg-black opacity-30' />
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className='fade-in fixed top-0 left-0 w-screen h-screen z-[101] backdrop-filter backdrop-blur-sm'
        />
      )}

      {/* SideMenu */}
      <nav
        className={clsx(
          'fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-[105] shadow-2xl transform transition-all duration-500',
          {
            'translate-x-full': !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={50}
          className='absolute top-5 right-5 cursor-pointer'
          onClick={closeMenu}
        />

        {/* Input */}
        <div className='relative mt-14'>
          <IoSearchOutline size={20} className='absolute top-2 left-2' />
          <input
            type='text'
            placeholder='Buscar'
            className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500'
          />
        </div>

        {/* Menú */}
        {isAuthenticated && (
          <>
            <Link
              href='/profile'
              onClick={closeMenu}
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
              <IoPersonOutline size={30} />
              <span className='ml-3 text-xl'>Perfil</span>
            </Link>
            <Link
              href='/orders'
              onClick={closeMenu}
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
              <IoTicketOutline size={30} />
              <span className='ml-3 text-xl'>Mis órdenes</span>
            </Link>
          </>
        )}

        {isAuthenticated && (
          <button
            onClick={() => {
              logout();
              closeMenu();
            }}
            className='flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
          >
            <IoLogOutOutline size={30} />
            <span className='ml-3 text-xl'>Salir</span>
          </button>
        )}

        {!isAuthenticated && (
          <Link
            href='/auth/login'
            onClick={closeMenu}
            className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
          >
            <IoLogInOutline size={30} />
            <span className='ml-3 text-xl'>Ingresar</span>
          </Link>
        )}

        {isAdmin && (
          <>
            {/* Line Separator */}
            <div className='w-full h-px bg-gray-200 my-10' />

            <Link
              href='/admin/products'
              onClick={closeMenu}
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
              <IoShirtOutline size={30} />
              <span className='ml-3 text-xl'>Productos</span>
            </Link>
            <Link
              href='/admin/orders'
              onClick={closeMenu}
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
              <IoTicketOutline size={30} />
              <span className='ml-3 text-xl'>Órdenes</span>
            </Link>
            <Link
              href='/admin/users'
              onClick={closeMenu}
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
              <IoPeopleOutline size={30} />
              <span className='ml-3 text-xl'>Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </>
  );
};
