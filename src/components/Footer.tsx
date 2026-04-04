import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const footerSections = [
    {
      title: 'SERVICES',
      links: [
        { name: 'Contact Us', href: '#' },
        { name: 'FAQ', href: '#' },
        { name: 'Find a store', href: '#' },
        { name: 'Gifting', href: '#' },
        { name: 'Sur-mesure', href: '#' },
        { name: 'Maintenance and repair', href: '#' },
      ],
    },
    {
      title: 'ORDERS',
      links: [
        { name: 'Payment', href: '#' },
        { name: 'Shipping', href: '#' },
        { name: 'Collect in store', href: '#' },
        { name: 'Track orders', href: '#' },
        { name: 'Returns & exchanges', href: '#' },
      ],
    },
    {
      title: 'ATTIRENESS BUNYAD',
      links: [
        { name: 'Sustainable development', href: '/attireness-bunyad' },
        { name: 'The Bunyad Foundation', href: '/attireness-bunyad' },
        { name: 'Join us', href: '/attireness-bunyad' },
        { name: 'Finance & Governance', href: '/attireness-bunyad' },
        { name: 'Our Maison', href: '/attireness-bunyad' },
      ],
    },
    {
      title: 'LEGAL',
      links: [
        { name: 'Terms and conditions', href: '#' },
        { name: 'Privacy', href: '#' },
        { name: 'Cookies', href: '#' },
        { name: 'Accessibility', href: '#' },
        { name: 'Legal notices', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-brand-white pt-24 pb-12 border-t border-brand-black/5">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-24 mb-24">
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-6">
              <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-brand-black font-medium">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="text-[11px] font-sans uppercase tracking-[0.15em] text-brand-black/50 hover:text-brand-black transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-[11px] font-sans uppercase tracking-[0.15em] text-brand-black/50 hover:text-brand-black transition-colors duration-300"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-12 border-t border-brand-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] font-sans uppercase tracking-[0.2em] text-brand-black/30">
            © ATTIRENESS 2026. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="text-[10px] font-sans uppercase tracking-[0.2em] text-brand-black/30 hover:text-brand-black transition-colors">Instagram</a>
            <a href="#" className="text-[10px] font-sans uppercase tracking-[0.2em] text-brand-black/30 hover:text-brand-black transition-colors">Twitter</a>
            <a href="#" className="text-[10px] font-sans uppercase tracking-[0.2em] text-brand-black/30 hover:text-brand-black transition-colors">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
