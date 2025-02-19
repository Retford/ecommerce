'use client';

import { changeUserRole } from '@/actions/user/change-user-role';
import { User } from '@/interfaces/user.interface';

interface Props {
  users: User[];
}
export const UserTable = ({ users }: Props) => {
  return (
    <table className='min-w-full'>
      <thead className='bg-gray-200 border-b'>
        <tr>
          <th
            scope='col'
            className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
          >
            Email
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
            Rol
          </th>
        </tr>
      </thead>
      <tbody>
        {users.length !== 0 ? (
          users.map((user) => (
            <tr
              key={user.id}
              className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'
            >
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                {user.email}
              </td>
              <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                {user.name}
              </td>
              <td className='flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                <select
                  className='text-sm text-gray-900 w-full p-2'
                  value={user.role}
                  onChange={async (event) =>
                    await changeUserRole(
                      user.id,
                      event.target.value as 'admin' | 'user'
                    )
                  }
                >
                  <option value='admin'>Admin</option>
                  <option value='user'>User</option>
                </select>
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
  );
};
