'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getStoredCart, removeFromCart, saveStoredCart, CartItem } from '@/lib/store';
import { DICTIONARY, Locale } from '@/data/translations';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function CartPage({ params }: { params: { locale: string } }) {
  const locale = (params.locale === 'ar' ? 'ar' : 'fr') as Locale;
  const t = DICTIONARY[locale];
  const isRtl = locale === 'ar';

  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCart(getStoredCart());
    setMounted(true);

    const handleUpdate = () => setCart(getStoredCart());
    window.addEventListener('cart_updated', handleUpdate);
    return () => window.removeEventListener('cart_updated', handleUpdate);
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    const updated = cart.map((item) => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    saveStoredCart(updated);
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!mounted) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="border-b border-stone-200 pb-4">
        <h1 className="text-3xl font-serif font-bold text-navy-900">{t.cart_title}</h1>
        <p className="text-stone-500 text-xs mt-1">
          {locale === 'fr' ? 'Vérifiez vos articles avant de passer à la caisse' : 'تأكد من اختياراتك ومقاساتك قبل إتمام الطلب'}
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 space-y-4">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-navy-900">{t.cart_empty}</h2>
          <p className="text-stone-500 text-sm max-w-md mx-auto">
            {locale === 'fr' 
              ? 'Découvrez nos lits coffre et nos oreillers pour composer la chambre de vos rêves.'
              : 'تصفح أسرّتنا المزودة بصندوق تخزين والوسائد الطبية لتجهيز غرفة نوم متكاملة.'}
          </p>
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm rounded-xl transition-all"
          >
            <span>{t.cart_continue}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-white rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center gap-5 shadow-xs"
              >
                {/* Image */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                  <Image
                    src={item.image}
                    alt={locale === 'fr' ? item.name_fr : item.name_ar}
                    fill
                    className="object-cover object-center"
                  />
                </div>

                {/* Details */}
                <div className="flex-grow space-y-1 text-center sm:text-left">
                  <h3 className="font-bold text-navy-900 text-base">
                    {locale === 'fr' ? item.name_fr : item.name_ar}
                  </h3>
                  <div className="text-xs text-stone-500 space-x-2">
                    <span className="font-semibold text-stone-700">{item.dimension}</span>
                    {item.color && (
                      <>
                        <span>•</span>
                        <span>{item.color}</span>
                      </>
                    )}
                  </div>
                  <div className="text-sm font-extrabold text-navy-900 pt-1">
                    {item.price.toLocaleString()} {t.currency}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 p-1">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-stone-700 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-navy-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-stone-700 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Total per line & Remove */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-navy-900">
                    {(item.price * item.quantity).toLocaleString()} {t.currency}
                  </span>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="p-2 text-stone-400 hover:text-rose-600 transition-colors"
                    title={t.cart_delete}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary Card */}
          <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-md space-y-6">
            <h2 className="text-lg font-bold text-navy-900 pb-3 border-b border-stone-100">
              {locale === 'fr' ? 'Récapitulatif' : 'ملخص الطلبية'}
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>{t.cart_subtotal}</span>
                <span className="font-bold text-navy-900">{subtotal.toLocaleString()} {t.currency}</span>
              </div>
              <div className="flex justify-between text-stone-600 text-xs">
                <span>{locale === 'fr' ? 'Livraison' : 'مصاريف التوصيل'}</span>
                <span className="text-stone-500 italic">
                  {locale === 'fr' ? 'Calculée à l\'étape suivante' : 'يتم احتسابها في الخطوة التالية'}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <Link
                href={`/${locale}/checkout`}
                className="w-full py-4 px-6 rounded-xl bg-gold-600 hover:bg-gold-500 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>{t.cart_checkout_btn}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-600 shrink-0" />
              <span>
                {locale === 'fr' 
                  ? 'Acompte requis pour lancer la fabrication, solde à la livraison.' 
                  : 'دفع عربون تأكيد، وباقي المبلغ يسلم نقداً عند استلام الأثاث.'}
              </span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
