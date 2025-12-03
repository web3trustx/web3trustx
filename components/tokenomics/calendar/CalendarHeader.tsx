import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { TOKEN_CATEGORIES } from "@/lib/tokenomicsData";

interface CalendarHeaderProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  viewMode?: "daily" | "monthly";
  onViewModeChange?: (mode: "daily" | "monthly") => void;
}

export function CalendarHeader({
  selectedCategory,
  onCategoryChange,
  viewMode = "daily",
  onViewModeChange,
}: CalendarHeaderProps) {
  const { language } = useLanguage();
  const isSpanish = language === "es";

  const categoriesOptions = [
    { value: "all", label: isSpanish ? "Todos" : "All" },
    ...TOKEN_CATEGORIES.map((cat) => ({
      value: cat.id,
      label: isSpanish ? cat.nameEs : cat.name,
    })),
  ];

  return (
    <div className="mb-6 space-y-4">
      {/* Título y descripción */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-1 tracking-tight">
          {isSpanish ? "Calendario On-Chain" : "On-Chain Calendar"}
        </h2>
        <p className="text-sm text-white/50">
          {isSpanish
            ? "Todos los desbloqueos, vesting y quemas del tokenomics · Totalmente transparente on-chain"
            : "All Tokenomics unlocks, vesting & burns · Fully transparent on-chain"}
        </p>
      </div>

      {/* Filtros y vista */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Selector de categoría */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-medium text-white/60 uppercase tracking-wider">
            {isSpanish ? "Filtrar por" : "Filter by"}
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="
              rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl
              px-4 py-2 text-sm text-white font-medium
              focus:border-[#00B5AD]/40 focus:outline-none focus:ring-2 focus:ring-[#00B5AD]/20
              transition-all duration-200
              hover:bg-white/[0.05]
            "
          >
            {categoriesOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-[#101A2B] text-white"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Selector de vista (Daily/Monthly) */}
        {onViewModeChange && (
          <div className="flex items-center gap-2 p-1 rounded-xl bg-white/[0.03] border border-white/10">
            <button
              onClick={() => onViewModeChange("daily")}
              className={`
                px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200
                ${
                  viewMode === "daily"
                    ? "bg-[#00B5AD] text-black shadow-[0_0_15px_rgba(0,181,173,0.3)]"
                    : "text-white/60 hover:text-white/80"
                }
              `}
            >
              {isSpanish ? "Diario" : "Daily"}
            </button>
            <button
              onClick={() => onViewModeChange("monthly")}
              className={`
                px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200
                ${
                  viewMode === "monthly"
                    ? "bg-[#00B5AD] text-black shadow-[0_0_15px_rgba(0,181,173,0.3)]"
                    : "text-white/60 hover:text-white/80"
                }
              `}
            >
              {isSpanish ? "Mensual" : "Monthly"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
