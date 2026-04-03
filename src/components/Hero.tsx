import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-brand-black">
      {/* Full-Bleed Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Fashion Silk" 
          className="w-full h-full object-cover opacity-90"
          referrerPolicy="no-referrer"
        />
        {/* Subtle Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent" />
      </div>

      {/* Content Overlay - Bottom Left with Extreme Padding */}
      <div className="absolute bottom-0 left-0 w-full p-12 md:p-24 lg:p-32 z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <span className="inline-block text-brand-white/70 font-sans tracking-[0.2em] uppercase text-[11px] mb-6">
            Collection 2026
          </span>
          <h1 className="text-7xl md:text-[120px] lg:text-[160px] font-serif font-light text-brand-white leading-[0.85] mb-12 tracking-[-0.02em]">
            Silk on <br />
            <span className="italic">the news</span>
          </h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <a 
              href="#products" 
              className="inline-block text-brand-white font-sans uppercase tracking-[0.2em] text-[12px] border-b border-brand-white pb-2 hover:text-brand-white/70 hover:border-brand-white/70 transition-all duration-300"
            >
              Edit your style
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Vertical Side Label (Magazine Style) */}
      <div className="absolute top-1/2 right-12 -translate-y-1/2 hidden lg:block">
        <p className="text-brand-white/30 font-sans uppercase tracking-[0.5em] text-[10px] rotate-90 origin-right whitespace-nowrap">
          Atelier Moderne — Spring Summer Edition
        </p>
      </div>
    </section>
  );
}
