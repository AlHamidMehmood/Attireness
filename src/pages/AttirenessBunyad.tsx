import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Globe, Star, History } from "lucide-react";
import { Link } from "react-router-dom";

const timelineEvents = [
  { year: "2011", title: "The Inception", description: "Attireness was born from a vision to bridge the gap between traditional craftsmanship and modern luxury demands." },
  { year: "2015", title: "The Silk Road", description: "Expansion into premium silk and hand-woven textiles, establishing our signature minimalist aesthetic." },
  { year: "2018", title: "Global Curation", description: "First international collection launched, catering to aesthetic demands across the Middle East and Europe." },
  { year: "2022", title: "Digital Maison", description: "Redefining the luxury e-commerce experience with a focus on storytelling and personalized curation." },
  { year: "2024", title: "The Bunyad Initiative", description: "Launching our foundation for sustainable luxury and artisanal empowerment." },
  { year: "FUTURE", title: "Beyond Horizons", description: "Continuing to entertain the world's most sophisticated aesthetic and luxury demands." },
];

const specialProducts = [
  {
    name: "Heritage Silk Scarf",
    description: "Hand-printed silk from the heart of the valley.",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Desert Rose Fragrance",
    description: "A scent curated for the international wanderer.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Nomad Leather Tote",
    description: "Crafted for global journeys and timeless style.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
  }
];

export default function AttirenessBunyad() {
  return (
    <div className="bg-brand-white min-h-screen pt-20">
      {/* Hero / Philosophy Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl text-center space-y-12"
        >
          <span className="text-[11px] font-sans uppercase tracking-[0.3em] text-brand-black/40">
            The Maison Philosophy
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-[1.1] tracking-tight text-brand-black" style={{ fontWeight: 300 }}>
            Entertaining Aesthetic and Luxury Demands.
          </h1>
          <p className="text-lg md:text-xl font-serif italic text-brand-black/60 max-w-2xl mx-auto leading-relaxed">
            "Attireness is not merely a brand; it is a daily ritual of storytelling, where every thread tells a tale of heritage, and every silhouette demands excellence."
          </p>
          <div className="pt-8">
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-px h-24 bg-brand-black/20 mx-auto"
            />
          </div>
        </motion.div>
      </section>

      {/* The Timeline Section */}
      <section className="py-32 px-6 lg:px-12 bg-brand-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <div className="sticky top-32 space-y-6">
              <span className="text-[11px] font-sans uppercase tracking-[0.3em] text-brand-black/40 flex items-center gap-2">
                <History size={14} />
                Our Journey
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight">
                A Decade of <br />Refinement.
              </h2>
              <p className="text-brand-black/60 font-sans text-sm leading-relaxed max-w-md">
                Tracing the evolution of Attireness from a local vision to an international beacon of minimalist luxury.
              </p>
            </div>

            <div className="space-y-24 relative">
              {/* Vertical Line */}
              <div className="absolute left-0 lg:left-[-48px] top-0 w-px h-full bg-brand-black/5" />
              
              {timelineEvents.map((event, index) => (
                <motion.div 
                  key={event.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8 lg:pl-0"
                >
                  {/* Dot */}
                  <div className="absolute left-[-4px] lg:left-[-52px] top-2 w-2 h-2 bg-brand-black rounded-full" />
                  
                  <div className="space-y-4">
                    <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-brand-black">
                      {event.year}
                    </span>
                    <h3 className="text-2xl font-serif font-light tracking-tight">
                      {event.title}
                    </h3>
                    <p className="text-brand-black/60 font-sans text-sm leading-relaxed max-w-lg">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* International Curation Section */}
      <section className="py-32 bg-brand-black text-brand-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="space-y-6">
              <span className="text-[11px] font-sans uppercase tracking-[0.3em] text-brand-white/40 flex items-center gap-2">
                <Globe size={14} />
                Global Curation
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight">
                Beyond Borders.
              </h2>
            </div>
            <p className="text-brand-white/60 font-sans text-sm max-w-sm leading-relaxed">
              Exclusively curated selections for our international clientele, highlighting the finest artisanal crafts for the global stage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {specialProducts.map((product, index) => (
              <motion.div 
                key={product.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="group space-y-6"
              >
                <div className="aspect-[3/4] overflow-hidden bg-brand-white/5">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-[11px] font-sans uppercase tracking-[0.2em]">
                    {product.name}
                  </h3>
                  <p className="text-[10px] font-sans text-brand-white/40 uppercase tracking-widest">
                    {product.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <Link 
              to="/" 
              className="inline-flex items-center gap-4 text-[11px] font-sans uppercase tracking-[0.3em] border border-brand-white/20 px-12 py-6 hover:bg-brand-white hover:text-brand-black transition-all duration-500"
            >
              Explore Full Collection
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Quote */}
      <section className="py-48 px-6 text-center bg-brand-white">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <Star size={24} className="mx-auto text-brand-black/20" />
          <h2 className="text-3xl md:text-4xl font-serif font-light italic tracking-tight text-brand-black/80">
            "Luxury is the silence that follows the storm of creation."
          </h2>
          <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-brand-black/40">
            — The Maison
          </span>
        </motion.div>
      </section>
    </div>
  );
}
