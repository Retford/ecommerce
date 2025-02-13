'use server';

import prisma from '@/lib/prisma';

export const getUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findUnique({
      where: { userId: userId },
    });

    if (!address) return null;
    const { countryId, addressTwo, ...rest } = address;

    return {
      ...rest,
      addressTwo: addressTwo ? addressTwo : '',
      country: countryId,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
