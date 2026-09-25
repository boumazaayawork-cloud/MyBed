'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getStoredOrders, OrderRecord } from '@/lib/store';
import { DICTIONARY, Locale } from '@/data/translations';
import { 
  CheckCircle, 
  Printer, 
  MessageCircle, 
  ArrowRight, 
  ArrowLeft, 
  MapPin, 
  Phone,
} from 'lucide-react';

function OrderSuccessContent({ locale }: { locale: Locale }) {
  const t = DICTIONARY[locale];
  const isRtl = locale === 'ar';
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  const [order, setOrder] = useState<OrderRecord | null>(null);

  useEffect(() => {
    if (orderId) {
      const orders = getStoredOrders();
      const found = orders.find((o) => o.id === orderId);
      if (found) setOrder(found);
    }
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      {/* Success Hero Header */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-navy-900">
          {t.order_success_title}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          {t.order_success_desc}
        </p>
      </div>

      {order && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden print:border-none print:shadow-none">
          {/* Top Receipt Bar */}
          <div className="bg-navy-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs text-gold-400 font-bold uppercase tracking-wider block">
                {t.order_number}
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-bold tracking-tight">
                #{order.orderNumber}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>{locale === 'fr' ? 'Imprimer le Bon' : 'طباعة الوصل'}</span>
              </button>

              <a
                href={`https://wa.me/213562619899?text=${encodeURIComponent(`Bonjour My Bed, voici ma commande #${order.orderNumber}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Delivery & Customer Info */}
          <div className="p-6 sm:p-8 border-b border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="space-y-2">
              <span className="text-stone-500 font-bold uppercase text-[11px] block">
                {locale === 'fr' ? 'Informations Client' : 'بيانات الزبون'}
              </span>
              <div className="font-bold text-navy-900 text-base">{order.customerName}</div>
              <div className="flex items-center gap-2 text-stone-600" dir="ltr">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <span>{order.customerPhone}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-stone-500 font-bold uppercase text-[11px] block">
                {locale === 'fr' ? 'Adresse de Livraison' : 'عنوان التوصيل'}
              </span>
              <div className="flex items-start gap-2 text-navy-900 font-semibold">
                <MapPin className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                <span>{order.wilayaName} — {order.commune}</span>
              </div>
              {order.notes && (
                <p className="text-stone-500 text-xs italic">« {order.notes} »</p>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="p-6 sm:p-8 space-y-4">
            <h3 className="font-bold text-navy-900 text-sm uppercase tracking-wider">
              {t.order_summary}
            </h3>

            <div className="divide-y divide-stone-100">
              {order.items.map((item) => (
                <div key={item.id} className="py-3 flex justify-between items-center text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-navy-900">
                      {locale === 'fr' ? item.name_fr : item.name_ar}
                    </span>
                    <span className="text-stone-500 block text-xs">
                      {item.dimension} {item.color ? `• ${item.color}` : ''} (Qté: {item.quantity})
                    </span>
                  </div>
                  <span className="font-bold text-navy-900">
                    {(item.price * item.quantity).toLocaleString()} {t.currency}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Breakdown */}
            <div className="pt-6 border-t border-stone-200 space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between text-stone-600">
                <span>{locale === 'fr' ? 'Sous-total' : 'المجموع الجزئي'}</span>
                <span>{order.subtotal.toLocaleString()} {t.currency}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>{locale === 'fr' ? 'Frais de livraison' : 'سعر التوصيل'}</span>
                <span>{order.deliveryFee.toLocaleString()} {t.currency}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-navy-900 pt-2 border-t">
                <span>{locale === 'fr' ? 'Total Général' : 'المجموع الكلي'}</span>
                <span>{order.total.toLocaleString()} {t.currency}</span>
              </div>
            </div>

            {/* Algerian Settlement Terms */}
            <div className="mt-6 p-4 rounded-2xl bg-stone-100 border border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-stone-500 font-bold block">
                  {locale === 'fr' ? 'Acompte Réglé / Déclaré :' : 'العربون المدفوع :'}
                </span>
                <span className="text-emerald-600 font-black text-base">
                  {order.depositAmount.toLocaleString()} {t.currency}
                </span>
                <span className="text-[10px] text-stone-400 block mt-0.5">
                  ({order.paymentMethod === 'edahabia' ? 'Edahabia / CIB' : 'BaridiMob / CCP'})
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-stone-500 font-bold block">
                  {locale === 'fr' ? 'Reste à Régler au Livreur :' : 'المتبقي للدفع نقداً عند الاستلام :'}
                </span>
                <span className="text-navy-900 font-black text-base">
                  {order.balanceDue.toLocaleString()} {t.currency}
                </span>
                <span className="text-[10px] text-stone-400 block mt-0.5">
                  {locale === 'fr' ? 'Paiement en espèces à la livraison' : 'تسليم نقدي مباشر لسائق التوصيل'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Return home CTA */}
      <div className="text-center pt-6">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm rounded-xl transition-all"
        >
          <span>{locale === 'fr' ? 'Retourner à l\'Accueil' : 'العودة إلى الصفحة الرئيسية'}</span>
          {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage({ params }: { params: { locale: string } }) {
  const locale = (params.locale === 'ar' ? 'ar' : 'fr') as Locale;

  return (
    <Suspense fallback={<div className="text-center py-20">Chargement de la commande...</div>}>
      <OrderSuccessContent locale={locale} />
    </Suspense>
  );
}
