"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DayCard } from "./DayCard";
import { CalendarHeader } from "./CalendarHeader";
import { MonthView } from "./MonthView";
import {
  generateCalendarEvents,
  CalendarEvent,
  formatTokenAmount,
  getCategoryById,
  EVENT_TYPE_LABELS,
} from "@/lib/tokenomicsData";
import { useLanguage } from "@/lib/LanguageContext";

export function Calendar() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDayEvents, setSelectedDayEvents] = useState<CalendarEvent[]>([]);
  const [startDate, setStartDate] = useState<Date>(() => {
    // Empezar desde hoy
    return new Date();
  });
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"daily" | "monthly">("daily");

  const events = useMemo(() => generateCalendarEvents(), []);
  const isSpanish = language === "es";

  // Filtrar eventos por categoría
  const filteredEvents = events.filter((event) => {
    if (selectedCategory === "all") return true;
    return event.categoryId === selectedCategory;
  });

  // Generar las 4 fechas a partir de startDate
  const calendarDays = useMemo(() => {
    const days: Date[] = [];
    for (let i = 0; i < 4; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  }, [startDate]);

  // Verificar si una fecha es hoy
  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Obtener eventos para una fecha específica
  const getEventsForDate = (date: Date) => {
    return filteredEvents.filter((event) => {
      return event.date.toDateString() === date.toDateString();
    });
  };

  // Navegación
  const handleNext = () => {
    setStartDate((prev) => {
      const next = new Date(prev);
      next.setDate(prev.getDate() + 1);
      return next;
    });
  };

  const handlePrev = () => {
    setStartDate((prev) => {
      const previous = new Date(prev);
      previous.setDate(prev.getDate() - 1);
      return previous;
    });
  };

  // Modal
  const openModal = (date: Date, dayEvents: CalendarEvent[]) => {
    setSelectedDate(date);
    setSelectedDayEvents(dayEvents);
  };

  const closeModal = () => {
    setSelectedDate(null);
    setSelectedDayEvents([]);
  };

  // Navegación mensual
  const handleMonthChange = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  return (
    <section className="relative w-full border-b border-white/10 bg-gradient-to-r from-[#03060f] via-[#050914] to-[#03060f] py-8">
      <div className="mx-auto max-w-[1920px] px-4">
        {/* Header */}
        <CalendarHeader
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Vista Diaria */}
        {viewMode === "daily" && (
          <div className="relative">
            {/* Botón Anterior */}
            <button
              onClick={handlePrev}
              className="
                absolute left-0 top-1/2 -translate-y-1/2 z-20
                rounded-full border border-white/20 bg-black/60 backdrop-blur-md p-3
                text-white transition-all duration-200
                hover:bg-black/80 hover:border-[#00B5AD]/40 hover:scale-110
                shadow-[0_4px_20px_rgba(0,0,0,0.4)]
                hover:shadow-[0_4px_25px_rgba(0,181,173,0.3)]
              "
              aria-label={isSpanish ? "Día anterior" : "Previous day"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            {/* Contenedor de días con animación de slide */}
            <motion.div
              className="hide-scrollbar flex gap-6 overflow-x-auto scroll-smooth px-12 py-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <AnimatePresence mode="popLayout">
                {calendarDays.map((date, index) => {
                  const dayEvents = getEventsForDate(date);
                  return (
                    <DayCard
                      key={date.toISOString()}
                      date={date}
                      events={dayEvents}
                      isToday={isToday(date)}
                      onClick={() => dayEvents.length > 0 && openModal(date, dayEvents)}
                    />
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* Botón Siguiente */}
            <button
              onClick={handleNext}
              className="
                absolute right-0 top-1/2 -translate-y-1/2 z-20
                rounded-full border border-white/20 bg-black/60 backdrop-blur-md p-3
                text-white transition-all duration-200
                hover:bg-black/80 hover:border-[#00B5AD]/40 hover:scale-110
                shadow-[0_4px_20px_rgba(0,0,0,0.4)]
                hover:shadow-[0_4px_25px_rgba(0,181,173,0.3)]
              "
              aria-label={isSpanish ? "Día siguiente" : "Next day"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Vista Mensual */}
        {viewMode === "monthly" && (
          <MonthView
            currentMonth={currentMonth}
            events={filteredEvents}
            onDayClick={openModal}
            onMonthChange={handleMonthChange}
          />
        )}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Modal con detalles de eventos */}
      <AnimatePresence>
        {selectedDate && selectedDayEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-3xl bg-[#101A2B] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del modal */}
              <div className="sticky top-0 z-10 border-b border-white/10 bg-[#101A2B]/95 backdrop-blur-xl p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-white/60 mb-1">
                      {selectedDate.toLocaleDateString(
                        isSpanish ? "es-ES" : "en-US",
                        { month: "long", year: "numeric" }
                      )}
                    </p>
                    <h3 className="text-4xl font-black text-white">
                      {selectedDate.getDate()}
                    </h3>
                    <p className="text-sm text-[#00B5AD] font-medium mt-1">
                      {selectedDayEvents.length}{" "}
                      {selectedDayEvents.length === 1
                        ? isSpanish
                          ? "evento"
                          : "event"
                        : isSpanish
                        ? "eventos"
                        : "events"}
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="rounded-full p-2 hover:bg-white/10 transition-colors"
                    aria-label="Close"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white/60"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Contenido del modal */}
              <div className="overflow-y-auto max-h-[calc(80vh-140px)] p-6 space-y-4">
                {selectedDayEvents.map((event, index) => {
                  const category = getCategoryById(event.categoryId);
                  const typeLabel =
                    EVENT_TYPE_LABELS[event.type][isSpanish ? "es" : "en"];
                  const categoryName = category
                    ? isSpanish
                      ? category.nameEs
                      : category.name
                    : "WTX";

                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 backdrop-blur-xl hover:bg-white/[0.05] transition-all duration-200"
                    >
                      {/* Tipo de evento */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-medium text-white/60 uppercase tracking-wider">
                          {typeLabel}
                        </span>
                        <span
                          className="rounded-full px-3 py-1 text-xs font-semibold"
                          style={{
                            backgroundColor: `${category?.color || "#6B7280"}20`,
                            borderWidth: "1px",
                            borderColor: `${category?.color || "#6B7280"}40`,
                            color: category?.color || "#6B7280",
                          }}
                        >
                          {categoryName}
                        </span>
                      </div>

                      {/* Título */}
                      <h4 className="text-lg font-bold text-white mb-2">
                        {isSpanish ? event.titleEs : event.title}
                      </h4>

                      {/* Cantidad */}
                      {event.amount && (
                        <p className="text-sm text-[#00B5AD] font-semibold mb-2">
                          🔓 {formatTokenAmount(event.amount)} WTX
                        </p>
                      )}

                      {/* Descripción */}
                      <p className="text-sm text-white/60 leading-relaxed">
                        {isSpanish ? event.descriptionEs : event.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer del modal */}
              <div className="sticky bottom-0 border-t border-white/10 bg-[#101A2B]/95 backdrop-blur-xl p-4">
                <button
                  onClick={closeModal}
                  className="w-full rounded-xl bg-[#00B5AD] hover:bg-[#00B5AD]/90 text-black font-bold py-3 transition-all duration-200 shadow-[0_0_20px_rgba(0,181,173,0.3)]"
                >
                  {isSpanish ? "Cerrar" : "Close"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
