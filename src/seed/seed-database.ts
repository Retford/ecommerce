import prisma from '../lib/prisma';
import { initialData } from './seed';

async function main() {
  // 1. Borrar registros previos

  //! Resolver PROMESAS en simultáneo
  // await Promise.all([
  //   prisma.productImage.deleteMany(),
  //   prisma.product.deleteMany(),
  //   prisma.category.deleteMany(),
  // ]);

  await prisma.user.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Categorías

  const { users, categories, products } = initialData;

  await prisma.user.createMany({ data: users });

  const categoriesData = categories.map((category) => ({ name: category }));

  await prisma.category.createMany({ data: categoriesData });

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  // Products

  products.forEach(async (product) => {
    const { type, images, ...rest } = product;

    //! 1. Forma corta

    // await prisma.product.create({
    //   data: {
    //     ...rest,
    //     categoryId: categoriesMap[type],
    //     ProductImage: {
    //       createMany: {
    //         data: images.map((image) => ({
    //           url: image,
    //         })),
    //       },
    //     },
    //   },
    // });

    //! 2. Forma larga

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    // Images

    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  console.log('Seed ejecutado correctamente');
}

(() => {
  if (process.env.NODE_ENV === 'production') return;

  main();
})();
