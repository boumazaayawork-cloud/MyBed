import React from 'react';
import { PRODUCTS } from '@/data/products';
import { DICTIONARY, Locale } from '@/data/translations';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

interface ProductsPageProps {
  params: { locale: string };
  searchParams: { category?: string };
}

export default function ProductsPage({ params, searchParams }: ProductsPageProps) {
  const locale = (params.locale === 'ar' ? 'ar' : 'fr') as Locale;
  const t = DICTIONARY[locale];
  const activeCategory = searchParams.category || 'all';

  const categories = [
    { id: 'all', label_fr: 'Tous les produits', label_ar: 'جميع المنتجات' },
    { id: 'beds', label_fr: 'Lits Coffre', label_ar: 'أسرّة بصندوق' },
    { id: 'mattresses', label_fr: 'Matelas', label_ar: 'المراتب الطبية' },
    { id: 'pillows', label_fr: 'Oreillers', label_ar: 'الوسائد' },
    { id: 'protectors', label_fr: 'Protège Matelas', label_ar: 'واقي المراتب' },
    { id: 'nightstands', label_fr: 'Tables de chevet', label_ar: 'طاولات السرير' },
    { id: 'dressings', label_fr: 'Dressings & Armoires', label_ar: 'خزائن الملابس' },
  ];

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Page Title & Breadcrumb */}
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-1 block">
          {locale === 'fr' ? 'Boutique Officielle' : 'المتجر الرسمي'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-navy-900">
          {locale === 'fr' ? 'Notre Catalogue Complet' : 'كتالوج منتجات ماي بيد'}
        </h1>
        <p className="text-stone-500 text-sm mt-2">
          {locale === 'fr'
            ? 'Découvrez tous nos modèles disponibles à la commande avec livraison 58 wilayas.'
            : 'اختر الموديل المناسب لغرفتك مع إمكانية التخصيص في المقاسات والألوان.'}
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <Link
              key={cat.id}
              href={`/${locale}/products${cat.id === 'all' ? '' : `?category=${cat.id}`}`}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-navy-900 text-white shadow-md'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {locale === 'fr' ? cat.label_fr : cat.label_ar}
            </Link>
          );
        })}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-stone-200">
          <p className="text-stone-500 text-base">
            {locale === 'fr' ? 'Aucun produit trouvé dans cette catégorie.' : 'لا توجد منتجات حالياً في هذا القسم.'}
          </p>
        </div>
      )}

    </div>
  );
}
