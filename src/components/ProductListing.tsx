import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LayoutGrid, List, Filter, Loader2, Heart } from "lucide-react";
import { Product } from "../types";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { useWishlist } from "../context/WishlistContext";

export default function ProductListing() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Use absolute path which is more reliable in various environments
        const response = await fetch('/products.json');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Fallback to imported constant if fetch fails to ensure the grid reappears
        import("../constants").then(({ PRODUCTS }) => {
          setProducts(PRODUCTS);
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ['All', 'WOMEN', 'MEN', 'FRAGNANCES', 'MAKEUP', 'LEATHER GOODS', 'JEWELRY', 'WATCHES', 'SURPRISES TE GIFTS'];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="products" className="py-24 bg-brand-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <span className="text-brand-accent font-semibold tracking-[0.3em] uppercase text-[10px] mb-2 block">
              Our Selection
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
              Featured Products
            </h2>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6">
            <div className="flex items-center bg-gray-100 p-1 rounded-none">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-brand-white shadow-sm text-brand-black' : 'text-brand-black/40'}`}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-brand-white shadow-sm text-brand-black' : 'text-brand-black/40'}`}
              >
                <List size={18} />
              </button>
            </div>
            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-brand-black text-brand-white px-6 py-3 hover:bg-brand-black/80 transition-colors">
              <Filter size={14} />
              Filter
            </button>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-8 mb-16 border-b border-brand-black/5 pb-6 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-bold uppercase tracking-widest transition-all relative pb-2 ${
                activeCategory === cat ? 'text-brand-black' : 'text-brand-black/30 hover:text-brand-black'
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeCat"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-black"
                />
              )}
            </button>
          ))}
        </div>

        {/* Grid/List Rendering */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <Loader2 className="w-10 h-10 text-brand-black animate-spin" />
            <p className="text-sm font-medium uppercase tracking-widest text-brand-black/40">Loading Collection...</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onQuickView={(p: Product | null) => setSelectedProduct(p)} 
              />
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col sm:flex-row gap-8 items-center bg-gray-50 p-6 group"
              >
                <div className="w-full sm:w-48 aspect-[3/4] overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-brand-accent font-bold mb-1">{product.category}</p>
                    <h3 className="text-xl font-serif font-bold">{product.name}</h3>
                  </div>
                  <p className="text-sm text-brand-black/60 max-w-xl line-clamp-2">{product.description}</p>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold">${product.isSale ? product.salePrice : product.price}</span>
                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="text-xs font-bold uppercase tracking-widest bg-brand-black text-brand-white px-6 py-3 hover:bg-brand-black/80 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                        console.log(`Wishlist Updated: ${product.name}`);
                      }}
                      className={`p-2 rounded-full transition-colors ${
                        isInWishlist(product.id) ? 'text-brand-black' : 'text-brand-black/20 hover:text-brand-black'
                      }`}
                    >
                      <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-brand-black/40 font-serif italic text-xl">No products found in this category.</p>
          </div>
        )}
      </div>

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
