'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingBag, Phone, Menu, X, ShieldCheck, Sparkles } from 'lucide-react';
import { DICTIONARY, Locale } from '@/data/translations';
import { getStoredCart } from '@/lib/store';

export default function Header({ locale }: { locale: Locale }) {
  const t = DICTIONARY[locale];
  const isRtl = locale === 'ar';
  const pathname = usePathname();
  const router = useRouter();

  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateCount = () => {
      const items = getStoredCart();
      const totalQty = items.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(totalQty);
    };
    updateCount();
    window.addEventListener('cart_updated', updateCount);
    return () => window.removeEventListener('cart_updated', updateCount);
  }, []);

  const switchLanguage = (newLocale: Locale) => {
    if (newLocale === locale) return;
    // Replace the current locale in path
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/') || `/${newLocale}`;
    router.push(newPath);
  };

  const navLinks = [
    { href: `/${locale}`, label: t.nav_home },
    { href: `/${locale}/products?category=beds`, label: t.nav_beds },
    { href: `/${locale}/products?category=mattresses`, label: t.nav_mattresses },
    { href: `/${locale}/products?category=pillows`, label: t.nav_pillows },
    { href: `/${locale}/products?category=protectors`, label: t.nav_protectors },
    { href: `/${locale}/products?category=dressings`, label: t.nav_furniture },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-stone-200 shadow-sm transition-colors">
      {/* Top Reassurance Bar */}
      <div className="bg-navy-900 text-stone-200 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span className="font-medium tracking-wide">
              {locale === 'fr' 
                ? 'Livraison & Montage soigné dans les 58 wilayas d\'Algérie' 
                : 'توصيل وتركيب احترافي متوفر في 58 ولاية عبر الوطن'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="tel:0562619899" 
              className="flex items-center gap-1.5 hover:text-gold-400 transition-colors font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span dir="ltr">0562 61 98 99</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href={`/${locale}`} className="flex flex-col group">
            <span className="text-2xl sm:text-3xl font-serif font-extrabold tracking-tight text-navy-900 group-hover:text-gold-600 transition-colors">
              My Bed <span className="text-xs text-gold-600 font-sans tracking-widest uppercase">M.B</span>
            </span>
            <span className="text-[10px] text-stone-500 tracking-wider font-medium">
              {t.brand_tagline}
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-stone-700 hover:text-gold-600 text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons: Language Switcher + Cart */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Language Switcher Pill */}
            <div className="flex items-center border border-stone-300 rounded-full p-0.5 bg-stone-50 text-xs font-semibold">
              <button
                onClick={() => switchLanguage('fr')}
                className={`px-3 py-1 rounded-full transition-all ${
                  locale === 'fr'
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'text-stone-600 hover:text-navy-900'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => switchLanguage('ar')}
                className={`px-3 py-1 rounded-full transition-all ${
                  locale === 'ar'
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'text-stone-600 hover:text-navy-900'
                }`}
              >
                العربية
              </button>
            </div>

            {/* Cart Icon */}
            <Link
              href={`/${locale}/cart`}
              className="relative p-2.5 rounded-full hover:bg-stone-100 text-navy-900 transition-colors"
              aria-label={t.nav_cart}
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 text-[11px] font-bold text-white bg-gold-600 rounded-full shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-stone-800 hover:bg-stone-100"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-sm">
            <span className="text-stone-600">{locale === 'fr' ? 'Showroom Alger' : 'معرض الجزائر'}</span>
            <a href="tel:0562619899" className="font-bold text-navy-900" dir="ltr">0562 61 98 99</a>
          </div>
        </div>
      )}
    </header>
  );
}
