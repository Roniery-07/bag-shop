'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/product-card';
import { Input } from '@/components/ui/input';
import { ListProductOutputDto } from '@/usecases/product/list-product.usecases';
import { Search } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';

export default function ProductsPage() {
  const [products, setProducts] = useState<ListProductOutputDto>([]);
  const [searchInput, setSearchInput] = useState('');
  const debouncedValue = useDebounce(500, searchInput);

  useEffect(() => {
    const fetchProducts = async () => {
      const url = debouncedValue
        ? `/api/products?search=${encodeURIComponent(debouncedValue)}`
        : '/api/products';
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, [debouncedValue]);

  const handleSearchInput = (value: string) => {
    setSearchInput(value);
  };

  if (!products) {
    return <main></main>;
  }
  return (
    <main className="mx-auto max-w-7xl px-6 py-6">
      <div className="flex justify-center">
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {products.map((p) => (
          <div key={p.id} className="col-span-1 flex justify-center">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </main>
  );
}
