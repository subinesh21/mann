'use client';

import { usePathname } from 'next/navigation';

const footerLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/products/allproducts' },
  { name: 'Product', href: '/products/1' },
  { name: 'Cart', href: '/cart' },
  { name: 'Checkout', href: '/checkout' },
];

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer_area clearfix">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 py-16">
          {/* Logo & Copyright */}
          <div className="lg:w-1/3 text-center lg:text-left">
            <div className="footer-logo mb-6">
              <a href="/" className="text-3xl font-bold text-white">
                <span className="text-[#52dd28ff]">MAnn</span>
              </a>
            </div>
            <p className="copywrite">
              Copyright &copy;{currentYear} All rights reserved | Made with <i className="fa fa-heart-o text-[#fbb710]"></i> by CGG Team
            </p>
          </div>

          {/* Footer Menu */}
          <div className="lg:w-2/3">
            <nav className="footer_menu">
              <ul className="flex flex-wrap justify-center lg:justify-end gap-6 lg:gap-10">
                {footerLinks.map((link) => (
                  <li key={link.name} className={pathname === link.href ? 'active' : ''}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
