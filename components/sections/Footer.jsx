'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const footerLinks = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Shop', href: '/shop' },
  { name: 'Cart', href: '/cart' },
];

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted-foreground py-8 sm:py-6 px-4">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4">
          {/* Logo */}
          <Link href="/" className="text-2xl sm:text-xl font-bold text-white">
            <span className="text-[#52dd28ff]">MAnn</span>
          </Link>

        </div>

        {/* Copyright Section */}
        <p className="text-center text-white/60 text-xs sm:text-xs mt-6 sm:mt-4">
          © {currentYear} <span className="text-[#52dd28ff]">MAnn</span> — Sustainable Living
        </p>
      </div>
    </footer>
  );
}