// components/category/CategoryCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface Category {
  id: number | string;
  name: string;
  image: string;
  description?: string;
  cta?: string;          // texto do botão/cta
}

interface Props {
  category: Category;
}

export const CategoryCard = ({ category }: Props) => {
  return (
    <Link
      href={`/collections/${category.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow transition hover:shadow-lg"
    >
      {/* Imagem */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 768px) 300px, 45vw"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-lg font-semibold text-pink-900">{category.name}</h3>

        {category.description && (
          <p className="text-sm text-pink-700 line-clamp-2">
            {category.description}
          </p>
        )}

        {/* Espaço elástico empurra o CTA para o fundo */}
        <div className="flex-1" />

        {category.cta && (
          <span className="inline-flex items-center gap-1 text-sm font-medium text-pink-500 transition group-hover:underline">
            {category.cta}
            <ArrowRight className="h-4 w-4" />
          </span>
        )}
      </div>
    </Link>
  );
};
