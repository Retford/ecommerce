import { Title } from '@/components/ui/title/Title';
import { redirect } from 'next/navigation';
import { Pagination } from '@/components/ui/pagination/Pagination';
import { UserTable } from './ui/UserTable';
import { getPaginatedUsers } from '@/actions/user/get-paginated-users';

interface Props {
  searchParams: Promise<{ page: string }>;
}

export default async function UsersPage({ searchParams }: Props) {
  const pages = (await searchParams).page;
  const page = pages ? parseInt(pages) : 1;

  const {
    ok,
    users = [],
    totalPages = 1,
  } = await getPaginatedUsers({ page: page });

  if (!ok) {
    redirect('/auth/login');
  }

  return (
    <>
      <Title title='Mantenimiento de los usuarios' />
      <div className='mb-10'>
        <UserTable users={users} />
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
