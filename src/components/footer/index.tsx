// components/layout/Footer.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Instagram, Facebook, Heart} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="mt-20 bg-pink-50 text-pink-900">
      {/* Top section – newsletter + menus */}
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Newsletter */}
        <div className="col-span-full lg:col-span-1">
          <h2 className="mb-3 text-lg font-semibold">
            Fique por dentro ✨
          </h2>
          <p className="mb-4 text-sm">
            Receba novidades, promoções e conteúdos fofos direto no seu e-mail.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              placeholder="you@example.com"
              required
              className="flex-1 bg-white placeholder-pink-400 focus-visible:ring-pink-400"
            />
            <Button type="submit" className="bg-pink-400 hover:bg-pink-500">
              <Mail className="mr-1 h-4 w-4" />
              Assinar
            </Button>
          </form>
        </div>

        {/* Loja */}
        <FooterColumn title="Loja">
          <FooterLink href="/products">Todos os produtos</FooterLink>
          <FooterLink href="/collections/novidades">Novidades</FooterLink>
          <FooterLink href="/collections/promo">Promoções</FooterLink>
          <FooterLink href="/gift-card">Gift Card</FooterLink>
        </FooterColumn>

        {/* Institucional */}
        <FooterColumn title="Institucional">
          <FooterLink href="/about">Sobre nós</FooterLink>
          <FooterLink href="/sustentabilidade">Sustentabilidade</FooterLink>
          <FooterLink href="/blog">Blog</FooterLink>
          <FooterLink href="/careers">Carreiras</FooterLink>
        </FooterColumn>

        {/* Suporte */}
        <FooterColumn title="Suporte">
          <FooterLink href="/faq">FAQ</FooterLink>
          <FooterLink href="/trocas-e-devolucoes">Trocas &amp; devoluções</FooterLink>
          <FooterLink href="/contato">Fale conosco</FooterLink>
          <FooterLink href="/privacidade">Política de privacidade</FooterLink>
        </FooterColumn>
      </div>

      {/* Divider */}
      <div className="border-t border-pink-200" />

      {/* Bottom section – social + pagamentos + copyright */}
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-6 py-8 sm:flex-row sm:justify-between">
        {/* Social icons */}
        <ul className="flex gap-4">
          <SocialIcon href="https://instagram.com">
            <Instagram />
          </SocialIcon>
          <SocialIcon href="https://facebook.com">
            <Facebook />
          </SocialIcon>

        </ul>

        {/* Payment methods (exemplo genérico) */}
        {/* <div className="flex flex-wrap items-center justify-center gap-4">
          <Image
            src="/payments/visa.svg"
            alt="Visa"
            width={40}
            height={24}
            className="opacity-80"
          />
          <Image
            src="/payments/mastercard.svg"
            alt="Mastercard"
            width={40}
            height={24}
            className="opacity-80"
          />
          <Image
            src="/payments/pix.svg"
            alt="Pix"
            width={40}
            height={24}
            className="opacity-80"
          />
          <Image
            src="/payments/amex.svg"
            alt="Amex"
            width={40}
            height={24}
            className="opacity-80"
          />
        </div> */}

        {/* Copyright */}
        <p className="text-xs text-pink-700">
          © {new Date().getFullYear()} Cute Store — feito com&nbsp;
          <Heart className="inline h-3 w-3 fill-pink-500 stroke-pink-500" /> em Minas Gerais
        </p>
      </div>
    </footer>
  );
}

/* ---------- Helpers ---------- */

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="mb-2 font-semibold">{title}</h3>
      <nav className="flex flex-col gap-1 text-sm text-pink-700">{children}</nav>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="transition hover:text-pink-500 hover:underline"
    >
      {children}
    </Link>
  );
}

function SocialIcon({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={href}
      className="rounded-full p-2 transition hover:bg-pink-200"
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </Link>
  );
}
