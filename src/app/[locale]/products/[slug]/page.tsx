'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCTS, ProductVariant, ProductColor } from '@/data/products';
import { DICTIONARY, Locale } from '@/data/translations';
import { addToCart, getCustomProducts } from '@/lib/store';
import { 
  ShieldCheck, 
  Truck, 
  Check, 
  ShoppingBag, 
  MessageCircle, 
  Phone, 
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ArrowRight
} from 'lucide-react';

interface ProductDetailPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const locale = (params.locale === 'ar' ? 'ar' : 'fr') as Locale;
  const t = DICTIONARY[locale];
  const isRtl = locale === 'ar';

  const product = PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  // Check if store owner set custom prices in /admin
  const [variants, setVariants] = useState<ProductVariant[]>(() => {
    const overrides = getCustomProducts();
    const custom = overrides[product.id];
    if (custom?.variantPrices) {
      return product.variants.map((v) => ({
        ...v,
        price: custom.variantPrices![v.id] ?? v.price
      }));
    }
    return product.variants;
  });

  // Selected variant & color
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(variants[0]);
  const [selectedColor, setSelectedColor] = useState<ProductColor | undefined>(
    product.colors && product.colors.length > 0 ? product.colors[0] : undefined
  );
  const [addedToast, setAddedToast] = useState(false);

  const name = locale === 'fr' ? product.name_fr : product.name_ar;
  const subtitle = locale === 'fr' ? product.subtitle_fr : product.subtitle_ar;
  const description = locale === 'fr' ? product.description_fr : product.description_ar;
  const features = locale === 'fr' ? product.features_fr : product.features_ar;
  const badge = locale === 'fr' ? product.badge_fr : product.badge_ar;

  const currentPrice = selectedVariant.price;
  const depositAmount = currentPrice >= 30000 ? 5000 : 2000;
  const balanceDue = currentPrice - depositAmount;

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedVariant.id}-${selectedColor ? selectedColor.name_fr : 'default'}`,
      productId: product.id,
      name_fr: product.name_fr,
      name_ar: product.name_ar,
      image: product.image,
      dimension: selectedVariant.dimension,
      color: selectedColor ? (locale === 'fr' ? selectedColor.name_fr : selectedColor.name_ar) : undefined,
      price: currentPrice,
    }, 1);

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3500);
  };

  const buildWhatsAppMessage = () => {
    const dimensionText = selectedVariant.dimension;
    const colorText = selectedColor ? (locale === 'fr' ? selectedColor.name_fr : selectedColor.name_ar) : '';
    
    const msg = locale === 'fr'
      ? `Bonjour My Bed, je souhaite commander :\n- Produit : ${product.name_fr}\n- Dimension : ${dimensionText}\n- Couleur : ${colorText}\n- Prix : ${currentPrice.toLocaleString()} DA\nMerci de me confirmer la disponibilité et le délai de livraison.`
      : `السلام عليكم ماي بيد، أود طلب هذا الموديل :\n- الموديل : ${product.name_ar}\n- المقاس : ${dimensionText}\n- اللون : ${colorText}\n- السعر : ${currentPrice.toLocaleString()} دج\nيرجى تأكيد التوفر وموعد التوصيل.`;

    return `https://wa.me/213562619899?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 font-medium">
        <Link href={`/${locale}`} className="hover:text-navy-900 transition-colors">
          {t.nav_home}
        </Link>
        {isRtl ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        <Link href={`/${locale}/products`} className="hover:text-navy-900 transition-colors">
          {locale === 'fr' ? 'Produits' : 'المنتجات'}
        </Link>
        {isRtl ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        <span className="text-navy-900 font-bold truncate">{name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left: Studio Image Showcase */}
        <div className="space-y-4 sticky top-28">
          <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 shadow-xl">
            <Image
              src={product.image}
              alt={name}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {badge && (
              <span className="absolute top-4 left-4 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full bg-navy-900 text-white shadow-lg">
                {badge}
              </span>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-600 shrink-0" />
              <span>{locale === 'fr' ? 'Photo studio originale My Bed' : 'صورة حقيقية من استوديو تصوير ماي بيد'}</span>
            </div>
            <span className="font-bold text-navy-900">100% Conforme</span>
          </div>
        </div>

        {/* Right: Product Details & Configurator */}
        <div className="space-y-8">
          
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-1 block">
              {product.category === 'beds' && (locale === 'fr' ? 'Lit Coffre Premium' : 'سرير بصندوق هيدروليكي')}
              {product.category === 'pillows' && (locale === 'fr' ? 'Oreiller Ergonomique' : 'وسادة طبية')}
              {product.category === 'mattresses' && (locale === 'fr' ? 'Matelas de Luxe' : 'مرتبة طبية')}
              {product.category === 'protectors' && (locale === 'fr' ? 'Protection Literie' : 'واقي مراتب')}
            </span>

            <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-navy-900 leading-tight">
              {name}
            </h1>

            <p className="text-sm sm:text-base text-stone-600 mt-2 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-navy-900">
                {currentPrice.toLocaleString()} <span className="text-lg font-semibold text-stone-600">{t.currency}</span>
              </span>
              {product.old_price && (
                <span className="text-base text-stone-500 line-through">
                  {product.old_price.toLocaleString()} {t.currency}
                </span>
              )}
            </div>

            {/* Payment Formula Badge */}
            <div className="pt-3 border-t border-stone-200 grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-gold-50 border border-gold-200 text-gold-900">
                <span className="text-[10px] uppercase font-bold text-gold-700 block">
                  {locale === 'fr' ? 'Acompte (Edahabia/BaridiMob)' : 'العربون (ذهبية / بريدي موب)'}
                </span>
                <span className="font-extrabold text-sm">{depositAmount.toLocaleString()} {t.currency}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                <span className="text-[10px] uppercase font-bold text-emerald-700 block">
                  {locale === 'fr' ? 'Solde à la livraison' : 'الباقي عند استلام السرير'}
                </span>
                <span className="font-extrabold text-sm">{balanceDue.toLocaleString()} {t.currency}</span>
              </div>
            </div>
          </div>

          {/* 1. Dimension Selector */}
          {product.variants.length > 1 && (
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                {t.pdp_choose_size}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {variants.map((v) => {
                  const isSelected = selectedVariant.id === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 rounded-xl text-left border text-xs font-semibold transition-all ${
                        isSelected
                          ? 'border-navy-900 bg-navy-900 text-white shadow-md'
                          : 'border-stone-200 bg-white text-stone-800 hover:border-stone-400'
                      }`}
                    >
                      <span className="block font-bold">{v.dimension}</span>
                      <span className={`block text-[11px] mt-0.5 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                        {v.price.toLocaleString()} {t.currency}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold uppercase tracking-wider text-stone-700">
                  {t.pdp_choose_color}
                </label>
                <span className="font-semibold text-gold-700">
                  {selectedColor ? (locale === 'fr' ? selectedColor.name_fr : selectedColor.name_ar) : ''}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {product.colors.map((color, idx) => {
                  const isSelected = selectedColor?.name_fr === color.name_fr;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                        isSelected ? 'border-navy-900 scale-110 shadow-md ring-2 ring-gold-400' : 'border-stone-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={locale === 'fr' ? color.name_fr : color.name_ar}
                    >
                      {isSelected && (
                        <Check className={`w-4 h-4 ${color.hex === '#ede8df' || color.hex === '#eee7db' ? 'text-stone-900' : 'text-white'}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action CTAs: Add to Cart + WhatsApp */}
          <div className="space-y-3 pt-4">
            <button
              onClick={handleAddToCart}
              className="w-full py-4 px-6 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm flex items-center justify-center gap-3 shadow-xl transition-all hover:scale-[1.01]"
            >
              <ShoppingBag className="w-5 h-5 text-gold-400" />
              <span>{t.pdp_add_to_cart}</span>
            </button>

            <a
              href={buildWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-3 shadow-md transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>{t.pdp_buy_whatsapp}</span>
            </a>

            {/* Added to Cart Feedback Toast */}
            {addedToast && (
              <div className="p-4 rounded-xl bg-navy-900 text-white text-xs flex items-center justify-between shadow-2xl animate-fade-in">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>{locale === 'fr' ? 'Article ajouté au panier avec succès !' : 'تمت إضافة المنتج إلى سلة المشتريات بنجاح !'}</span>
                </div>
                <Link
                  href={`/${locale}/cart`}
                  className="px-3 py-1 bg-gold-500 text-stone-950 font-bold rounded-lg hover:bg-gold-400 transition-colors"
                >
                  {locale === 'fr' ? 'Voir le Panier' : 'معاينة السلة'}
                </Link>
              </div>
            )}
          </div>

          {/* Product Description */}
          <div className="pt-6 border-t border-stone-200 space-y-3">
            <h3 className="font-serif font-bold text-lg text-navy-900">
              {locale === 'fr' ? 'Description détaillée' : 'تفاصيل المنتج'}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Features Bullets */}
          <div className="pt-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              {t.pdp_features_heading}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
              {features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Warranty Box */}
          <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 text-xs text-stone-600 space-y-1">
            <div className="font-bold text-navy-900">{t.pdp_warranty}</div>
            <p>{t.pdp_warranty_desc}</p>
          </div>

        </div>
      </div>
    </div>
  );
}
