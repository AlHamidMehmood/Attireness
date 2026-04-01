import { ShoppingBag, Search, User, Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
          <button 
            className="lg:hidden p-2 -ml-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-serif font-bold tracking-tighter">
              ATTIRENESS<span className="text-brand-accent">.</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium uppercase tracking-widest hover:text-brand-accent transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            <button className="p-2 hover:text-brand-accent transition-colors">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button className="hidden sm:block p-2 hover:text-brand-accent transition-colors">
              <User size={20} strokeWidth={1.5} />
            </button>
            <button className="hidden sm:block p-2 hover:text-brand-accent transition-colors">
              <Heart size={20} strokeWidth={1.5} />
            </button>
            <button className="p-2 relative hover:text-brand-accent transition-colors">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-accent rounded-full"></span>
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
