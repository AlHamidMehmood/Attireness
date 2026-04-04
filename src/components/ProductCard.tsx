import React, { useState } from "react";
import { motion } from "motion/react";
import { ShoppingBag, Heart, Eye } from "lucide-react";
import { Product } from "../types";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { convertPrice, formatPrice } from "../lib/currency";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product | null) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { displayCurrency } = useCurrency();
  const isFavorited = isInWishlist(product.id);

  const currentPrice = convertPrice(product.basePrice, product.baseCurrency, displayCurrency);
  const formattedPrice = formatPrice(currentPrice, displayCurrency);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-brand-black text-brand-white text-[9px] font-sans uppercase tracking-[0.1em] px-2 py-1">
              New
            </span>
          )}
          {product.isSale && (
            <span className="bg-brand-black text-brand-white text-[9px] font-sans uppercase tracking-[0.1em] px-2 py-1">
              Sale
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-6 space-y-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-[11px] font-sans uppercase tracking-[0.1em] text-brand-black">
              {product.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-sans uppercase tracking-[0.1em] text-brand-black">{formattedPrice}</span>
            </div>
          </div>
        </div>
        
        {/* Hover-only buttons */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex gap-2 pt-2"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 py-3 border border-brand-black text-brand-black text-[10px] font-sans uppercase tracking-[0.1em] hover:bg-brand-black hover:text-brand-white transition-all duration-300"
          >
            Details
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex-1 py-3 bg-brand-black text-brand-white text-[10px] font-sans uppercase tracking-[0.1em] hover:bg-brand-black/80 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ShoppingBag size={12} />
            Add
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`w-12 h-12 border border-brand-black/10 flex items-center justify-center transition-colors ${
              isFavorited ? 'bg-brand-black text-brand-white' : 'hover:bg-brand-black hover:text-brand-white'
            }`}
          >
            <Heart size={14} fill={isFavorited ? "currentColor" : "none"} />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
