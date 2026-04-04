import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const footerSections = [
    {
      title: 'SERVICES',
      links: [
        { name: 'Contact Us', href: '#' },
        { name: 'FAQ', href: '#' },
        { name: 'Find a Store', href: '#' },
        { name: 'Gifting', href: '#' },
        { name: 'Sur-mesure', href: '#' },
        { name: 'Maintenance and Repair', href: '#' },
      ],
    },
    {
      title: 'ORDERS',
      links: [
        { name: 'Payment', href: '#' },
        { name: 'Shipping', href: '#' },
        { name: 'Collect in Store', href: '#' },
        { name: 'Track Orders', href: '#' },
        { name: 'Returns & Exchanges', href: '#' },
      ],
    },
    {
      title: 'ATTIRENESS BUNYAD',
      links: [
        { name: 'The Maison', href: '/attireness-bunyad' },
        { name: 'Sustainable Development', href: '#' },
        { name: 'The Bunyad Foundation', href: '#' },
        { name: 'Join Us', href: '#' },
        { name: 'Finance & Governance', href: '#' },
      ],
    },
    {
      title: 'LEGAL',
      links: [
        { name: 'Terms and Conditions', href: '#' },
        { name: 'Privacy', href: '#' },
        { name: 'Cookies', href: '#' },
        { name: 'Accessibility', href: '#' },
        { name: 'Legal Notices', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-brand-white pt-24 pb-12 border-t border-brand-black/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
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
