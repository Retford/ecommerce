'use client';

import { useUIStore } from '@/store/ui/ui-store';

export const OpenMenuButton = () => {
  const openMenu = useUIStore((state) => state.openSideMenu);

  return (
    <button
      onClick={openMenu}
      className='m-2 p-2 rounded-md transition-all hover:bg-gray-100 duration-500'
    >
      Menú
    </button>
  );
};
