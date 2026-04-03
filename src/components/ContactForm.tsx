import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Mail, User, MessageSquare } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Contact Form Submitted:', formData);
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-24 bg-brand-white border-t border-brand-black/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Info Side */}
          <div className="space-y-8">
            <div>
              <span className="text-brand-black/40 font-semibold tracking-[0.3em] uppercase text-[10px] mb-2 block">
                Get in Touch
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-6">
                Help & Support
              </h2>
              <p className="text-brand-black/60 leading-relaxed max-w-md">
                Our dedicated support team is here to assist you with any inquiries regarding our collections, orders, or styling advice.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-brand-black">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest mb-1">Email Us</h4>
                  <p className="text-sm text-brand-black/60">support@ateliermoderne.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-brand-black">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest mb-1">Live Chat</h4>
                  <p className="text-sm text-brand-black/60">Available Mon-Fri, 9am - 6pm EST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-gray-50 p-12 flex flex-col items-center text-center justify-center min-h-[400px]"
                >
                  <div className="w-16 h-16 bg-brand-black/5 text-brand-black rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-4">Message Received</h3>
                  <p className="text-brand-black/60 text-sm max-w-xs mx-auto">
                    Thank you, we've received your message. Our team will get back to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 text-[10px] font-bold uppercase tracking-widest border-b border-brand-black pb-1 hover:text-brand-black/60 hover:border-brand-black/60 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-brand-black/40 flex items-center gap-2">
                      <User size={12} />
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full bg-gray-50 border-none p-4 text-sm focus:ring-1 focus:ring-brand-black outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-brand-black/40 flex items-center gap-2">
                      <Mail size={12} />
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full bg-gray-50 border-none p-4 text-sm focus:ring-1 focus:ring-brand-black outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-brand-black/40 flex items-center gap-2">
                      <MessageSquare size={12} />
                      Your Message
                    </label>
                    <textarea
                      required
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      className="w-full bg-gray-50 border-none p-4 text-sm focus:ring-1 focus:ring-brand-black outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-brand-black text-brand-white py-5 px-8 uppercase tracking-widest text-[10px] font-bold flex items-center justify-center gap-3 hover:bg-brand-black/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      >
                        <Send size={14} />
                      </motion.div>
                    ) : (
                      <>
                        <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        Send Message
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
