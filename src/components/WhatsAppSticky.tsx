'use client';

import React from 'react';
import { Locale } from '@/data/translations';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppSticky({ locale }: { locale: Locale }) {
  const isRtl = locale === 'ar';
  const text = locale === 'fr' 
    ? 'Commander ou Poser une Question' 
    : 'طلب سريع أو استفسار عبر واتساب';

  const defaultMsg = locale === 'fr'
    ? 'Bonjour My Bed, je souhaite commander un lit/matelas.'
    : 'مرحبا ماي بيد، أود الاستفسار والطلب من فضلكم.';

  const url = `https://wa.me/213562619899?text=${encodeURIComponent(defaultMsg)}`;

  return (
    <aside aria-label="WhatsApp Contact" className={`fixed bottom-6 ${isRtl ? 'left-6' : 'right-6'} z-40`}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl hover:shadow-emerald-600/50 hover:scale-105 transition-all duration-300 group"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-current" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full animate-ping" />
        </div>
        <span className="text-xs font-bold tracking-wide hidden sm:inline-block">
          {text}
        </span>
      </a>
    </aside>
  );
}
