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
      className="group relative w-full max-w-full flex-1 rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6 shadow-2xl backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(16,26,43,0.85) 0%, rgba(16,26,43,0.4) 100%)",
      }}
    >
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-2xl text-xl sm:text-2xl" style={{ backgroundColor: `${category.color}22` }}>
              {category.icon}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs uppercase tracking-wide text-white/60">
                {isSpanish ? "Bloque" : "Block"}
              </p>
              <h3 className="text-lg sm:text-xl font-semibold text-white truncate">{title}</h3>
            </div>
          </div>
          <div className="text-left sm:text-right flex-shrink-0">
            <p className="text-xs sm:text-sm text-white/60">{isSpanish ? "Asignación" : "Allocation"}</p>
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: category.color }}>
              {category.percentage}%
            </p>
            <p className="text-[10px] sm:text-xs text-white/50">{formatTokenAmount(category.tokens)} WTX</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-white/80 line-clamp-3">{objective}</p>
        <p className="text-[11px] sm:text-xs text-white/60 leading-relaxed line-clamp-4">{details}</p>

        <div className="grid gap-2 sm:gap-3 text-sm text-white/80 grid-cols-2">
          <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-2.5 sm:p-4">
            <p className="text-[10px] sm:text-xs uppercase text-white/50">
              {isSpanish ? "Cliff" : "Cliff"}
            </p>
            <p className="font-semibold text-white text-xs sm:text-sm truncate">{cliff}</p>
          </div>
          <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-2.5 sm:p-4">
            <p className="text-[10px] sm:text-xs uppercase text-white/50">
              {isSpanish ? "Vesting" : "Vesting"}
            </p>
            <p className="font-semibold text-white text-xs sm:text-sm truncate">{vesting}</p>
          </div>
        </div>

        {burnMechanism && (
          <div className="rounded-xl sm:rounded-2xl border border-white/5 bg-black/20 p-2.5 sm:p-4 text-[11px] sm:text-xs text-white/60">
            <p className="font-semibold text-white text-xs sm:text-sm">
              {isSpanish ? "Deflación" : "Deflation"}
            </p>
            <p className="line-clamp-2">{burnMechanism}</p>
          </div>
        )}

        {releaseNotes && (
          <div className="rounded-xl sm:rounded-2xl border border-white/5 bg-black/10 p-2.5 sm:p-4 text-[11px] sm:text-xs text-white/60">
            <p className="font-semibold text-white text-xs sm:text-sm">
              {isSpanish ? "Notas de liberación" : "Release notes"}
            </p>
            <p className="line-clamp-2">{releaseNotes}</p>
          </div>
        )}

        {category.subAllocations && category.subAllocations.length > 0 && (
          <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-black/30 p-2.5 sm:p-4">
            <p className="mb-2 sm:mb-3 text-[10px] sm:text-xs uppercase text-white/50">
              {isSpanish ? "Subprogramas" : "Sub-programs"}
            </p>
            <div className="space-y-1.5 sm:space-y-2">
              {category.subAllocations.slice(0, 3).map(sub => (
                <div key={sub.id} className="flex flex-wrap items-center justify-between gap-1 sm:gap-2 text-[10px] sm:text-xs text-white/70">
                  <span className="font-semibold text-white truncate max-w-[50%]">
                    {isSpanish ? sub.nameEs : sub.name}
                  </span>
                  <span className="text-white/60">
                    {sub.percentage}% · {formatTokenAmount(sub.tokens)} WTX
                  </span>
                </div>
              ))}
              {category.subAllocations.length > 3 && (
                <p className="text-[10px] sm:text-xs text-white/50">
                  +{category.subAllocations.length - 3}{" "}
                  {isSpanish ? "subprogramas adicionales" : "additional sub-programs"}
                </p>
              )}
            </div>
          </div>
        )}

        <button
          onClick={() => onSelect?.(category)}
          className="flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl border border-white/20 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white transition hover:bg-white/10"
        >
          {isSpanish ? "Ver detalle completo" : "View full detail"}
        </button>
      </div>
    </motion.article>
  );
}
