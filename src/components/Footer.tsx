import React from 'react';
import Link from 'next/link';
import { Phone, MapPin, Shield, Truck, Award, Clock } from 'lucide-react';
import { DICTIONARY, Locale } from '@/data/translations';

export default function Footer({ locale }: { locale: Locale }) {
  const t = DICTIONARY[locale];

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      {/* Guarantees Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-2xl bg-stone-800/60 border border-stone-700/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gold-600/20 text-gold-400 rounded-xl">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">
                {locale === 'fr' ? 'Bois Rouge Massif' : 'خشب أحمر طبيعي'}
              </h4>
              <p className="text-xs text-stone-400">
                {locale === 'fr' ? 'Durabilité garantie' : 'صلابة ومتانة لسنوات'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-gold-600/20 text-gold-400 rounded-xl">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">
                {locale === 'fr' ? 'Garantie 2 Ans' : 'ضمان لمدة عامين'}
              </h4>
              <p className="text-xs text-stone-400">
                {locale === 'fr' ? 'Sur structure & vérins' : 'على الهيكل والمضخات'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-gold-600/20 text-gold-400 rounded-xl">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">
                {locale === 'fr' ? 'Livraison 58 Wilayas' : 'توصيل لـ 58 ولاية'}
              </h4>
              <p className="text-xs text-stone-400">
                {locale === 'fr' ? 'Directement chez vous' : 'إلى باب منزلك بأمان'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-gold-600/20 text-gold-400 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">
                {locale === 'fr' ? 'Service Client 6j/7' : 'خدمة الزبائن 6 أيام'}
              </h4>
              <p className="text-xs text-stone-400">
                {locale === 'fr' ? 'Conseils & devis' : 'إجابة فورية واستشارات'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand info */}
        <div>
          <h3 className="text-2xl font-serif font-bold text-white mb-3">
            My Bed <span className="text-xs text-gold-500 font-sans tracking-widest uppercase">M.B</span>
          </h3>
          <p className="text-stone-400 text-sm leading-relaxed mb-4">
            {t.footer_about}
          </p>
          <div className="flex items-center gap-2 text-gold-400 text-sm font-semibold">
            <span>🇩🇿</span>
            <span>{locale === 'fr' ? 'Conçu et fabriqué en Algérie' : 'صُمم وصُنع بفخر في الجزائر'}</span>
          </div>
        </div>

        {/* Categories Quick Links */}
        <div>
          <h4 className="text-white font-semibold text-base mb-4">
            {locale === 'fr' ? 'Navigation' : 'روابط سريعة'}
          </h4>
          <ul className="space-y-2 text-sm text-stone-400">
            <li>
              <Link href={`/${locale}/products?category=beds`} className="hover:text-gold-400 transition-colors">
                {t.nav_beds}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/products?category=mattresses`} className="hover:text-gold-400 transition-colors">
                {t.nav_mattresses}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/products?category=pillows`} className="hover:text-gold-400 transition-colors">
                {t.nav_pillows}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/products?category=protectors`} className="hover:text-gold-400 transition-colors">
                {t.nav_protectors}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/products?category=dressings`} className="hover:text-gold-400 transition-colors">
                {t.nav_furniture}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Showrooms */}
        <div>
          <h4 className="text-white font-semibold text-base mb-4">
            {t.footer_showrooms}
          </h4>
          <div className="space-y-3 text-sm text-stone-400">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <span>{t.footer_address_algiers}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gold-400 shrink-0" />
              <a href="tel:0562619899" className="hover:text-white transition-colors" dir="ltr">
                0562 61 98 99
              </a>
            </div>
            <div className="pt-3">
              <a
                href="https://wa.me/213562619899"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                <span>WhatsApp Direct</span>
                <span dir="ltr">+213 562 61 98 99</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-500">
        <p>{t.footer_rights}</p>
        <div className="flex items-center gap-2">
          <span>Paiement Acompte Edahabia & BaridiMob</span>
          <span>•</span>
          <span>Livraison 58 Wilayas</span>
        </div>
      </div>
    </footer>
  );
}
