export const generatePaginationNumbers = (
  currentPage: number,
  totalPages: number
) => {
  // Si el número total de páginas es 7 o menos
  // vamos a mostrar todas las paginas sin puntos suspensivos
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  //   Si la página actual está entre las 3 primeras páginas
  //   Mostrar las primeras 3, puntos suspensivos, y las últimas 2

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  //   Si la página actual está entre las últimas 3 páginas
  //   mostrar las primeras 2, puntos suspensivos, las últimas 3 páginas

  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // Si la página actual está en otro lugar medio
  // mostrar la primera página, puntos suspensivos, la página actual y vecinos
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
