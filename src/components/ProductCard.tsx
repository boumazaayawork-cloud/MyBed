'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/data/products';
import { Locale, DICTIONARY } from '@/data/translations';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { getCustomProducts } from '@/lib/store';

interface ProductCardProps {
  product: Product;
  locale: Locale;
}

export default function ProductCard({ product, locale }: ProductCardProps) {
  const t = DICTIONARY[locale];
  const isRtl = locale === 'ar';
  const name = locale === 'fr' ? product.name_fr : product.name_ar;
  const subtitle = locale === 'fr' ? product.subtitle_fr : product.subtitle_ar;
  const badge = locale === 'fr' ? product.badge_fr : product.badge_ar;

  const [currentBasePrice, setCurrentBasePrice] = useState(product.base_price);

  useEffect(() => {
    const checkOverrides = () => {
      const overrides = getCustomProducts();
      if (overrides[product.id]?.base_price) {
        setCurrentBasePrice(overrides[product.id].base_price!);
      }
    };
    checkOverrides();
    window.addEventListener('products_updated', checkOverrides);
    return () => window.removeEventListener('products_updated', checkOverrides);
  }, [product.id]);

  return (
    <div className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Product Image Container */}
      <Link href={`/${locale}/products/${product.slug}`} className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 block">
        <Image
          src={product.image}
          alt={name}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-3 inset-x-3 flex justify-between items-start pointer-events-none">
          {badge ? (
            <span className="px-3 py-1 text-[11px] font-bold tracking-wider uppercase rounded-full bg-navy-900 text-white shadow-md">
              {badge}
            </span>
          ) : <span />}

          {product.old_price && (
            <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-rose-600 text-white shadow-md">
              -{Math.round(((product.old_price - product.base_price) / product.old_price) * 100)}%
            </span>
          )}
        </div>

        {/* Color swatches preview */}
        {product.colors && product.colors.length > 0 && (
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 p-1.5 bg-white/90 backdrop-blur rounded-lg w-fit">
            {product.colors.map((c, i) => (
              <span
                key={i}
                className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-xs"
                style={{ backgroundColor: c.hex }}
                title={locale === 'fr' ? c.name_fr : c.name_ar}
              />
            ))}
          </div>
        )}
      </Link>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-stone-600 font-semibold mb-1 block">
            {product.category === 'beds' && (locale === 'fr' ? 'Lit Coffre' : 'سرير بصندوق')}
            {product.category === 'pillows' && (locale === 'fr' ? 'Oreiller' : 'وسادة')}
            {product.category === 'mattresses' && (locale === 'fr' ? 'Matelas' : 'مرتبة')}
            {product.category === 'protectors' && (locale === 'fr' ? 'Protection' : 'واقي مرتبة')}
            {product.category === 'nightstands' && (locale === 'fr' ? 'Mobilier' : 'طاولة سرير')}
            {product.category === 'dressings' && (locale === 'fr' ? 'Dressing' : 'خزانة ملابس')}
          </span>

          <Link href={`/${locale}/products/${product.slug}`}>
            <h3 className="text-lg font-bold text-navy-900 group-hover:text-gold-600 transition-colors line-clamp-1">
              {name}
            </h3>
          </Link>

          <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-stone-600 uppercase tracking-wider block">
              {t.from_price}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-navy-900">
                {currentBasePrice.toLocaleString()} <span className="text-xs font-normal text-stone-600">{t.currency}</span>
              </span>
              {product.old_price && (
                <span className="text-xs text-stone-500 line-through">
                  {product.old_price.toLocaleString()} {t.currency}
                </span>
              )}
            </div>
          </div>

          <Link
            href={`/${locale}/products/${product.slug}`}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-stone-100 group-hover:bg-navy-900 text-navy-900 group-hover:text-white transition-all shadow-xs"
            aria-label={t.view_details}
          >
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>
      </div>
    </div>
  );
}
