import React from "react";
import { motion } from "framer-motion";
import { EventPill } from "./EventPill";
import { CalendarEvent } from "@/lib/tokenomicsData";
import { getCategoryById, EVENT_TYPE_LABELS } from "@/lib/tokenomicsData";
import { useLanguage } from "@/lib/LanguageContext";

interface DayCardProps {
  date: Date;
  events: CalendarEvent[];
  isToday: boolean;
  onClick: () => void;
}

const CATEGORY_COLORS: { [key: string]: string } = {
  ecosystem: "#00B5AD",
  community: "#58E6C8",
  team: "#E6A15D",
  marketing: "#C97FFF",
  seed: "#4DAAFF",
  presale: "#4DAAFF",
  liquidity: "#66CCFF",
  burn: "#FF6B6B",
  treasury: "#C97FFF",
  advisors: "#E6A15D",
};

export function DayCard({ date, events, isToday, onClick }: DayCardProps) {
  const { language } = useLanguage();
  const isSpanish = language === "es";

  const day = date.getDate();
  const month = date
    .toLocaleDateString(isSpanish ? "es-ES" : "en-US", { month: "short" })
    .toUpperCase();
  const year = date.getFullYear();

  const visibleEvents = events.slice(0, 3);
  const hasMoreEvents = events.length > 3;

  const getCategoryColor = (categoryId: string): string => {
    const category = getCategoryById(categoryId);
    return category?.color || CATEGORY_COLORS[categoryId] || "#6B7280";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -2,
        scale: 1.02,
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onClick={onClick}
      className={`
        group relative flex-shrink-0 w-80 h-auto min-h-[280px]
        rounded-2xl cursor-pointer
        backdrop-blur-xl
        transition-all duration-300
        ${
          isToday
            ? "bg-[#00B5AD]/[0.08] border border-[#00B5AD]/40 shadow-[0_0_20px_rgba(0,181,173,0.15)]"
            : "bg-white/[0.03] border border-white/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
        }
        hover:shadow-[0_8px_30px_rgba(0,181,173,0.2)]
        hover:border-white/[0.12]
      `}
    >
      {/* Badge de eventos múltiples */}
      {events.length > 1 && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00B5AD]/20 border border-[#00B5AD]/30">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00B5AD] animate-pulse" />
          <span className="text-[10px] font-bold text-[#00B5AD]">
            {events.length}
          </span>
        </div>
      )}

      {/* Badge "HOY" */}
      {isToday && (
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#00B5AD] text-black shadow-[0_0_15px_rgba(0,181,173,0.4)]">
            {isSpanish ? "HOY" : "TODAY"}
          </span>
        </div>
      )}

      {/* Contenido principal */}
      <div className="p-6 flex flex-col h-full">
        {/* Header: Mes y Año */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs font-semibold tracking-wider text-white/50 mb-1">
              {month}
            </p>
          </div>
          <p className="text-xs font-medium text-white/40">{year}</p>
        </div>

        {/* Número del día */}
        <div className="mb-6">
          <div className="relative inline-block">
            {/* Glow effect */}
            <div
              className={`absolute inset-0 rounded-2xl blur-xl ${
                isToday ? "bg-[#00B5AD]/20" : "bg-white/5"
              }`}
            />
            {/* Background */}
            <div className="absolute inset-0 bg-white/[0.04] rounded-2xl border border-white/10" />
            {/* Número */}
            <p
              className={`relative text-7xl font-black px-5 py-3 ${
                isToday
                  ? "text-transparent bg-clip-text bg-gradient-to-br from-[#00B5AD] to-[#58E6C8]"
                  : "text-white"
              }`}
            >
              {day}
            </p>
          </div>
        </div>

        {/* Lista de eventos */}
        {events.length > 0 ? (
          <div className="flex-1 flex flex-col gap-3">
            {visibleEvents.map((event, index) => {
              const category = getCategoryById(event.categoryId);
              const typeLabel =
                EVENT_TYPE_LABELS[event.type][isSpanish ? "es" : "en"];
              const categoryName = category
                ? isSpanish
                  ? category.nameEs
                  : category.name
                : "WTX";
              const color = getCategoryColor(event.categoryId);

              return (
                <div key={index} className="flex flex-col gap-1">
                  <EventPill
                    type={typeLabel}
                    category={categoryName}
                    color={color}
                    label={categoryName}
                  />
                  {event.title && (
                    <p className="text-xs text-white/50 pl-1 truncate">
                      {event.title}
                    </p>
                  )}
                </div>
              );
            })}

            {/* Indicador de más eventos */}
            {hasMoreEvents && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-auto pt-2 border-t border-white/5"
              >
                <span className="text-xs text-[#00B5AD]/70 font-medium">
                  +{events.length - 3} {isSpanish ? "más eventos" : "more events"}
                </span>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm text-white/30 italic">
              {isSpanish ? "Sin eventos" : "No events"}
            </p>
          </div>
        )}

        {/* Hover indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00B5AD]/0 to-transparent group-hover:via-[#00B5AD]/50 transition-all duration-300 rounded-b-2xl" />
      </div>
    </motion.div>
  );
}
