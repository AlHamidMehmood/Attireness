import { ShoppingBag, Search, User, Heart, Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { setIsCartOpen, itemCount } = useCart();
  const { displayCurrency, setDisplayCurrency } = useCurrency();

  const navLinks = [
    { name: "New Arrivals", href: "#" },
    { name: "Categories", href: "#" },
    { name: "Collections", href: "#" },
    { name: "Sale", href: "#" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-brand-white/80 backdrop-blur-md border-b border-brand-black/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Toggle */}
          <div className="flex items-center lg:hidden">
            <button 
              className="p-2 -ml-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-serif font-light tracking-[0.05em]">
              ATTIRENESS<span className="text-brand-black">.</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] font-sans uppercase tracking-[0.15em] hover:text-brand-black/60 transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            {/* Currency Switcher */}
            <div className="hidden md:flex items-center space-x-2 border-r border-brand-black/5 pr-5 mr-2">
              <button 
                onClick={() => setDisplayCurrency('USD')}
                className={`text-[10px] font-sans uppercase tracking-widest transition-colors ${displayCurrency === 'USD' ? 'text-brand-black font-bold' : 'text-brand-black/40 hover:text-brand-black'}`}
              >
                USD
              </button>
              <span className="text-brand-black/10">/</span>
              <button 
                onClick={() => setDisplayCurrency('PKR')}
                className={`text-[10px] font-sans uppercase tracking-widest transition-colors ${displayCurrency === 'PKR' ? 'text-brand-black font-bold' : 'text-brand-black/40 hover:text-brand-black'}`}
              >
                PKR
              </button>
            </div>

            <button className="p-2 hover:text-brand-black/60 transition-colors">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button className="hidden sm:block p-2 hover:text-brand-black/60 transition-colors">
              <User size={20} strokeWidth={1.5} />
            </button>
            <button className="hidden sm:block p-2 hover:text-brand-black/60 transition-colors">
              <Heart size={20} strokeWidth={1.5} />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 relative hover:text-brand-black/60 transition-colors"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-brand-black text-brand-white text-[8px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-20 left-0 w-full bg-brand-white border-b border-brand-black/5 px-6 py-8 shadow-xl"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium tracking-wide"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-6 border-t border-brand-black/5 flex space-x-6">
                <User size={20} />
                <Heart size={20} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
