'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getStoredCart, clearCart, saveNewOrder, CartItem, OrderRecord } from '@/lib/store';
import { WILAYAS, Wilaya } from '@/data/wilayas';
import { DICTIONARY, Locale } from '@/data/translations';
import { 
  CreditCard, 
  UploadCloud, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  Phone, 
  AlertCircle,
  Clock,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export default function CheckoutPage({ params }: { params: { locale: string } }) {
  const locale = (params.locale === 'ar' ? 'ar' : 'fr') as Locale;
  const t = DICTIONARY[locale];
  const isRtl = locale === 'ar';
  const router = useRouter();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Form fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState<Wilaya>(WILAYAS[15]); // Default: 16 - Alger
  const [commune, setCommune] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'edahabia' | 'baridimob'>('edahabia');
  const [receiptImage, setReceiptImage] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const items = getStoredCart();
    setCart(items);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-navy-900">{t.cart_empty}</h2>
        <Link
          href={`/${locale}/products`}
          className="inline-block px-6 py-3 bg-navy-900 text-white font-semibold rounded-xl text-sm"
        >
          {t.cart_continue}
        </Link>
      </div>
    );
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = selectedWilaya ? selectedWilaya.delivery_fee : 0;
  const total = subtotal + deliveryFee;

  // Deposit calculation: 5000 DA for beds/furniture, 2000 DA for pillows/accessories
  const depositAmount = total >= 25000 ? 5000 : 2000;
  const balanceDue = total - depositAmount;

  // Handle receipt image upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !phone.trim() || !commune.trim()) {
      setErrorMsg(locale === 'fr' 
        ? 'Veuillez renseigner votre nom, téléphone et commune.' 
        : 'يرجى ملء الاسم، رقم الهاتف والبلدية بدقة.');
      return;
    }

    if (paymentMethod === 'baridimob' && !receiptImage) {
      setErrorMsg(locale === 'fr'
        ? 'Veuillez joindre une capture d\'écran ou une photo du reçu de versement BaridiMob.'
        : 'يرجى إرفاق صورة لوصل تحويل بريدي موب لتأكيد الطلب.');
      return;
    }

    setIsSubmitting(true);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `MYB-${selectedWilaya.code}${randomSuffix}`;

    const newOrder: OrderRecord = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      customerName: fullName.trim(),
      customerPhone: phone.trim(),
      wilayaName: locale === 'fr' ? selectedWilaya.name_fr : selectedWilaya.name_ar,
      wilayaCode: selectedWilaya.code,
      commune: commune.trim(),
      notes: notes.trim() || undefined,
      items: cart,
      subtotal,
      deliveryFee,
      total,
      depositAmount,
      balanceDue,
      paymentMethod,
      receiptImage,
      status: paymentMethod === 'edahabia' ? 'DEPOSIT_CONFIRMED' : 'PENDING_DEPOSIT',
      locale
    };

    // Save order in local storage
    saveNewOrder(newOrder);

    // Clear shopping cart
    clearCart();

    // Redirect to success page
    setTimeout(() => {
      router.push(`/${locale}/order-success?orderId=${newOrder.id}`);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-1 block">
          {locale === 'fr' ? 'Paiement Sécurisé' : 'إتمام الشراء الآمن'}
        </span>
        <h1 className="text-3xl font-serif font-bold text-navy-900">
          {t.checkout_title}
        </h1>
        <p className="text-stone-500 text-sm mt-1">
          {t.checkout_subtitle}
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Customer Info & Payment Method (8 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Section 1: Customer Details */}
          <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-5">
            <h2 className="text-lg font-bold text-navy-900 border-b border-stone-100 pb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-navy-900 text-white text-xs flex items-center justify-center font-sans">1</span>
              <span>{locale === 'fr' ? 'Coordonnées du Destinataire' : 'معلومات المستلم والتوصيل'}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1.5">
                  {t.form_fullname} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={locale === 'fr' ? 'Ex: Mohamed Benali' : 'مثال: محمد بن علي'}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-navy-900 text-sm bg-stone-50/50"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1.5">
                  {t.form_phone} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  dir="ltr"
                  placeholder="05 / 06 / 07..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-navy-900 text-sm bg-stone-50/50 text-left"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1.5">
                  {t.form_wilaya} <span className="text-rose-500">*</span>
                </label>
                <select
                  value={selectedWilaya.code}
                  onChange={(e) => {
                    const found = WILAYAS.find((w) => w.code === parseInt(e.target.value));
                    if (found) setSelectedWilaya(found);
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-navy-900 text-sm bg-stone-50/50"
                >
                  {WILAYAS.map((w) => (
                    <option key={w.code} value={w.code}>
                      {locale === 'fr' ? w.name_fr : w.name_ar} ({w.delivery_fee.toLocaleString()} DA)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1.5">
                  {t.form_commune} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={locale === 'fr' ? 'Ex: Kouba, Rue Mohamed V' : 'مثال: القبة، حي السلام'}
                  value={commune}
                  onChange={(e) => setCommune(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-navy-900 text-sm bg-stone-50/50"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1.5">
                {t.form_notes}
              </label>
              <textarea
                rows={2}
                placeholder={locale === 'fr' ? 'Étage, code d\'entrée, créneau souhaité...' : 'رقم الطابق، تفاصيل إضافية عن العنوان...'}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-navy-900 text-sm bg-stone-50/50"
              />
            </div>
          </div>

          {/* Section 2: Algerian Payment Formula (Acompte + Solde) */}
          <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-navy-900 border-b border-stone-100 pb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-navy-900 text-white text-xs flex items-center justify-center font-sans">2</span>
              <span>{t.payment_plan_title}</span>
            </h2>

            {/* Explanation Alert */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 leading-relaxed space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-amber-950">
                <Clock className="w-4 h-4 text-amber-700" />
                <span>{locale === 'fr' ? 'Fonctionnement du paiement My Bed :' : 'كيف يتم دفع مستحقات طلبك في ماي بيد :'}</span>
              </div>
              <p>{t.payment_plan_desc}</p>
            </div>

            {/* Deposit Payment Method Options */}
            <div className="space-y-4">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                {t.payment_method_label}
              </label>

              {/* Option 1: Edahabia / CIB */}
              <label
                className={`p-4 rounded-2xl border-2 flex items-start gap-4 cursor-pointer transition-all ${
                  paymentMethod === 'edahabia'
                    ? 'border-navy-900 bg-navy-900/5 shadow-xs'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment_method"
                  value="edahabia"
                  checked={paymentMethod === 'edahabia'}
                  onChange={() => setPaymentMethod('edahabia')}
                  className="mt-1 text-navy-900 focus:ring-navy-900"
                />
                <div className="space-y-1 flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-navy-900">{t.pay_edahabia}</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500 text-stone-950 font-bold text-[10px]">
                      ÉDAHABIA / CIB
                    </span>
                  </div>
                  <p className="text-xs text-stone-500">
                    {locale === 'fr'
                      ? 'Réglez l\'acompte immédiatement en toute sécurité. Votre commande passe en priorité de fabrication.'
                      : 'سدد مبلغ العربون مباشرة ببطاقتك الذهبية أو CIB مع خصم فوري ومباشر لبدء تصنيع السرير.'}
                  </p>
                </div>
              </label>

              {/* Option 2: BaridiMob / CCP */}
              <label
                className={`p-4 rounded-2xl border-2 flex items-start gap-4 cursor-pointer transition-all ${
                  paymentMethod === 'baridimob'
                    ? 'border-navy-900 bg-navy-900/5 shadow-xs'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment_method"
                  value="baridimob"
                  checked={paymentMethod === 'baridimob'}
                  onChange={() => setPaymentMethod('baridimob')}
                  className="mt-1 text-navy-900 focus:ring-navy-900"
                />
                <div className="space-y-1 flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-navy-900">{t.pay_baridimob}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px]">
                      BARIDIMOB
                    </span>
                  </div>
                  <p className="text-xs text-stone-500">
                    {locale === 'fr'
                      ? 'Faites un virement via BaridiMob ou un versement CCP à La Poste, puis joignez le reçu ci-dessous.'
                      : 'قم بالتحويل عبر تطبيق بريدي موب أو عبر مركز البريد، ثم قم بتحميل صورة الوصل هنا.'}
                  </p>
                </div>
              </label>
            </div>

            {/* BaridiMob Details Box (shown if selected) */}
            {paymentMethod === 'baridimob' && (
              <div className="p-5 rounded-2xl bg-stone-100 border border-stone-200 space-y-4 animate-fade-in">
                <p className="text-xs font-medium text-stone-700">
                  {t.baridimob_instructions}
                </p>

                <div className="p-3.5 bg-white rounded-xl border border-stone-300 font-mono text-xs space-y-1.5" dir="ltr">
                  <div className="text-navy-900 font-bold">{t.baridimob_rip}</div>
                  <div className="text-stone-600">{t.baridimob_ccp}</div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-800 block">
                    {t.upload_receipt_label} <span className="text-rose-500">*</span>
                  </label>
                  
                  <div className="border-2 border-dashed border-stone-300 hover:border-navy-900 rounded-xl p-4 text-center cursor-pointer bg-white transition-colors relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <UploadCloud className="w-8 h-8 text-stone-400 mx-auto mb-1" />
                    <span className="text-xs font-semibold text-navy-900 block">
                      {receiptImage ? (locale === 'fr' ? 'Reçu attaché avec succès ! (Cliquer pour changer)' : 'تم إرفاق الوصل بنجاح ! (انقر للتغيير)') : (locale === 'fr' ? 'Cliquez pour sélectionner la photo du reçu' : 'اضغط لاختيار صورة الوصل من هاتفك أو حاسوبك')}
                    </span>
                  </div>

                  {receiptImage && (
                    <div className="relative w-28 h-28 rounded-lg overflow-hidden border border-stone-300 mt-2">
                      <Image src={receiptImage} alt="Reçu" fill className="object-cover" />
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right: Order Summary Sticky Card (5 cols) */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">
          <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xl space-y-6">
            
            <h3 className="font-serif font-bold text-lg text-navy-900 pb-3 border-b border-stone-100">
              {locale === 'fr' ? 'Votre Commande' : 'محتويات طلبيتك'}
            </h3>

            {/* Items mini list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-xs">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone-100 shrink-0 border">
                    <Image src={item.image} alt={item.name_fr} fill className="object-cover" />
                  </div>
                  <div className="flex-grow">
                    <span className="font-bold text-navy-900 block">
                      {locale === 'fr' ? item.name_fr : item.name_ar}
                    </span>
                    <span className="text-[11px] text-stone-500">
                      {item.dimension} {item.color ? `• ${item.color}` : ''} (x{item.quantity})
                    </span>
                  </div>
                  <span className="font-bold text-navy-900 shrink-0">
                    {(item.price * item.quantity).toLocaleString()} {t.currency}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Summary */}
            <div className="space-y-2.5 pt-4 border-t border-stone-100 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>{locale === 'fr' ? 'Sous-total articles' : 'مجموع المنتجات'}</span>
                <span className="font-semibold">{subtotal.toLocaleString()} {t.currency}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>{locale === 'fr' ? 'Frais de livraison' : 'سعر التوصيل'} ({selectedWilaya.name_fr.split('-')[1]})</span>
                <span className="font-semibold">{deliveryFee.toLocaleString()} {t.currency}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-navy-900 pt-2 border-t">
                <span>{locale === 'fr' ? 'Montant Global Total' : 'المبلغ الإجمالي الكلي'}</span>
                <span>{total.toLocaleString()} {t.currency}</span>
              </div>
            </div>

            {/* Algerian Breakdown Box */}
            <div className="p-4 rounded-2xl bg-stone-900 text-white space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gold-400 font-bold uppercase tracking-wider">
                  {locale === 'fr' ? '1. Acompte à verser' : '1. العربون المطلوب'}
                </span>
                <span className="text-base font-extrabold text-gold-400">
                  {depositAmount.toLocaleString()} {t.currency}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs border-t border-stone-800 pt-2 text-stone-300">
                <span>{locale === 'fr' ? '2. Reste au livreur (Cash)' : '2. المتبقي عند الاستلام (نقداً)'}</span>
                <span className="font-bold text-white">
                  {balanceDue.toLocaleString()} {t.currency}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl bg-gold-500 hover:bg-gold-400 text-stone-950 font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-[1.01] disabled:opacity-50"
            >
              <span>{isSubmitting ? (locale === 'fr' ? 'Enregistrement en cours...' : 'جاري تسجيل الطلب...') : t.submit_order}</span>
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>

            <div className="text-[11px] text-stone-500 text-center flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-600" />
              <span>{locale === 'fr' ? 'Appel de confirmation sous 24h ouvrées' : 'اتصال هاتفي لتأكيد القياسات خلال 24 ساعة'}</span>
            </div>

          </div>
        </div>

      </form>
    </div>
  );
}
