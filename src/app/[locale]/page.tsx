import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { DICTIONARY, Locale } from '@/data/translations';
import ProductCard from '@/components/ProductCard';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  Layers, 
  Phone, 
  Award,
  CheckCircle2
} from 'lucide-react';

export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = (params.locale === 'ar' ? 'ar' : 'fr') as Locale;
  const t = DICTIONARY[locale];
  const isRtl = locale === 'ar';

  const bestSellers = PRODUCTS.filter((p) => p.is_featured || p.is_best_seller).slice(0, 6);
  const bedModels = PRODUCTS.filter((p) => p.category === 'beds');

  const categories = [
    {
      id: 'beds',
      name_fr: 'Lits Coffre',
      name_ar: 'أسرّة بصندوق تخزين',
      count: '9 modèles',
      image: '/images/products/sultan.jpg',
      desc_fr: 'Structure bois rouge massif & coffre métallique',
      desc_ar: 'خشب أحمر صلب وصندوق هيدروليكي مقوى'
    },
    {
      id: 'pillows',
      name_fr: 'Oreillers de Luxe',
      name_ar: 'الوسائد الطبية الفاخرة',
      count: '4 types',
      image: '/images/products/oreiller-visco-gel.jpg',
      desc_fr: 'Technologie Visco Gel, Plumes & Mémoire de forme',
      desc_ar: 'جل تبريد، ريش طبيعي وميموري فوم'
    },
    {
      id: 'mattresses',
      name_fr: 'Matelas Orthopédiques',
      name_ar: 'المراتب الطبية',
      count: 'Haute densité',
      image: '/images/products/vienna.jpg',
      desc_fr: 'Ressorts ensachés 7 zones et mousse ferme',
      desc_ar: 'نوابض منفصلة ودعم كامل للعمود الفقري'
    },
    {
      id: 'protectors',
      name_fr: 'Protège Matelas',
      name_ar: 'واقي المراتب',
      count: '12 dimensions',
      image: '/images/products/protege-matelas.jpg',
      desc_fr: '100% imperméable, 80% coton éponge',
      desc_ar: 'عازل للسوائل 100% وسطح قطني ناعم'
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[580px] sm:min-h-[640px] flex items-center bg-stone-900 text-white overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/products/sultan.jpg"
            alt="My Bed Hero Banner"
            fill
            priority
            className="object-cover object-center opacity-30 scale-105 animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/80 to-stone-900/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl space-y-6">
            
            {/* Algerian Flag & Quality Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-gold-600/20 border border-gold-400/40 text-gold-300 text-xs font-semibold backdrop-blur">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>{locale === 'fr' ? 'Fabricant Algérien de Literie de Prestige' : 'صناعة جزائرية فاخرة بمواصفات ملكية'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-tight sm:leading-none text-white">
              {t.hero_title}
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-light">
              {t.hero_subtitle}
            </p>

            {/* Quick Guarantees Bullets */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-stone-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{locale === 'fr' ? 'Bois Rouge Massif Garanti' : 'هيكل خشب أحمر طبيعي'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{locale === 'fr' ? 'Coffre Métallique Hydraulique' : 'صندوق تخزين هيدروليكي مقوى'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{locale === 'fr' ? 'Tissu Anti-Tache Premium' : 'قماش مضاد للبقع سهل المسح'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{locale === 'fr' ? 'Livraison dans 58 Wilayas' : 'توصيل متاح لـ 58 ولاية'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href={`/${locale}/products?category=beds`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-600 hover:bg-gold-500 text-stone-950 font-bold text-sm rounded-xl shadow-xl hover:shadow-gold-600/30 transition-all"
              >
                <span>{t.hero_cta}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>

              <a
                href="https://wa.me/213562619899"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm rounded-xl backdrop-blur transition-all"
              >
                <span>{t.hero_contact}</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 2. REASSURANCE TILES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-navy-900/5 text-navy-900 rounded-xl flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-gold-600" />
            </div>
            <h3 className="font-bold text-stone-900 text-base mb-1">{t.feat_wood_title}</h3>
            <p className="text-xs text-stone-500 leading-relaxed">{t.feat_wood_desc}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-navy-900/5 text-navy-900 rounded-xl flex items-center justify-center mb-4">
              <Layers className="w-6 h-6 text-gold-600" />
            </div>
            <h3 className="font-bold text-stone-900 text-base mb-1">{t.feat_box_title}</h3>
            <p className="text-xs text-stone-500 leading-relaxed">{t.feat_box_desc}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-navy-900/5 text-navy-900 rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-gold-600" />
            </div>
            <h3 className="font-bold text-stone-900 text-base mb-1">{t.feat_fabric_title}</h3>
            <p className="text-xs text-stone-500 leading-relaxed">{t.feat_fabric_desc}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-navy-900/5 text-navy-900 rounded-xl flex items-center justify-center mb-4">
              <Truck className="w-6 h-6 text-gold-600" />
            </div>
            <h3 className="font-bold text-stone-900 text-base mb-1">{t.feat_delivery_title}</h3>
            <p className="text-xs text-stone-500 leading-relaxed">{t.feat_delivery_desc}</p>
          </div>

        </div>
      </section>

      {/* 3. CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-1 block">
              {locale === 'fr' ? 'Univers Literie' : 'عالم الراحة'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-900">
              {t.categories_title}
            </h2>
          </div>
          <Link
            href={`/${locale}/products`}
            className="text-sm font-bold text-navy-900 hover:text-gold-600 flex items-center gap-1.5 transition-colors"
          >
            <span>{locale === 'fr' ? 'Tout le catalogue' : 'عرض كامل المنتجات'}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${locale}/products?category=${cat.id}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-stone-900 border border-stone-200 shadow-sm hover:shadow-xl transition-all"
            >
              <Image
                src={cat.image}
                alt={cat.name_fr}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              
              <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                <span className="px-2.5 py-0.5 text-[10px] font-bold bg-gold-600 text-stone-950 rounded-full mb-2 inline-block">
                  {cat.count}
                </span>
                <h3 className="text-xl font-bold font-serif mb-1 group-hover:text-gold-400 transition-colors">
                  {locale === 'fr' ? cat.name_fr : cat.name_ar}
                </h3>
                <p className="text-xs text-stone-300 line-clamp-2">
                  {locale === 'fr' ? cat.desc_fr : cat.desc_ar}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. BEST-SELLERS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-1 block">
            {locale === 'fr' ? 'Sélection coup de cœur' : 'المختارات الأكثر إقبالاً'}
          </span>
          <h2 className="text-3xl font-serif font-bold text-navy-900 mb-3">
            {t.best_sellers_title}
          </h2>
          <p className="text-sm text-stone-500">
            {locale === 'fr'
              ? 'Conçus pour transformer votre chambre en une suite royale avec confort absolu et rangements intelligents.'
              : 'صُممت خصيصاً لتمنحك غرفة نوم ملكية تجمع بين أناقة التصميم وراحة التخزين الذكي.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </section>

      {/* 5. PROMO / PAYMENT WORKFLOW BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-stone-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-gold-600/30 text-gold-400 text-xs font-bold uppercase tracking-wider">
              {locale === 'fr' ? 'Facilités de Commande en Algérie' : 'تسهيلات الشراء في الجزائر'}
            </span>

            <h3 className="text-2xl sm:text-4xl font-serif font-extrabold text-white leading-tight">
              {locale === 'fr' 
                ? 'Commandez avec un acompte, réglez le reste à la livraison !' 
                : 'اطلب الآن بدفع عربون رمزي، وسدد باقي المبلغ عند الاستلام والفحص !'}
            </h3>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              {locale === 'fr'
                ? 'Payez votre acompte en toute sécurité par Carte Edahabia / CIB ou par versement BaridiMob/CCP. Le solde est payé en espèces auprès de notre livreur après réception de vos meubles.'
                : 'ادفع العربون بكل أمان عبر بطاقتك الذهبية، بنك CIB، أو بتحويل بسيط عبر تطبيق بريدي موب BaridiMob أو بريد الجزائر CCP. والباقي تدفعه نقداً للناقل عند وصول السرير.'}
            </p>

            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <Link
                href={`/${locale}/products?category=beds`}
                className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-stone-950 font-bold text-sm rounded-xl transition-all shadow-lg"
              >
                {locale === 'fr' ? 'Choisir mon modèle' : 'اختر سريرك الآن'}
              </Link>
              <div className="flex items-center gap-3 text-xs text-stone-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{locale === 'fr' ? 'Fabrication sous 5 à 10 jours' : 'مدة التصنيع بين 5 إلى 10 أيام فقط'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMPLETE BED MODELS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-1 block">
              {locale === 'fr' ? 'Nos Lits Coffre' : 'أسرّتنا المزودة بصندوق'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-900">
              {locale === 'fr' ? 'Tous nos modèles de Lits' : 'تشكيلة الأسرّة الكاملة (9 موديلات)'}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bedModels.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </section>

    </div>
  );
}
