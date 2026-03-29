import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, ArrowLeft, Check, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import Footer from '@/components/Footer';

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-white mb-4">Produto nao encontrado</h1>
          <Link to="/shop" className="text-neutral-400 hover:text-white transition-colors text-sm">
            Voltar para a Loja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" strokeWidth={1.5} />
            Voltar para a Loja
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-neutral-950 border border-neutral-900 rounded-lg overflow-hidden aspect-square">
              <img
                src={product.image}
                alt={product.name}
                width={800}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-white text-black text-xs font-medium rounded">
                {product.badge}
              </span>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            {/* Brand & Title */}
            <div>
              <p className="text-xs text-neutral-500 font-medium uppercase tracking-widest mb-3">
                {product.brand}
              </p>
              <h1 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-white fill-white' : 'text-neutral-800'}`} 
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <span className="text-sm text-neutral-500">
                {product.rating} ({product.reviews} avaliacoes)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-medium text-white">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-neutral-600 line-through">
                  R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-neutral-400 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-white uppercase tracking-wider">
                Caracteristicas
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {product.features.map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm text-neutral-400">
                    <Check className="w-4 h-4 text-white flex-shrink-0" strokeWidth={1.5} />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => addItem(product)}
              className="w-full py-4 bg-white text-black font-medium text-sm flex items-center justify-center gap-3 transition-all duration-200 hover:bg-neutral-200 active:scale-[0.98] rounded"
            >
              <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
              Adicionar ao Carrinho
            </button>

            {/* Shipping Info */}
            <div className="flex items-center gap-3 text-sm text-neutral-500 pt-4 border-t border-neutral-900">
              <Truck className="w-4 h-4 text-white" strokeWidth={1.5} />
              Frete gratis para pedidos acima de R$ 150
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
