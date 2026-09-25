import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppSticky from '@/components/WhatsAppSticky';
import { Locale } from '@/data/translations';

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'ar' }];
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = (params.locale === 'ar' ? 'ar' : 'fr') as Locale;
  const isRtl = locale === 'ar';

  return (
    <div lang={locale} dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen flex flex-col justify-between selection:bg-gold-500 selection:text-white">
      <Header locale={locale} />
      <main className="flex-grow">{children}</main>
      <WhatsAppSticky locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}
