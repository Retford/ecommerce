'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

interface OrderOptions {
  userId: string;
  page?: number;
  take?: number;
}

export const getOrdersByUser = async ({
  userId,
  page = 1,
  take = 12,
}: OrderOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const session = await auth();

    if (!session?.user) {
      return {
        ok: false,
        message: 'Debe de estar autenticado',
      };
    }

    const [orders, totalCount] = await prisma.$transaction([
      prisma.order.findMany({
        where: { userId },
        take: take,
        skip: (page - 1) * take,
        include: {
          OrderAddress: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      }),

      prisma.order.count({
        where: { userId },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / take);

    return {
      ok: true,
      orders,
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
