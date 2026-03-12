'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/product-card';
import { Input } from '@/components/ui/input';
import { ListProductOutputDto } from '@/usecases/product/list-product.usecases';
import { Loader, LucideLoader, Search } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';
import { ProductNotFoundCard } from './product-not-found';

export default function ProductsPage() {
  const [products, setProducts] = useState<ListProductOutputDto>([]);
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const debouncedValue = useDebounce(500, searchInput);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const url = debouncedValue
        ? `/api/products?search=${encodeURIComponent(debouncedValue)}`
        : '/api/products';
      const res = await fetch(url);
      const data = await res.json();
      setIsLoading(false);
      setProducts(data);
    };

    fetchProducts();
  }, [debouncedValue]);

  const handleSearchInput = (value: string) => {
    setSearchInput(value);
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-6 min-h-dvh relative">
      <div className="flex justify-center mb-8">
        <div className="flex justify-center mb-4 items-center bg-pink-50 px-5 rounded-md w-72 lg:w-1/3">
          <label htmlFor="product-input">
            <Search className="mr-2 h-4 w-4 text-pink-500" />
          </label>
          <Input
            id="product-input"
            placeholder="Bolsa Meraki"
            className="w-2xl border-none focus-visible:ring-0 bg-none shadow-none bg-transparent"
            onChange={(e) => handleSearchInput(e.target.value)}
          />
        </div>
      </div>
      {isLoading && (
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 text-center shadow-sm">
            <LucideLoader className="animate-spin text-gray-400" />
          </div>
        </div>
      )}
      {!isLoading && products.length === 0 ? (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-8/12 w-full px-6 flex justify-center">
          <ProductNotFoundCard />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {products.map((p) => (
            <div key={p.id} className="col-span-1 flex justify-center">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
