'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const footerLinks = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Shop', href: '/shop' },
  { name: 'Cart', href: '/cart' },
  { name: 'Terms & Conditions', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy' },
];

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#616161] py-12 px-4 border-t border-gray-800">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          {/* Logo */}
          <Link href="/" className="text-3xl font-cinzel text-white transition-opacity hover:opacity-90">
            <span className="text-[#52dd28ff] font-cinzel">Thulira</span>
          </Link>

          {/* Links Grid */}
          <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-cinzel transition-all duration-300 uppercase tracking-wider ${pathname === link.href
                  ? 'text-white'
                  : 'text-white hover:text-[#52dd28ff]'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white mb-8"></div>

        {/* Copyright Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white text-xs font-medium">
            © {currentYear} <span className="text-white font-mono">Thulira</span> — All Rights Reserved.
          </p>
          <p className="text-white text-[10px] uppercase tracking-[0.2em]">
            Sustainable Living & Eco-Friendly Products | Chennai, India
          </p>
        </div>
      </div>
    </footer>
  );
}