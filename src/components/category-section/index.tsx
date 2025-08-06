'use client';

import { CategoryCard } from './CategoryCard';

export const CategorySection = () => {
  const categories = [
    {
      id: 'acessorios',
      name: 'Acessórios',
      image: '/categories/acessorios.webp',
      description: 'Brincos, colares e mais detalhes que fazem a diferença.',
      cta: 'Ver acessórios',
    },
    {
      id: 'roupas',
      name: 'Roupas',
      image: '/categories/roupas.webp',
      description: 'Peças confortáveis e estilosas para todas as ocasiões.',
      cta: 'Ver roupas',
    },
    {
      id: 'beachwear',
      name: 'Beachwear',
      image: '/static/bag-category.jpg',
      description: 'Moda praia pra você curtir o sol com estilo.',
      cta: 'Ver beachwear',
    },
    {
      id: 'sale',
      name: 'Sale',
      image: '/static/purse-category.jpg',
      description: 'Descontos fofos que cabem no seu bolso.',
      cta: 'Aproveitar descontos',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 max-w-5xl">
      {categories.map((cat) => (
        <CategoryCard key={cat.id} category={cat} />
      ))}
    </div>
  );
};
