import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { products } from '@/data/products';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [category, setCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { value: 'all', label: 'Todos' },
    { value: 'pods', label: 'Pods' },
    { value: 'kits', label: 'Kits' },
    { value: 'accessories', label: 'Acessorios' },
  ];

  const filtered = useMemo(() => {
    let list = category === 'all' ? products : products.filter(p => p.category === category);
    if (sortBy === 'price-low') list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [category, sortBy]);

  return (
    <div className="min-h-screen pt-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-medium text-white tracking-tight">Loja</h1>
          <p className="text-neutral-500 mt-2">Explore nossa colecao premium</p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-neutral-900">
          {/* Categories */}
          <div className="flex gap-1">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded ${
                  category === cat.value
                    ? 'bg-white text-black'
                    : 'text-neutral-500 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="w-4 h-4 text-neutral-600" strokeWidth={1.5} />
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="appearance-none bg-neutral-950 text-neutral-300 text-sm pl-3 pr-8 py-2 border border-neutral-800 rounded focus:outline-none focus:border-neutral-700 cursor-pointer"
              >
                <option value="popular">Popular</option>
                <option value="price-low">Preco: Menor para Maior</option>
                <option value="price-high">Preco: Maior para Menor</option>
                <option value="rating">Mais Avaliados</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 pointer-events-none" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <ProductCard product={product} index={i} />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-500">Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}

        {/* Results count */}
        {filtered.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-neutral-600 text-sm">
              Mostrando {filtered.length} {filtered.length === 1 ? 'produto' : 'produtos'}
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
