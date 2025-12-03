"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  generateCalendarEvents,
  TOKEN_CATEGORIES,
  formatTokenAmount,
  getCategoryById,
  CalendarEvent,
} from "../../lib/tokenomicsData";
import { useLanguage } from "../../lib/LanguageContext";

const EVENT_TYPE_LABELS = {
  unlock: { en: "Unlock", es: "Desbloqueo" },
  burn: { en: "Burn", es: "Quema" },
  cliff: { en: "Cliff", es: "Cliff" },
  tge: { en: "TGE", es: "TGE" },
  phase: { en: "Phase", es: "Fase" },
};

type CalendarView = "upcoming" | "full";

export function UnlockCalendar() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [view, setView] = useState<CalendarView>("upcoming");

  const events = useMemo(() => generateCalendarEvents(), []);
  const isSpanish = language === "es";

  const filteredEvents = events.filter(event => {
    if (selectedCategory === "all") return true;
    return event.categoryId === selectedCategory;
  });

  const eventsToShow = view === "upcoming" ? filteredEvents.slice(0, 12) : filteredEvents;

  const categoriesOptions = [
    { value: "all", label: isSpanish ? "Todos" : "All" },
    ...TOKEN_CATEGORIES.map(cat => ({
      value: cat.id,
      label: isSpanish ? cat.nameEs : cat.name,
    })),
  ];

  const renderEventCard = (event: CalendarEvent, index: number) => {
    const category = getCategoryById(event.categoryId);
    const color = category?.color ?? "#6B7280";
    const typeLabel = EVENT_TYPE_LABELS[event.type][isSpanish ? "es" : "en"];
    const dateFormatter = new Intl.DateTimeFormat(isSpanish ? "es-ES" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return (
      <motion.li
        key={event.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
        className="group relative rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent p-4 shadow-xl"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-white/50">{typeLabel}</p>
            <h4 className="text-lg font-semibold text-white">
              {isSpanish ? event.titleEs : event.title}
            </h4>
          </div>
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: `${color}22`, color }}
          >
            {category ? (isSpanish ? category.nameEs : category.name) : "WTX"}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/70">
          <div className="flex items-center gap-2">
            <span className="text-base">📅</span>
            <span>{dateFormatter.format(event.date)}</span>
          </div>
          {event.amount && (
            <div className="flex items-center gap-2">
              <span className="text-base">🔓</span>
              <span>{formatTokenAmount(event.amount)} WTX</span>
            </div>
          )}
        </div>

        <p className="mt-3 text-sm text-white/60">
          {isSpanish ? event.descriptionEs : event.description}
        </p>
      </motion.li>
    );
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-[#050914]/80 p-6 shadow-2xl">
      <div className="flex flex-col gap-4 border-b border-white/5 pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">
            {isSpanish ? "Calendario on-chain" : "On-chain calendar"}
          </p>
          <h3 className="text-2xl font-semibold text-white">
            {isSpanish ? "Desbloqueos y eventos clave" : "Unlocks & key events"}
          </h3>
          <p className="text-sm text-white/60">
            {isSpanish
              ? "Seguimiento en tiempo real de cliffs, vestings, quemas y mantenimiento de liquidez."
              : "Real-time tracking for cliffs, vestings, burns and liquidity commitments."}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white focus:border-white/40"
          >
            {categoriesOptions.map(option => (
              <option key={option.value} value={option.value} className="bg-[#050914]">
                {option.label}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 p-1">
            {(["upcoming", "full"] as CalendarView[]).map(mode => (
              <button
                key={mode}
                onClick={() => setView(mode)}
                className={`rounded-2xl px-3 py-1 text-xs font-semibold transition ${
                  view === mode ? "bg-white text-black" : "text-white/60"
                }`}
              >
                {mode === "upcoming"
                  ? isSpanish ? "Próximos" : "Upcoming"
                  : isSpanish ? "Completo" : "Full"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ul className="mt-6 grid gap-3 lg:grid-cols-2">
        {eventsToShow.map(renderEventCard)}
      </ul>

      {view === "upcoming" && filteredEvents.length > 12 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setView("full")}
            className="rounded-2xl border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            {isSpanish ? "Ver calendario completo" : "See full calendar"}
          </button>
        </div>
      )}
    </section>
  );
}
