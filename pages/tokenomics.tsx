"use client";

import { useMemo, useState } from "react";
import Head from "next/head";
import { useLanguage } from "../lib/LanguageContext";
import {
  GLOBAL_DATA,
  INITIAL_CIRCULATION,
  TOKEN_CATEGORIES,
  TOKENOMICS_PRINCIPLES,
  formatTokenAmount,
  formatUSD,
  TokenCategory,
} from "../lib/tokenomicsData";
import DynamicPieChart from "../components/tokenomics/DynamicPieChart";
import { TokenomicsCard } from "../components/tokenomics/TokenomicsCard";
import { TokenomicsDetailModal } from "../components/tokenomics/TokenomicsDetailModal";
import { HorizontalCalendar } from "../components/tokenomics/HorizontalCalendar";
import { UnlockTimeline } from "../components/tokenomics/UnlockTimeline";

const glassCard = "rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl";

export default function TokenomicsPage() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<TokenCategory | null>(null);

  const heroHighlights = useMemo(
    () => [
      {
        label: t.tokenomics.metrics.totalSupply,
        value: "1,000,000,000 WTX",
      },
      {
        label: t.tokenomics.metrics.price,
        value: `$${GLOBAL_DATA.initialPrice.toFixed(5)} USD`,
      },
      {
        label: t.tokenomics.metrics.circulating,
        value: `${GLOBAL_DATA.initialCirculatingPercentage}% · ${formatTokenAmount(
          GLOBAL_DATA.initialCirculating,
        )} WTX`,
      },
    ],
    [t],
  );

  const coreMetrics = useMemo(
    () => [
      {
        label: t.tokenomics.metrics.network,
        value: GLOBAL_DATA.network,
      },
      {
        label: t.tokenomics.metrics.fdv,
        value: formatUSD(GLOBAL_DATA.fdv),
      },
      {
        label: t.tokenomics.metrics.liquidity,
        value: formatUSD(GLOBAL_DATA.initialLiquidity),
      },
      {
        label: t.tokenomics.metrics.lock,
        value: `${GLOBAL_DATA.liquidityLockMonths} ${language === "es" ? "meses" : "months"}`,
      },
      {
        label: t.tokenomics.metrics.ticker,
        value: GLOBAL_DATA.tokenSymbol,
      },
    ],
    [language, t],
  );

  const principles = useMemo(
    () =>
      TOKENOMICS_PRINCIPLES.map(principle => ({
        title: language === "es" ? principle.titleEs : principle.title,
        description: language === "es" ? principle.descriptionEs : principle.description,
      })),
    [language],
  );

  const circulationCards = useMemo(
    () =>
      INITIAL_CIRCULATION.map(item => ({
        ...item,
        label: language === "es" ? item.labelEs : item.label,
        description: language === "es" ? item.descriptionEs : item.description,
      })),
    [language],
  );

  return (
    <>
      <Head>
        <title>WTX Tokenomics — Web3TrustX</title>
        <meta
          name="description"
          content="Arquitectura tokenómica de Web3TrustX: supply fijo, deflación programada y liquidez asegurada."
        />
      </Head>

      <main className="relative overflow-hidden bg-[#03060f] text-white">
        <div className="absolute inset-0 opacity-40" aria-hidden>
          <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#00b5ad]/30 blur-[200px]" />
          <div className="absolute top-1/2 right-0 h-80 w-80 translate-x-1/3 rounded-full bg-[#2563eb]/20 blur-[180px]" />
        </div>

        <div className="relative z-10 px-4 pt-28 sm:pt-32 pb-16 sm:pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-12 sm:space-y-20">
            {/* Horizontal calendar at the top */}
            <div className="-mx-4 sm:-mx-6 lg:-mx-8">
              <HorizontalCalendar />
            </div>

            {/* Hero */}
            <section className={`${glassCard} relative overflow-hidden bg-gradient-to-br from-[#06101a]/90 to-[#101A2B]/70 p-4 sm:p-8`}>
              <div className="flex flex-col gap-6 sm:gap-10 lg:flex-row">
                <div className="flex-1">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 sm:px-4 py-1 text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.25em] text-white/70">
                    {t.tokenomics.hero.badge}
                  </span>
                  <h1 className="mt-4 sm:mt-6 text-2xl sm:text-4xl md:text-5xl font-semibold leading-tight text-white">
                    {t.tokenomics.hero.title}
                  </h1>
                  <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-white/70">{t.tokenomics.hero.subtitle}</p>
                  <p className="mt-4 sm:mt-6 text-sm sm:text-base text-white/70 md:max-w-2xl">{t.tokenomics.hero.description}</p>
                  <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
                    <a
                      href="#distribution"
                      className="rounded-xl sm:rounded-2xl bg-white px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-black transition hover:bg-white/90"
                    >
                      {t.tokenomics.hero.ctaPrimary}
                    </a>
                  </div>
                </div>

                <div className="flex-1 rounded-2xl sm:rounded-3xl border border-white/10 bg-black/30 p-4 sm:p-6">
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/40">{t.tokenomics.summary.title}</p>
                  <p className="mt-1 text-xs sm:text-sm text-white/60">{t.tokenomics.summary.subtitle}</p>
                  <div className="mt-4 sm:mt-6 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                    {heroHighlights.map(item => (
                      <div key={item.label} className="rounded-xl sm:rounded-2xl border border-white/5 bg-white/5 p-3 sm:p-4">
                        <p className="text-[10px] sm:text-xs text-white/50">{item.label}</p>
                        <p className="text-lg sm:text-xl font-semibold text-white break-words">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Core metrics */}
            <section>
              <div className="text-center">
                <p className="text-sm sm:text-lg font-semibold text-white">{t.tokenomics.summary.title}</p>
                <p className="text-xs sm:text-sm text-white/60">{t.tokenomics.summary.subtitle}</p>
              </div>
              <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
                {coreMetrics.map(metric => (
                  <div key={metric.label} className={`${glassCard} p-4 sm:p-5 text-center`}>
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/40">{metric.label}</p>
                    <p className="mt-2 sm:mt-3 text-lg sm:text-2xl font-semibold text-white break-words">{metric.value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Principles */}
            <section>
              <div className="text-center">
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/40">{t.tokenomics.principles.title}</p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-semibold">{t.tokenomics.principles.subtitle}</h2>
              </div>
              <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
                {principles.map(principle => (
                  <div key={principle.title} className={`${glassCard} p-4 sm:p-5`}>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">{principle.title}</h3>
                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-white/70">{principle.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Distribution */}
            <section id="distribution">
              <div className="mb-6 sm:mb-10 text-center">
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/40">{t.tokenomics.allocation.title}</p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-semibold">{t.tokenomics.allocation.subtitle}</h2>
              </div>
              
              {/* Grid principal - todas las cards en 1 columna en mobile, 2 en lg */}
              <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
                {/* Pie chart */}
                <div className={`${glassCard} p-4 sm:p-6 lg:row-span-2`}>
                  <DynamicPieChart onCategoryClick={setSelectedCategory} />
                </div>

                {/* First 2 cards (Ecosystem + Community) */}
                {TOKEN_CATEGORIES.slice(0, 2).map((category, index) => (
                  <TokenomicsCard key={category.id} category={category} index={index} onSelect={setSelectedCategory} />
                ))}
              </div>

              {/* Remaining cards */}
              <div className="mt-4 sm:mt-6 grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                {TOKEN_CATEGORIES.slice(2).map((category, index) => (
                  <TokenomicsCard key={category.id} category={category} index={index + 2} onSelect={setSelectedCategory} />
                ))}
              </div>
            </section>

            {/* Initial circulation */}
            <section>
              <div className="text-center">
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/40">{t.tokenomics.initialCirculation.title}</p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-semibold">{t.tokenomics.initialCirculation.subtitle}</h2>
                <p className="mt-2 text-xs sm:text-sm text-white/60">{t.tokenomics.initialCirculation.note}</p>
              </div>
              <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
                {circulationCards.map(card => (
                  <div key={card.id} className={`${glassCard} p-4 sm:p-5`}>
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/40">{card.label}</p>
                    <p className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-semibold text-white">{card.percentage}%</p>
                    <p className="text-xs sm:text-sm text-white/60">{formatTokenAmount(card.tokens)} WTX</p>
                    <p className="mt-2 sm:mt-3 text-[11px] sm:text-xs text-white/60">{card.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Deflation & Liquidity */}
            <section className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
              <div className={`${glassCard} p-4 sm:p-6`}>
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/40">{t.tokenomics.deflation.title}</p>
                <h3 className="mt-2 text-xl sm:text-2xl font-semibold">{t.tokenomics.deflation.subtitle}</h3>
                <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/70">
                  {t.tokenomics.deflation.bullets.map((bullet: string) => (
                    <li key={bullet} className="flex items-start gap-2 sm:gap-3">
                      <span className="mt-1 h-1.5 w-1.5 sm:h-2 sm:w-2 flex-shrink-0 rounded-full bg-white/60" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`${glassCard} p-4 sm:p-6`}>
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/40">{t.tokenomics.liquidity.title}</p>
                <h3 className="mt-2 text-xl sm:text-2xl font-semibold">{t.tokenomics.liquidity.subtitle}</h3>
                <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 text-xs sm:text-sm text-white/70">
                  <div>
                    <p className="text-white/50">WTX</p>
                    <p className="text-lg sm:text-xl font-semibold text-white">{formatTokenAmount(GLOBAL_DATA.liquidityPoolWTX)} WTX</p>
                  </div>
                  <div>
                    <p className="text-white/50">USD</p>
                    <p className="text-lg sm:text-xl font-semibold text-white">≈ {formatUSD(GLOBAL_DATA.initialLiquidity)}</p>
                  </div>
                  <div>
                    <p className="text-white/50">{t.tokenomics.metrics.lock}</p>
                    <p className="text-lg sm:text-xl font-semibold text-white">
                      {GLOBAL_DATA.liquidityLockMonths} {language === "es" ? "meses bloqueados" : "months locked"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Calendar & timeline */}
            <section id="calendar" className="grid gap-6 sm:gap-8 lg:grid-cols-1">
              <div id="timeline">
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/40">{t.tokenomics.timeline.title}</p>
                <p className="text-xs sm:text-sm text-white/60">{t.tokenomics.timeline.subtitle}</p>
                <div className="mt-3 sm:mt-4">
                  <UnlockTimeline />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <TokenomicsDetailModal
        category={selectedCategory ?? undefined}
        isOpen={Boolean(selectedCategory)}
        onClose={() => setSelectedCategory(null)}
      />
    </>
  );
}
