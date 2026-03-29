import { motion } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-muted-foreground/30"
    >
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-square bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-foreground text-background text-[10px] font-semibold tracking-wide uppercase">
            {product.badge}
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Brand & Rating */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
            {product.brand}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-foreground fill-foreground" />
            <span className="text-xs text-muted-foreground">{product.rating}</span>
          </div>
        </div>

        {/* Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-foreground font-medium text-sm leading-snug line-clamp-2 group-hover:text-muted-foreground transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        {/* Flavor */}
        {product.flavor && (
          <p className="text-muted-foreground text-xs truncate">{product.flavor}</p>
        )}

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-foreground font-semibold text-base">
              R$ {product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-muted-foreground text-xs line-through">
                R$ {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            className="p-2.5 rounded-lg bg-foreground text-background transition-all duration-200 hover:opacity-80 active:scale-95"
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
