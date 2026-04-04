import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { convertPrice, formatPrice } from "../lib/currency";
import { Loader2, ArrowLeft, CheckCircle2, Plus, Minus, Trash2, ChevronDown, Search } from "lucide-react";
import { Link } from "react-router-dom";

interface Country {
  name: string;
  code: string;
  prefix: string;
  flag: string;
  length: number;
}

const countries: Country[] = [
  { name: "Pakistan", code: "PK", prefix: "+92", flag: "🇵🇰", length: 10 },
  { name: "Saudi Arabia", code: "SA", prefix: "+966", flag: "🇸🇦", length: 9 },
  { name: "Qatar", code: "QA", prefix: "+974", flag: "🇶🇦", length: 8 },
  { name: "United Arab Emirates", code: "AE", prefix: "+971", flag: "🇦🇪", length: 9 },
  { name: "United States", code: "US", prefix: "+1", flag: "🇺🇸", length: 10 },
  { name: "United Kingdom", code: "GB", prefix: "+44", flag: "🇬🇧", length: 10 },
  { name: "Canada", code: "CA", prefix: "+1", flag: "🇨🇦", length: 10 },
  { name: "Australia", code: "AU", prefix: "+61", flag: "🇦🇺", length: 9 },
  { name: "Germany", code: "DE", prefix: "+49", flag: "🇩🇪", length: 11 },
  { name: "France", code: "FR", prefix: "+33", flag: "🇫🇷", length: 9 },
  { name: "India", code: "IN", prefix: "+91", flag: "🇮🇳", length: 10 },
  { name: "China", code: "CN", prefix: "+86", flag: "🇨🇳", length: 11 },
  { name: "Japan", code: "JP", prefix: "+81", flag: "🇯🇵", length: 10 },
  { name: "Turkey", code: "TR", prefix: "+90", flag: "🇹🇷", length: 10 },
  { name: "Oman", code: "OM", prefix: "+968", flag: "🇴🇲", length: 8 },
  { name: "Kuwait", code: "KW", prefix: "+965", flag: "🇰🇼", length: 8 },
  { name: "Bahrain", code: "BH", prefix: "+973", flag: "🇧🇭", length: 8 },
];

export default function Checkout() {
  const { cart, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const { displayCurrency } = useCurrency();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
  });
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [isCountrySelectorOpen, setIsCountrySelectorOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const countrySelectorRef = useRef<HTMLDivElement>(null);

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countrySelectorRef.current && !countrySelectorRef.current.contains(event.target as Node)) {
        setIsCountrySelectorOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sortedCountries = useMemo(() => {
    const priority = ["Pakistan", "Saudi Arabia", "Qatar", "United Arab Emirates"];
    const priorityList = countries.filter(c => priority.includes(c.name))
      .sort((a, b) => priority.indexOf(a.name) - priority.indexOf(b.name));
    const otherList = countries.filter(c => !priority.includes(c.name))
      .sort((a, b) => a.name.localeCompare(b.name));
    return [...priorityList, ...otherList];
  }, []);

  const filteredCountries = useMemo(() => {
    return sortedCountries.filter(c => 
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) || 
      c.prefix.includes(countrySearch)
    );
  }, [sortedCountries, countrySearch]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string, length: number) => {
    const re = /^\d+$/;
    return re.test(phone) && phone.length === length;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let hasErrors = false;
    const newErrors = { email: "", phone: "" };

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      hasErrors = true;
    }

    if (!validatePhone(formData.phone, selectedCountry.length)) {
      newErrors.phone = `Phone number must be exactly ${selectedCountry.length} digits for ${selectedCountry.name}`;
      hasErrors = true;
    }

    setErrors(newErrors);

    if (hasErrors) return;

    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart(); // Clear cart after success
    }, 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-6"
        >
          <div className="flex justify-center">
            <CheckCircle2 size={64} className="text-brand-black" strokeWidth={1} />
          </div>
          <h2 className="text-4xl font-serif font-light tracking-tight">Thank you for your order.</h2>
          <p className="text-brand-black/60 font-sans text-sm tracking-wide max-w-md mx-auto">
            Your request is being processed. We will contact you shortly with shipping details.
          </p>
          <Link 
            to="/" 
            className="inline-block text-[11px] font-sans uppercase tracking-[0.2em] border-b border-brand-black pb-1 hover:text-brand-black/60 hover:border-brand-black/60 transition-colors pt-4"
          >
            Return to Collection
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-brand-white min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Shipping Form */}
          <div className="flex-1 space-y-12">
            <div className="space-y-2">
              <Link to="/" className="flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.2em] text-brand-black/40 hover:text-brand-black transition-colors mb-8">
                <ArrowLeft size={12} />
                Back to Shopping
              </Link>
              <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight">Checkout</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-[11px] font-sans uppercase tracking-[0.2em] text-brand-black/40">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-brand-black/10 py-3 focus:border-brand-black outline-none transition-colors font-sans text-sm"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-[11px] font-sans uppercase tracking-[0.2em] text-brand-black/40">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-b py-3 focus:border-brand-black outline-none transition-colors font-sans text-sm ${errors.email ? 'border-red-500' : 'border-brand-black/10'}`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-[11px] font-sans uppercase tracking-[0.1em] text-red-500 pt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="address" className="block text-[11px] font-sans uppercase tracking-[0.2em] text-brand-black/40">
                    Shipping Address
                  </label>
                  <textarea
                    required
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-transparent border-b border-brand-black/10 py-3 focus:border-brand-black outline-none transition-colors font-sans text-sm resize-none"
                    placeholder="Enter your full shipping address"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-[11px] font-sans uppercase tracking-[0.2em] text-brand-black/40">
                    Phone Number
                  </label>
                  <div className="relative flex items-end gap-4 border-b border-brand-black/10 focus-within:border-brand-black transition-colors">
                    {/* Country Selector */}
                    <div className="relative" ref={countrySelectorRef}>
                      <button
                        type="button"
                        onClick={() => setIsCountrySelectorOpen(!isCountrySelectorOpen)}
                        className="flex items-center gap-2 py-3 text-sm font-sans whitespace-nowrap"
                      >
                        <span className="text-lg">{selectedCountry.flag}</span>
                        <span className="text-brand-black/60">{selectedCountry.prefix}</span>
                        <ChevronDown size={14} className={`transition-transform duration-300 ${isCountrySelectorOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isCountrySelectorOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-full left-0 mb-2 w-72 bg-brand-white border border-brand-black/10 shadow-2xl z-50 overflow-hidden"
                          >
                            <div className="p-3 border-b border-brand-black/5 flex items-center gap-2">
                              <Search size={14} className="text-brand-black/40" />
                              <input
                                type="text"
                                value={countrySearch}
                                onChange={(e) => setCountrySearch(e.target.value)}
                                placeholder="SEARCH COUNTRY..."
                                className="w-full bg-transparent outline-none text-[10px] font-sans uppercase tracking-widest"
                                autoFocus
                              />
                            </div>
                            <div className="max-h-64 overflow-y-auto no-scrollbar">
                              {filteredCountries.map((country) => (
                                <button
                                  key={country.code}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCountry(country);
                                    setIsCountrySelectorOpen(false);
                                    setCountrySearch("");
                                  }}
                                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-brand-black/5 transition-colors text-left"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-lg">{country.flag}</span>
                                    <span className="text-[11px] font-sans uppercase tracking-widest">{country.name}</span>
                                  </div>
                                  <span className="text-[10px] font-sans text-brand-black/40">{country.prefix}</span>
                                </button>
                              ))}
                              {filteredCountries.length === 0 && (
                                <div className="p-4 text-[10px] font-sans uppercase tracking-widest text-brand-black/40 text-center">
                                  No results found
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <input
                      required
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="flex-1 bg-transparent py-3 outline-none font-sans text-sm"
                      placeholder={`Enter ${selectedCountry.length} digits`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[11px] font-sans uppercase tracking-[0.1em] text-red-500 pt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <button
                disabled={isProcessing || cart.length === 0}
                type="submit"
                className="w-full bg-brand-black text-brand-white py-6 px-8 uppercase tracking-[0.2em] text-[11px] font-sans hover:bg-brand-black/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Processing Order...
                  </>
                ) : (
                  "Complete Order"
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[400px] space-y-10">
            <div className="bg-brand-black/[0.02] p-8 md:p-10 border border-brand-black/5">
              <h2 className="text-2xl font-serif font-light tracking-tight mb-8" style={{ fontWeight: 300 }}>
                Order Summary
              </h2>
              
              <div className="space-y-8 max-h-[500px] overflow-y-auto no-scrollbar pr-2">
                {cart.length === 0 ? (
                  <p className="text-brand-black/40 font-serif italic text-sm">Your bag is empty.</p>
                ) : (
                  cart.map((item) => {
                    const itemPrice = convertPrice(item.basePrice, item.baseCurrency, displayCurrency);
                    return (
                      <div key={item.id} className="flex gap-4 group">
                        <div className="w-20 h-24 bg-white border border-brand-black/5 overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xs font-serif font-light tracking-wide">{item.name}</h3>
                              <p className="text-xs font-sans tracking-wide mt-1">
                                {formatPrice(itemPrice, displayCurrency)}
                              </p>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-brand-black/20 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={14} strokeWidth={1.5} />
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border border-brand-black/10">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1.5 hover:bg-brand-black/5 transition-colors"
                              >
                                <Minus size={10} />
                              </button>
                              <span className="text-[10px] font-sans w-6 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1.5 hover:bg-brand-black/5 transition-colors"
                              >
                                <Plus size={10} />
                              </button>
                            </div>
                            <p className="text-xs font-sans font-medium tracking-wide">
                              {formatPrice(itemPrice * item.quantity, displayCurrency)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="mt-10 pt-8 border-t border-brand-black/10 space-y-4">
                <div className="flex justify-between text-[11px] font-sans uppercase tracking-[0.1em] text-brand-black/40">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice, displayCurrency)}</span>
                </div>
                <div className="flex justify-between text-[11px] font-sans uppercase tracking-[0.1em] text-brand-black/40">
                  <span>Shipping</span>
                  <span>Complimentary</span>
                </div>
                <div className="flex justify-between text-lg font-sans tracking-wide pt-4 border-t border-brand-black/5">
                  <span className="font-light">Total</span>
                  <span className="font-medium">{formatPrice(totalPrice, displayCurrency)}</span>
                </div>
              </div>
            </div>

            <div className="p-6 border border-brand-black/5 space-y-4">
              <h4 className="text-[10px] font-sans uppercase tracking-[0.2em] text-brand-black/40">Secure Payment</h4>
              <p className="text-[10px] text-brand-black/60 font-sans leading-relaxed">
                Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
