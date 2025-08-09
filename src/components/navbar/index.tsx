// components/layout/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  LogIn,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/lib/context/authContext';
import { signOutAction } from '@/actions/sign-out-email.actions';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { isAuthenticated, setUser } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter()
  /* Links principais – edite se precisar */
  const links = [
    { href: '/', label: 'Início' },
    { href: '/collections', label: 'Coleções' },
    { href: '/categories', label: 'Categorias' },
    { href: '/contact', label: 'Contato' },
  ];

  async function handleLogout() {
    const { error } = await signOutAction();
    if (!error) {
      setUser(null);        // atualiza contexto
      router.push("/auth/login");   // redireciona
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-pink-200 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight text-pink-600"
        >
          Bag Store
        </Link>

        <ul className="hidden items-center gap-8 font-medium text-pink-800 md:flex">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="transition hover:text-pink-500"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* Search (desktop) */}
          <div className="hidden items-center rounded-full bg-pink-100 px-3 py-1.5 md:flex">
            <Search className="mr-2 h-4 w-4 text-pink-500" />
            <input
              type="text"
              placeholder="Buscar…"
              className="w-40 bg-transparent text-sm text-pink-900 placeholder-pink-500 focus:outline-none"
            />
          </div>

          {/* Login / Logout */}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="hidden items-center gap-1 rounded-full bg-pink-400 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-pink-500 md:flex"
            >
              <LogOut className="h-4 w-4" /> Sair
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="hidden items-center gap-1 rounded-full bg-pink-400 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-pink-500 md:flex"
            >
              <LogIn className="h-4 w-4" /> Entrar
            </Link>
          )}

          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-pink-100 transition hover:bg-pink-200"
            aria-label="Carrinho"
          >
            <ShoppingBag className="h-5 w-5 text-pink-600" />
            {/* <span className="absolute -right-1 -top-1 h-4 min-w-4 rounded-full bg-pink-500 text-[10px] font-bold text-white">2</span> */}
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center md:hidden"
            aria-label="Abrir menu"
          >
            {open ? (
              <X className="h-6 w-6 text-pink-700" />
            ) : (
              <Menu className="h-6 w-6 text-pink-700" />
            )}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden">
          <ul className="flex flex-col gap-4 border-t border-pink-200 bg-white px-6 py-4 text-pink-800">
            {/* busca mobile */}
            <li>
              <div className="flex items-center rounded-full bg-pink-100 px-3 py-2">
                <Search className="mr-2 h-4 w-4 text-pink-500" />
                <input
                  type="text"
                  placeholder="Buscar…"
                  className="flex-1 bg-transparent text-sm text-pink-900 placeholder-pink-500 focus:outline-none"
                />
              </div>
            </li>

            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block py-1 transition hover:text-pink-500"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}

            <li className="flex items-center gap-2">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    console.log('logout');
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-full bg-pink-400 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-500"
                >
                  <LogOut className="h-4 w-4" /> Sair
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  className="flex w-full items-center gap-2 rounded-full bg-pink-400 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-500"
                  onClick={() => setOpen(false)}
                >
                  <LogIn className="h-4 w-4" /> Entrar
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
