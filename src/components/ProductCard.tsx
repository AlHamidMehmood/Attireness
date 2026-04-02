import React, { useState } from "react";
import { motion } from "motion/react";
import { ShoppingBag, Heart, Eye } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product | null) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);

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
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-brand-black text-brand-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
              New
            </span>
          )}
          {product.isSale && (
            <span className="bg-brand-accent text-brand-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
              Sale
            </span>
          )}
        </div>

        {/* Quick Actions Overlay */}
        <div className={`absolute inset-0 bg-brand-black/20 transition-opacity duration-300 flex items-center justify-center gap-3 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            onClick={() => onQuickView(product)}
            className="w-12 h-12 bg-brand-white rounded-full flex items-center justify-center hover:bg-brand-accent hover:text-brand-white transition-colors shadow-lg"
            title="Quick View"
          >
            <Eye size={20} strokeWidth={1.5} />
          </button>
          <button 
            className="w-12 h-12 bg-brand-white rounded-full flex items-center justify-center hover:bg-brand-accent hover:text-brand-white transition-colors shadow-lg"
            title="Add to Wishlist"
          >
            <Heart size={20} strokeWidth={1.5} />
          </button>
          <button 
            className="w-12 h-12 bg-brand-white rounded-full flex items-center justify-center hover:bg-brand-accent hover:text-brand-white transition-colors shadow-lg"
            title="Add to Cart"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-3">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-brand-black/40 font-semibold">
            {product.category}
          </p>
          <h3 className="text-sm font-medium tracking-tight group-hover:text-brand-accent transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            {product.isSale ? (
              <>
                <span className="text-sm font-bold text-brand-accent">${product.salePrice}</span>
                <span className="text-xs text-brand-black/40 line-through">${product.price}</span>
              </>
            ) : (
              <span className="text-sm font-bold">${product.price}</span>
            )}
          </div>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log("Product Details:", { id: product.id, name: product.name });
            onQuickView(product);
          }}
          className="w-full py-3 border border-brand-black/10 text-[10px] font-bold uppercase tracking-widest hover:bg-brand-black hover:text-brand-white transition-all duration-300"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
