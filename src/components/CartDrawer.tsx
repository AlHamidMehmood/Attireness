import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, totalPrice, isCartOpen, setIsCartOpen, itemCount } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
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
                <ShoppingBag size={20} />
                <h2 className="text-xl font-serif font-bold tracking-tight">Shopping Bag</h2>
                <span className="text-[10px] font-bold bg-brand-black text-brand-white px-2 py-0.5 rounded-full">
                  {itemCount}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-brand-black hover:text-brand-white transition-colors rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-brand-black/20">
                    <ShoppingBag size={32} />
                  </div>
                  <p className="text-brand-black/40 font-serif italic text-lg">Your bag is empty.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-[10px] font-bold uppercase tracking-widest border-b border-brand-black pb-1 hover:text-brand-black/60 hover:border-brand-black/60 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-24 aspect-[3/4] bg-gray-50 overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="space-y-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-medium tracking-tight">{item.name}</h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-brand-black/20 hover:text-brand-black transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-[10px] uppercase tracking-widest text-brand-black/40 font-semibold">
                          {item.category}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-brand-black/10">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-50 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-50 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="text-sm font-bold">
                          ${(item.isSale && item.salePrice ? item.salePrice : item.price) * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-brand-black/5 bg-gray-50/50 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-black/40">Subtotal</span>
                  <span className="text-xl font-bold">${totalPrice}</span>
                </div>
                <p className="text-[10px] text-brand-black/40 text-center">
                  Shipping and taxes calculated at checkout.
                </p>
                <button className="w-full bg-brand-black text-brand-white py-5 px-8 uppercase tracking-widest text-xs font-bold hover:bg-brand-black/80 transition-all duration-300">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
