"use client";

import { useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

export function HorizontalCalendar() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const events = useMemo(() => generateCalendarEvents(), []);
  const isSpanish = language === "es";

  const filteredEvents = events.filter(event => {
    if (selectedCategory === "all") return true;
    return event.categoryId === selectedCategory;
  });

  const categoriesOptions = [
    { value: "all", label: isSpanish ? "Todos" : "All" },
    ...TOKEN_CATEGORIES.map(cat => ({
      value: cat.id,
      label: isSpanish ? cat.nameEs : cat.name,
    })),
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft + (direction === "right" ? scrollAmount : -scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const renderEventCard = (event: CalendarEvent) => {
    const category = getCategoryById(event.categoryId);
    const color = category?.color ?? "#6B7280";
    const typeLabel = EVENT_TYPE_LABELS[event.type][isSpanish ? "es" : "en"];
    const dateFormatter = new Intl.DateTimeFormat(isSpanish ? "es-ES" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return (
      <div
        key={event.id}
        className="flex-shrink-0 w-80 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-4 shadow-xl"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <p className="text-xs uppercase tracking-wide text-white/50">{typeLabel}</p>
            <h4 className="mt-1 text-base font-semibold text-white line-clamp-2">
              {isSpanish ? event.titleEs : event.title}
            </h4>
          </div>
          <span
            className="flex-shrink-0 rounded-full px-2 py-1 text-xs font-semibold"
            style={{ backgroundColor: `${color}22`, color }}
          >
            {category ? (isSpanish ? category.nameEs.slice(0, 8) : category.name.slice(0, 8)) : "WTX"}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/70">
          <div className="flex items-center gap-1">
            <span className="text-sm">📅</span>
            <span>{dateFormatter.format(event.date)}</span>
          </div>
          {event.amount && (
            <div className="flex items-center gap-1">
              <span className="text-sm">🔓</span>
              <span>{formatTokenAmount(event.amount)} WTX</span>
            </div>
          )}
        </div>

        <p className="mt-2 text-xs text-white/60 line-clamp-2">
          {isSpanish ? event.descriptionEs : event.description}
        </p>
      </div>
    );
  };

  return (
    <section className="relative w-full border-b border-white/10 bg-gradient-to-r from-[#03060f] via-[#050914] to-[#03060f] py-4">
      <div className="mx-auto max-w-[1920px] px-4">
        {/* Header with filter */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">
              {isSpanish ? "Calendario on-chain" : "On-chain calendar"}
            </p>
            <h3 className="text-lg font-semibold text-white">
              {isSpanish ? "Próximos eventos" : "Upcoming events"}
            </h3>
          </div>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-white/40"
          >
            {categoriesOptions.map(option => (
              <option key={option.value} value={option.value} className="bg-[#050914]">
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Scrollable container with navigation arrows */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-2 text-white backdrop-blur-sm transition hover:bg-black/80"
            aria-label="Scroll left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Scrollable events */}
          <div
            ref={scrollContainerRef}
            className="hide-scrollbar flex gap-4 overflow-x-auto scroll-smooth px-8"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {filteredEvents.slice(0, 20).map(renderEventCard)}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-2 text-white backdrop-blur-sm transition hover:bg-black/80"
            aria-label="Scroll right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
