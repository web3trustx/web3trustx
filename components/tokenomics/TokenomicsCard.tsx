"use client";

import { motion } from "framer-motion";
import { TokenCategory, formatTokenAmount } from "../../lib/tokenomicsData";
import { useLanguage } from "../../lib/LanguageContext";

interface TokenomicsCardProps {
  category: TokenCategory;
  index?: number;
  onSelect?: (category: TokenCategory) => void;
}

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + index * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

export function TokenomicsCard({ category, index = 0, onSelect }: TokenomicsCardProps) {
  const { language } = useLanguage();
  const isSpanish = language === "es";

  const title = isSpanish ? category.nameEs : category.name;
  const objective = isSpanish ? category.objectiveEs : category.objective;
  const details = isSpanish ? category.detailsEs : category.details;
  const cliff = isSpanish ? category.cliffEs : category.cliff;
  const vesting = isSpanish ? category.vestingEs : category.vesting;
  const burnMechanism = isSpanish ? category.burnMechanismEs : category.burnMechanism;
  const releaseNotes = isSpanish ? category.releaseNotesEs : category.releaseNotes;

  return (
    <motion.article
      variants={CARD_VARIANTS}
      initial="hidden"
      animate="visible"
      custom={index}
      className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20"
      style={{
        background:
          "linear-gradient(135deg, rgba(10,18,32,0.85) 0%, rgba(10,18,32,0.4) 100%)",
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl" style={{ backgroundColor: `${category.color}22` }}>
              {category.icon}
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-white/60">
                {isSpanish ? "Bloque" : "Block"}
              </p>
              <h3 className="text-xl font-semibold text-white">{title}</h3>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/60">{isSpanish ? "Asignación" : "Allocation"}</p>
            <p className="text-3xl font-bold" style={{ color: category.color }}>
              {category.percentage}%
            </p>
            <p className="text-xs text-white/50">{formatTokenAmount(category.tokens)} WTX</p>
          </div>
        </div>

        <p className="text-sm text-white/80">{objective}</p>
        <p className="text-xs text-white/60 leading-relaxed">{details}</p>

        <div className="grid gap-3 text-sm text-white/80 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase text-white/50">
              {isSpanish ? "Cliff" : "Cliff"}
            </p>
            <p className="font-semibold text-white">{cliff}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase text-white/50">
              {isSpanish ? "Vesting" : "Vesting"}
            </p>
            <p className="font-semibold text-white">{vesting}</p>
          </div>
        </div>

        {burnMechanism && (
          <div className="rounded-2xl border border-white/5 bg-black/20 p-4 text-xs text-white/60">
            <p className="font-semibold text-white">
              {isSpanish ? "Deflación" : "Deflation"}
            </p>
            <p>{burnMechanism}</p>
          </div>
        )}

        {releaseNotes && (
          <div className="rounded-2xl border border-white/5 bg-black/10 p-4 text-xs text-white/60">
            <p className="font-semibold text-white">
              {isSpanish ? "Notas de liberación" : "Release notes"}
            </p>
            <p>{releaseNotes}</p>
          </div>
        )}

        {category.subAllocations && category.subAllocations.length > 0 && (
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="mb-3 text-xs uppercase text-white/50">
              {isSpanish ? "Subprogramas" : "Sub-programs"}
            </p>
            <div className="space-y-2">
              {category.subAllocations.slice(0, 3).map(sub => (
                <div key={sub.id} className="flex flex-wrap items-center justify-between gap-2 text-xs text-white/70">
                  <span className="font-semibold text-white">
                    {isSpanish ? sub.nameEs : sub.name}
                  </span>
                  <span>
                    {sub.percentage}% · {formatTokenAmount(sub.tokens)} WTX
                  </span>
                </div>
              ))}
              {category.subAllocations.length > 3 && (
                <p className="text-xs text-white/50">
                  +{category.subAllocations.length - 3}{" "}
                  {isSpanish ? "subprogramas adicionales" : "additional sub-programs"}
                </p>
              )}
            </div>
          </div>
        )}

        <button
          onClick={() => onSelect?.(category)}
          className="flex items-center justify-center gap-2 rounded-2xl border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          {isSpanish ? "Ver detalle completo" : "View full detail"}
        </button>
      </div>
    </motion.article>
  );
}
