import type { Metadata } from 'next'
import { AFFILIATE, OFFERS_888 } from '@/lib/constants'
import { CookieConsent, Footer, Navbar } from '@/components/bttsbet'
import CopyableCodeClient from '@/components/bttsbet/CopyableCode'

export const metadata: Metadata = {
  title: 'كود برومو 888starz btts221 — 100 لفة Lucky Wheel + فري بيت 1€ كل اثنين',
  description:
    'بونص 888starz مع كود btts221: 100 لفة Lucky Wheel مجانية عند التسجيل وفري بيت 1 يورو كل يوم اثنين. أفضل كود 888starz.',
  keywords: [
    'كود برومو 888starz',
    'بونص 888starz',
    'btts221',
    'كود 888starz',
    'فري بيت 888starz',
    'lucky wheel 888starz',
  ],
  alternates: { canonical: 'https://bttsbet.online/ar/code-promo-888starz' },
  openGraph: {
    title: 'كود برومو 888starz btts221 — 100 لفة + فري بيت أسبوعي',
    description: 'btts221: 100 لفة Lucky Wheel عند التسجيل + فري بيت 1€ كل اثنين.',
    url: 'https://bttsbet.online/ar/code-promo-888starz',
    locale: 'ar',
    type: 'website',
  },
}

export default function CodePromo888ArPage() {
  return (
    <div className="min-h-screen bg-[#07090d] linebet-arabic" dir="rtl" lang="ar">
      <Navbar />
      <main className="mx-auto max-w-lg px-4 py-8 sm:py-12">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#f87171]">بونص 888starz</p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          كود برومو 888starz <span className="text-[#f87171]">btts221</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#8b95a5]">
          فعّل <strong className="text-white">أفضل بونص 888starz</strong> بالكود{' '}
          <strong className="text-[#f87171]">btts221</strong>.
        </p>

        <div className="mt-6 rounded-2xl border border-red-500/30 bg-gradient-to-b from-red-950/40 to-[#0c0f14] p-4">
          <div className="flex items-center gap-3">
            <img src="/logos/888starz-icon.png" alt="888starz" className="h-10 w-10 rounded-lg object-cover" />
            <div>
              <p className="text-sm font-bold text-white">عرض التسجيل</p>
              <p className="text-xs text-[#8b95a5]">عبر كود الشريك {OFFERS_888.code}</p>
            </div>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-[#d4d8de]">
            <li className="rounded-lg border border-white/5 bg-black/30 px-3 py-2.5">
              <strong className="text-[#f87171]">100 لفة</strong> Lucky Wheel مجانية عند التسجيل
            </li>
            <li className="rounded-lg border border-white/5 bg-black/30 px-3 py-2.5">
              <strong className="text-[#f87171]">فري بيت 1 €</strong> كل يوم اثنين
            </li>
          </ul>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8b95a5]">
              الكود <CopyableCodeClient code={OFFERS_888.code} displayClassName="text-[#f87171] text-base" />
            </div>
            <a
              href={AFFILIATE.star888}
              target="_blank"
              rel={AFFILIATE.rel}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-gradient-to-b from-red-400 to-red-600 px-4 text-sm font-extrabold text-white shadow-lg shadow-red-500/25"
            >
              استخدام btts221 ←
            </a>
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-[#6b7580]">
            العروض من 888starz. التوفر والشروط (البلد، الرهانات) تُؤكد عند التسجيل على موقع الشريك. +18.
          </p>
        </div>

        <div className="mt-8 space-y-3 text-sm leading-relaxed text-[#8b95a5]">
          <h2 className="text-lg font-bold text-white">كيف تفعّل بونص 888starz</h2>
          <ol className="list-decimal space-y-2 pr-5">
            <li>اضغط على « استخدام btts221 ».</li>
            <li>أنشئ حساب 888starz.</li>
            <li>أدخل كود البرومو <strong className="text-white">btts221</strong>.</li>
            <li>استفد من 100 لفة Lucky Wheel وفري بيت 1 € كل اثنين حسب القواعد المعروضة.</li>
          </ol>
          <p>
            تبحث أيضاً عن <a href="/" className="font-semibold text-[#f5c518]">كود برومو Linebet VISION221</a>؟ إنه الكود المميز لـ Linebet أفريقيا على BttsBet.
          </p>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  )
}
