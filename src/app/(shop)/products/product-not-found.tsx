import { X } from 'lucide-react';
import Link from 'next/link';
export const ProductNotFoundCard = () => {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-900 w-full">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-300">
        <X className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-medium">Não encontramos esse produto 😥</h3>
      <p className="mt-1 text-sm text-neutral-500">
        Tente digitar palavras completas como &#34;bolsa&#34;,
        &#34;carteira&#34;...
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
      >
        Ver produtos
      </Link>
    </div>
  );
};
