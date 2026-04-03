import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#f3f3f3] -z-10 hidden lg:block" />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-brand-black rounded-full blur-[120px] -z-10"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block text-brand-black/40 font-semibold tracking-[0.3em] uppercase text-xs mb-4">
                New Collection 2026
              </span>
              <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[0.9] mb-8 tracking-tighter">
                Elevate Your <br />
                <span className="italic text-brand-black">Everyday</span> Style
              </h1>
              <p className="text-lg text-brand-black/60 max-w-md mb-10 leading-relaxed">
                Discover our curated selection of premium essentials designed for the modern individual. Quality craftsmanship meets timeless design.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-brand-black text-brand-white px-10 py-5 rounded-none font-medium uppercase tracking-widest text-sm flex items-center justify-center group"
                >
                  Shop Now
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="border border-brand-black text-brand-black px-10 py-5 rounded-none font-medium uppercase tracking-widest text-sm hover:bg-brand-black hover:text-brand-white transition-colors"
                >
                  View Lookbook
                </motion.button>
              </div>
            </motion.div>

            {/* Stats/Trust Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-16 flex items-center space-x-12 border-t border-brand-black/5 pt-8"
            >
              <div>
                <p className="text-2xl font-serif font-bold">15k+</p>
                <p className="text-[10px] uppercase tracking-widest text-brand-black/40 font-semibold">Happy Clients</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold">200+</p>
                <p className="text-[10px] uppercase tracking-widest text-brand-black/40 font-semibold">Premium Brands</p>
              </div>
            </motion.div>
          </div>

          {/* Hero Image Section */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-[4/5] w-full max-w-md mx-auto lg:ml-auto"
            >
              {/* Main Image */}
              <div className="absolute inset-0 border-[12px] border-brand-white shadow-2xl z-20 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800" 
                  alt="Modern Fashion" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Floating Element 1 */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 bg-brand-white p-6 shadow-xl z-30 hidden sm:block border border-brand-black/5"
              >
                <p className="text-xs font-bold uppercase tracking-widest mb-1">Exclusive</p>
                <p className="text-xl font-serif italic">Summer Drop</p>
              </motion.div>

              {/* Floating Element 2 (Accent Box) */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-black/5 -z-10" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
