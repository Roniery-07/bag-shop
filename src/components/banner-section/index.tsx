'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function BannerSection() {
  return (
    <div className="relative h-[60vh] w-full overflow-hidden rounded-b-3xl bg-pink-50">
      <Image
        src="/banners/hero.webp" /* troque pelo seu asset */
        alt="Coleção primavera-verão"
        fill
        priority
        className="object-cover object-center"
      />

      {/* CTA centralizado */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-pink-950/10 backdrop-blur-[2px]">
        <h1 className="text-center text-4xl font-bold text-pink-50 drop-shadow-md sm:text-5xl">
          Bem-vinda à Bag&nbsp;Store
        </h1>
        <p className="max-w-md text-center text-lg text-pink-50">
          Peças feitas com carinho para brilhar no seu dia a dia ✨
        </p>
        <Link
          href="/products"
          className="rounded-full bg-pink-400 px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-pink-500"
        >
          Comprar agora
        </Link>
      </div>
    </div>
  );
}
