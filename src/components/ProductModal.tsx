import { motion } from "motion/react";
import { X, ShoppingBag, Heart } from "lucide-react";
import { Product } from "../types";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isFavorited = isInWishlist(product.id);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-black/60 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-5xl bg-brand-white shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
      >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-brand-white/80 backdrop-blur hover:bg-brand-black hover:text-brand-white transition-colors rounded-full"
          >
            <X size={20} />
          </button>

          {/* Image Section */}
          <div className="w-full md:w-1/2 relative border-r border-brand-black/5 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.isNew && (
              <span className="absolute top-6 left-6 bg-brand-black text-brand-white text-[10px] font-bold uppercase tracking-widest px-4 py-2">
                New Arrival
              </span>
            )}
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
            <div className="space-y-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.1em] text-brand-black/40 font-sans mb-2">
                  {product.category}
                </p>
                <h2 className="text-4xl md:text-5xl font-serif font-light tracking-[0.05em] mb-4">
                  {product.name}
                </h2>
                <div className="flex items-center gap-4">
                  {product.isSale ? (
                    <>
                      <span className="text-2xl font-sans tracking-[0.05em] text-brand-black">${product.salePrice}</span>
                      <span className="text-lg text-brand-black/40 line-through font-sans">${product.price}</span>
                    </>
                  ) : (
                    <span className="text-2xl font-sans tracking-[0.05em]">${product.price}</span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[11px] uppercase tracking-[0.1em] font-sans text-brand-black/40">Description</h4>
                <p className="text-brand-black/70 leading-relaxed font-sans font-light">
                  {product.description}
                </p>
              </div>

              {/* Options (Mock) */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-[11px] uppercase tracking-[0.1em] font-sans text-brand-black/40">Select Size</h4>
                  <div className="flex flex-wrap gap-2">
                    {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                      <button
                        key={size}
                        className="w-12 h-12 border border-brand-black/10 flex items-center justify-center text-[11px] font-sans uppercase tracking-[0.1em] hover:border-brand-black transition-colors"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[11px] uppercase tracking-[0.1em] font-sans text-brand-black/40">Select Color</h4>
                  <div className="flex gap-3">
                    {['#000000', '#FFFFFF', '#E5E5E5'].map((color) => (
                      <button
                        key={color}
                        className="w-8 h-8 rounded-full border border-brand-black/10 p-1"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button 
                  onClick={() => {
                    addToCart(product);
                    onClose();
                  }}
                  className="flex-1 bg-brand-black text-brand-white py-5 px-8 uppercase tracking-[0.1em] text-[11px] font-sans flex items-center justify-center gap-3 hover:bg-brand-black/90 transition-colors group"
                >
                  <ShoppingBag size={18} />
                  Add to Shopping Bag
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                    console.log(`Wishlist Updated: ${product.name}`);
                  }}
                  className={`w-full sm:w-16 h-16 border border-brand-black/10 flex items-center justify-center transition-colors ${
                    isFavorited ? 'bg-brand-black text-brand-white' : 'hover:bg-brand-black hover:text-brand-white'
                  }`}
                >
                  <Heart size={20} fill={isFavorited ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Extra Info */}
              <div className="pt-8 border-t border-brand-black/5 space-y-4">
                <div className="flex items-center gap-3 text-xs text-brand-black/60">
                  <span className="font-bold text-brand-black uppercase tracking-widest">SKU:</span>
                  AT-00{product.id}
                </div>
                <div className="flex items-center gap-3 text-xs text-brand-black/60">
                  <span className="font-bold text-brand-black uppercase tracking-widest">Shipping:</span>
                  Free Express Shipping on orders over $200
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
  );
}
