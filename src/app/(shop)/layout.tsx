import { Footer } from '@/components/ui/footer/Footer';
import { SideBar } from '@/components/ui/sidebar/Sidebar';
import { TopMenu } from '@/components/ui/top-menu/TopMenu';
import { Suspense } from 'react';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='min-h-screen'>
      <TopMenu />

      <Suspense>
        <SideBar />
      </Suspense>

      <div className='px-0 sm:px-10'>{children}</div>
      <Footer />
    </main>
  );
}
