import { Link } from "react-router-dom";
import { ShoppingBag, Search, User, Heart, Menu, X, Globe, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { useWishlist } from "../context/WishlistContext";
import { useCategory, CATEGORIES, Category } from "../context/CategoryContext";
import { Product } from "../types";
import { convertPrice, formatPrice } from "../lib/currency";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const { setIsCartOpen, itemCount } = useCart();
  const { displayCurrency, setDisplayCurrency } = useCurrency();
  const { setIsWishlistOpen, wishlist } = useWishlist();
  const { activeCategory, setActiveCategory } = useCategory();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Ensure absolute path for reliability across routes
        const response = await fetch('/products.json');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products for search:", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = searchQuery.trim() === "" 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4);

  const navLinks = CATEGORIES.map(cat => ({ name: cat, href: "#" }));

  return (
    <>
      <nav className="z-50 bg-brand-white relative">
        {/* Top Row: Logo & Icons */}
        <div className="border-b border-brand-black/5 bg-brand-white">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between relative">
            {/* Mobile Menu Toggle */}
            <div className="flex items-center lg:hidden flex-1">
              <button 
                className="p-2 -ml-2"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            
            {/* Spacer for desktop to help center logo */}
            <div className="hidden lg:block flex-1"></div>

            {/* Logo Centered */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link to="/" className="text-2xl font-serif font-light tracking-[0.05em]">
                ATTIRENESS<span className="text-brand-black">.</span>
              </Link>
            </div>

            {/* Icons Right */}
            <div className="flex items-center space-x-5 flex-1 justify-end">
              {/* Currency Switcher */}
              <div className="hidden xl:flex items-center space-x-2 border-r border-brand-black/5 pr-5 mr-2">
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

              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:text-brand-black/60 transition-colors"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>
              <button className="hidden sm:block p-2 hover:text-brand-black/60 transition-colors">
                <User size={20} strokeWidth={1.5} />
              </button>
              <button 
                onClick={() => setIsWishlistOpen(true)}
                className="hidden sm:block p-2 relative hover:text-brand-black/60 transition-colors"
              >
                <Heart size={20} strokeWidth={1.5} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-brand-black text-brand-white text-[8px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
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

        {/* Bottom Row: Categories - Sticky */}
        <div className="sticky top-0 z-50 bg-brand-white/90 backdrop-blur-md border-b border-brand-black/5 hidden lg:block">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-12 h-12 flex items-center justify-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => setActiveCategory(link.name as Category)}
                className={`text-[11px] font-sans uppercase tracking-[0.15em] transition-colors duration-300 ${
                  activeCategory === link.name ? 'text-brand-black font-bold' : 'text-brand-black/40 hover:text-brand-black'
                }`}
              >
                {link.name}
              </button>
            ))}
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
                  <button
                    key={link.name}
                    className={`text-left text-lg font-medium tracking-wide ${
                      activeCategory === link.name ? 'text-brand-black' : 'text-brand-black/40'
                    }`}
                    onClick={() => {
                      setActiveCategory(link.name as Category);
                      setIsOpen(false);
                    }}
                  >
                    {link.name}
                  </button>
                ))}
                <div className="pt-6 border-t border-brand-black/5 flex space-x-6">
                  <User size={20} />
                  <button onClick={() => { setIsWishlistOpen(true); setIsOpen(false); }}>
                    <Heart size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-white flex flex-col"
          >
            <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 pt-32">
              <div className="flex items-center justify-between border-b border-brand-black pb-4">
                <div className="flex items-center gap-4 flex-1">
                  <Search size={24} className="text-brand-black/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="SEARCH OUR COLLECTION..."
                    className="w-full bg-transparent outline-none text-3xl md:text-4xl font-serif font-light tracking-tight placeholder:text-brand-black/10"
                    autoFocus
                  />
                </div>
                <button 
                  onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                  className="p-2 hover:bg-brand-black hover:text-brand-white transition-colors rounded-full"
                >
                  <X size={32} strokeWidth={1} />
                </button>
              </div>

              <div className="mt-12">
                {searchQuery.trim() !== "" && (
                  <div className="space-y-12">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[11px] font-sans uppercase tracking-[0.2em] text-brand-black/40">
                        Search Results ({filteredProducts.length})
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {filteredProducts.map((product) => {
                        const currentPrice = convertPrice(product.basePrice, product.baseCurrency, displayCurrency);
                        return (
                          <motion.div 
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="group cursor-pointer"
                            onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                          >
                            <div className="aspect-[3/4] overflow-hidden mb-4">
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <h4 className="text-[11px] font-sans uppercase tracking-[0.1em] mb-1">{product.name}</h4>
                            <p className="text-[11px] font-sans text-brand-black/40 uppercase tracking-[0.1em]">
                              {formatPrice(currentPrice, displayCurrency)}
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>

                    {filteredProducts.length === 0 && (
                      <p className="text-xl font-serif italic text-brand-black/40">No products found matching your search.</p>
                    )}
                  </div>
                )}

                {searchQuery.trim() === "" && (
                  <div className="space-y-8">
                    <h3 className="text-[11px] font-sans uppercase tracking-[0.2em] text-brand-black/40">
                      Suggested Categories
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setActiveCategory(cat as Category);
                            setIsSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="px-6 py-3 border border-brand-black/10 text-[11px] font-sans uppercase tracking-[0.15em] hover:border-brand-black transition-colors"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
