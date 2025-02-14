'use server';

import prisma from '@/lib/prisma';

export const deleteUserAddress = async (userId: string) => {
  try {
    const existingAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });

    if (!existingAddress) {
      return {
        ok: true,
        message: 'No hay dirección guardada',
      };
    }

    await prisma.userAddress.delete({ where: { userId: userId } });

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo eliminar la dirección',
    };
  }
};
