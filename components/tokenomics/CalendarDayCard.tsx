"use client";

import { motion } from "framer-motion";
import { CalendarEvent, getCategoryById } from "../../lib/tokenomicsData";
import { useLanguage } from "../../lib/LanguageContext";
import { useState } from "react";

interface CalendarDayCardProps {
  date: Date;
  events: CalendarEvent[];
  index: number;
  isToday?: boolean;
}

const EVENT_TYPE_LABELS = {
  unlock: { en: "Unlock", es: "Desbloqueo" },
  burn: { en: "Burn", es: "Quema" },
  cliff: { en: "Cliff", es: "Cliff" },
  tge: { en: "TGE", es: "TGE" },
  phase: { en: "Phase", es: "Fase" },
};

export function CalendarDayCard({ date, events, index, isToday }: CalendarDayCardProps) {
  const { language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isSpanish = language === "es";

  const day = date.getDate();
  const month = date.toLocaleDateString(isSpanish ? "es-ES" : "en-US", { month: "short" });
  const year = date.getFullYear();

  // Limitar a 4 eventos por card
  const visibleEvents = events.slice(0, 4);
  const hasMoreEvents = events.length > 4;

  const formatTokenAmount = (amount: number): string => {
    if (amount >= 1_000_000) {
      return `${(amount / 1_000_000).toFixed(2)}M`;
    }
    if (amount >= 1_000) {
      return `${(amount / 1_000).toFixed(2)}K`;
    }
    return amount.toString();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
        onClick={() => setIsModalOpen(true)}
        className={`relative cursor-pointer group rounded-3xl border ${
          isToday
            ? "border-primary/60 bg-gradient-to-br from-primary/10 to-transparent"
            : "border-white/10 bg-gradient-to-br from-white/5 to-transparent"
        } p-6 shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-300`}
      >
        {/* Indicador de "hoy" */}
        {isToday && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-primary text-black">
              {isSpanish ? "HOY" : "TODAY"}
            </span>
          </div>
        )}

        {/* Cabecera estilo calendario */}
        <div className="mb-4 pb-4 border-b border-white/10">
          <div className="flex items-start justify-between">
            {/* Número del día con recuadro */}
            <div className="flex-shrink-0">
              <p className="text-xs uppercase tracking-wide text-white/50 mb-1">{month}</p>
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-white/5 rounded-xl border border-white/20" />
                <p className="relative text-5xl font-bold text-white px-4 py-2">{day}</p>
              </div>
              <p className="text-sm text-white/60 mt-1">{year}</p>
            </div>

            {/* Lista de tipos de eventos */}
            <div className="flex-1 ml-4 space-y-2">
              {visibleEvents.map((event, idx) => {
                const category = getCategoryById(event.categoryId);
                const typeLabel = EVENT_TYPE_LABELS[event.type][isSpanish ? "es" : "en"];
                
                return (
                  <div
                    key={`${event.id}-${idx}`}
                    className="flex items-center gap-2"
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: category?.color || "#6B7280" }}
                    />
                    <span className="text-sm font-medium text-white truncate">
                      {typeLabel}
                    </span>
                  </div>
                );
              })}
              {hasMoreEvents && (
                <p className="text-xs text-white/50 italic">
                  +{events.length - 4} {isSpanish ? "más" : "more"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Preview del primer evento */}
        {visibleEvents.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs text-white/50 line-clamp-2">
              {isSpanish ? visibleEvents[0].titleEs : visibleEvents[0].title}
            </p>
          </div>
        )}

        {/* Indicador de click */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </motion.div>

      {/* Modal con detalles completos */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-3xl border border-white/10 bg-[#050914]/95 p-6 shadow-2xl"
          >
            {/* Cabecera del modal */}
            <div className="flex items-start justify-between mb-6 pb-4 border-b border-white/10">
              <div>
                <p className="text-xs uppercase tracking-wide text-white/50">{month}</p>
                <h2 className="text-4xl font-bold text-white">{day}</h2>
                <p className="text-sm text-white/60">{year}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Lista de eventos completa */}
            <div className="overflow-y-auto max-h-[calc(85vh-200px)] space-y-4">
              {events.map((event, idx) => {
                const category = getCategoryById(event.categoryId);
                const typeLabel = EVENT_TYPE_LABELS[event.type][isSpanish ? "es" : "en"];
                const color = category?.color || "#6B7280";

                return (
                  <div
                    key={`${event.id}-${idx}`}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    {/* Tipo y categoría */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase tracking-wide text-white/50">
                          {typeLabel}
                        </span>
                      </div>
                      <span
                        className="rounded-full px-3 py-1 text-xs font-semibold"
                        style={{ backgroundColor: `${color}22`, color }}
                      >
                        {category ? (isSpanish ? category.nameEs : category.name) : "WTX"}
                      </span>
                    </div>

                    {/* Título del evento */}
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {isSpanish ? event.titleEs : event.title}
                    </h4>

                    {/* Cantidad si existe */}
                    {event.amount && (
                      <div className="flex items-center gap-2 mb-2 text-sm text-white/70">
                        <span>🔓</span>
                        <span className="font-semibold">{formatTokenAmount(event.amount)} WTX</span>
                      </div>
                    )}

                    {/* Descripción */}
                    <p className="text-sm text-white/60">
                      {isSpanish ? event.descriptionEs : event.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Footer del modal */}
            <div className="mt-6 pt-4 border-t border-white/10 text-center">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 rounded-2xl border border-white/20 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                {isSpanish ? "Cerrar" : "Close"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
