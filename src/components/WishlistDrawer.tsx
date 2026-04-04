import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { convertPrice, formatPrice } from '../lib/currency';
import { Product } from '../types';

export default function WishlistDrawer() {
  const { wishlist, toggleWishlist, isWishlistOpen, setIsWishlistOpen } = useWishlist();
  const { addToCart } = useCart();
  const { displayCurrency } = useCurrency();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products.json');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products for wishlist:", error);
      }
    };
    fetchProducts();
  }, []);

  const favoriteProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="fixed inset-0 bg-brand-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-black/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Heart size={20} className="text-brand-black" />
                <h2 className="text-2xl font-serif font-light tracking-[0.05em]">Favorites</h2>
                <span className="text-[10px] font-sans bg-brand-black text-brand-white px-2 py-0.5 rounded-full">
                  {wishlist.length}
                </span>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-2 hover:bg-brand-black hover:text-brand-white transition-colors rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* Wishlist Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 border border-brand-black/5 rounded-full flex items-center justify-center text-brand-black/20">
                    <Heart size={32} />
                  </div>
                  <p className="text-brand-black/40 font-serif italic text-lg">Your wishlist is empty.</p>
                  <button
                    onClick={() => setIsWishlistOpen(false)}
                    className="text-[11px] font-sans uppercase tracking-[0.1em] border-b border-brand-black pb-1 hover:text-brand-black/60 hover:border-brand-black/60 transition-colors"
                  >
                    Explore Collection
                  </button>
                </div>
              ) : (
                favoriteProducts.map((product) => {
                  const currentPrice = convertPrice(product.basePrice, product.baseCurrency, displayCurrency);
                  
                  return (
                    <div key={product.id} className="flex gap-4 group">
                      <div className="w-24 aspect-[3/4] border border-brand-black/5 overflow-hidden flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="space-y-1">
                          <div className="flex justify-between items-start">
                            <h3 className="text-sm font-serif font-light tracking-[0.05em]">{product.name}</h3>
                            <button
                              onClick={() => toggleWishlist(product.id)}
                              className="text-brand-black/20 hover:text-brand-black transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <p className="text-[10px] uppercase tracking-[0.1em] text-brand-black/40 font-sans">
                            {product.category}
                          </p>
                          <p className="text-xs font-sans tracking-[0.05em] pt-1">
                            {formatPrice(currentPrice, displayCurrency)}
                          </p>
                        </div>

                        <div className="pt-4">
                          <button
                            onClick={() => {
                              addToCart(product);
                              toggleWishlist(product.id);
                            }}
                            className="w-full py-2 bg-brand-black text-brand-white text-[10px] font-sans uppercase tracking-[0.1em] hover:bg-brand-black/80 transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <ShoppingBag size={12} />
                            Move to Bag
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
