"use client";

import React from "react";
import { motion } from "framer-motion";
import { CalendarEvent, getCategoryById, EVENT_TYPE_LABELS } from "@/lib/tokenomicsData";
import { useLanguage } from "@/lib/LanguageContext";

interface MonthViewProps {
  currentMonth: Date;
  events: CalendarEvent[];
  onDayClick: (date: Date, events: CalendarEvent[]) => void;
  onMonthChange: (direction: "prev" | "next") => void;
}

export function MonthView({ currentMonth, events, onDayClick, onMonthChange }: MonthViewProps) {
  const { language } = useLanguage();
  const isSpanish = language === "es";

  // Días de la semana
  const weekDays = isSpanish
    ? ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
    : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Obtener el primer día del mes
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  
  // Obtener el último día del mes
  const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  
  // Día de la semana del primer día (0 = Domingo, ajustamos para Lunes = 0)
  let startDay = firstDayOfMonth.getDay() - 1;
  if (startDay < 0) startDay = 6;

  // Generar array de días del mes
  const daysInMonth: (Date | null)[] = [];
  
  // Añadir días vacíos al principio
  for (let i = 0; i < startDay; i++) {
    daysInMonth.push(null);
  }
  
  // Añadir días del mes
  for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
    daysInMonth.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
  }

  // Verificar si una fecha es hoy
  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Obtener eventos para una fecha específica
  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    return events.filter((event) => event.date.toDateString() === date.toDateString());
  };

  // Nombre del mes
  const monthName = currentMonth.toLocaleDateString(isSpanish ? "es-ES" : "en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full">
      {/* Header del mes con navegación */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onMonthChange("prev")}
          className="rounded-full border border-white/20 bg-black/60 backdrop-blur-md p-2 text-white transition-all duration-200 hover:bg-black/80 hover:border-[#00B5AD]/40"
          aria-label={isSpanish ? "Mes anterior" : "Previous month"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        
        <h3 className="text-xl font-bold text-white capitalize">{monthName}</h3>
        
        <button
          onClick={() => onMonthChange("next")}
          className="rounded-full border border-white/20 bg-black/60 backdrop-blur-md p-2 text-white transition-all duration-200 hover:bg-black/80 hover:border-[#00B5AD]/40"
          aria-label={isSpanish ? "Mes siguiente" : "Next month"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Grid del calendario */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden">
        {/* Días de la semana */}
        <div className="grid grid-cols-7 border-b border-white/10">
          {weekDays.map((day) => (
            <div key={day} className="p-3 text-center text-xs font-semibold text-white/50 uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>

        {/* Días del mes */}
        <div className="grid grid-cols-7">
          {daysInMonth.map((date, index) => {
            const dayEvents = getEventsForDate(date);
            const hasEvents = dayEvents.length > 0;
            const isTodayDate = isToday(date);

            return (
              <motion.div
                key={index}
                whileHover={date ? { scale: 1.02 } : {}}
                onClick={() => date && hasEvents && onDayClick(date, dayEvents)}
                className={`
                  relative min-h-[100px] p-2 border-b border-r border-white/5
                  ${date ? "cursor-pointer hover:bg-white/[0.03]" : "bg-white/[0.01]"}
                  ${isTodayDate ? "bg-[#00B5AD]/10" : ""}
                  transition-all duration-200
                `}
              >
                {date && (
                  <>
                    {/* Número del día */}
                    <div className={`
                      text-sm font-semibold mb-2
                      ${isTodayDate ? "text-[#00B5AD]" : "text-white/70"}
                    `}>
                      {date.getDate()}
                      {isTodayDate && (
                        <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-[#00B5AD] text-black font-bold">
                          {isSpanish ? "HOY" : "TODAY"}
                        </span>
                      )}
                    </div>

                    {/* Eventos del día */}
                    <div className="space-y-1">
                      {dayEvents.slice(0, 3).map((event, idx) => {
                        const category = getCategoryById(event.categoryId);
                        const typeLabel = EVENT_TYPE_LABELS[event.type][isSpanish ? "es" : "en"];
                        
                        return (
                          <div
                            key={event.id}
                            className="text-[10px] px-1.5 py-0.5 rounded truncate"
                            style={{
                              backgroundColor: `${category?.color || "#6B7280"}20`,
                              color: category?.color || "#6B7280",
                            }}
                          >
                            {typeLabel}
                          </div>
                        );
                      })}
                      {dayEvents.length > 3 && (
                        <div className="text-[10px] text-white/40">
                          +{dayEvents.length - 3} {isSpanish ? "más" : "more"}
                        </div>
                      )}
                    </div>

                    {/* Indicador de eventos */}
                    {hasEvents && (
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#00B5AD] animate-pulse" />
                    )}
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Leyenda de colores */}
      <div className="mt-4 flex flex-wrap gap-3 justify-center">
        {[
          { label: isSpanish ? "Desbloqueo" : "Unlock", color: "#00B5AD" },
          { label: isSpanish ? "Quema" : "Burn", color: "#FF6B6B" },
          { label: "Cliff", color: "#4DAAFF" },
          { label: "TGE", color: "#C97FFF" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5 text-xs text-white/60">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
