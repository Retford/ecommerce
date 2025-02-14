'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getOrdersByUser = async (userId: string) => {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        ok: false,
        message: 'Debe de estar autenticado',
      };
    }

    if (session.user.role === 'user') {
      const orders = await prisma.order.findMany({
        where: { userId },
        include: {
          OrderAddress: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      return {
        ok: true,
        orders,
      };
    } else {
      const orders = await prisma.order.findMany({
        include: {
          OrderAddress: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      return {
        ok: true,
        orders,
      };
    }

    // if (!order) throw `El ${id} no existe`;

    // if (session.user.role === 'user') {
    //   if (session.user.id !== order.userId) {
    //     throw `${id} no es de ese usuario`;
    //   }
    // }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No tiene ordenes el usuario',
    };
  }
};
