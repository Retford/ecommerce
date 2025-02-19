'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

interface OrderOptions {
  page?: number;
  take?: number;
}

export const getPaginatedUsers = async ({
  page = 1,
  take = 12,
}: OrderOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const session = await auth();

    if (session?.user.role !== 'admin') {
      return {
        ok: false,
        message: 'Debe de ser un usuario administrador',
      };
    }

    const [users, totalCount] = await prisma.$transaction([
      prisma.user.findMany({
        orderBy: {
          name: 'asc',
        },
        take: take,
        skip: (page - 1) * take,
      }),

      prisma.user.count(),
    ]);

    const totalPages = Math.ceil(totalCount / take);

    return {
      ok: true,
      users,
      totalPages: totalPages,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No tiene ordenes el usuario',
    };
  }
};
