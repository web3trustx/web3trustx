"use client";

import { motion } from "framer-motion";
import { TOKENOMICS_MILESTONES } from "../../lib/tokenomicsData";
import { useLanguage } from "../../lib/LanguageContext";

export function UnlockTimeline() {
  const { language } = useLanguage();
  const isSpanish = language === "es";

  const formatter = new Intl.DateTimeFormat(isSpanish ? "es-ES" : "en-US", {
    year: "numeric",
    month: "short",
  });

  return (
    <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#06101a] to-[#101A2B] p-6 shadow-2xl">
      <div className="flex flex-col gap-2 pb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">
          {isSpanish ? "Hitos del token" : "Token milestones"}
        </p>
        <h3 className="text-2xl font-semibold text-white">
          {isSpanish ? "Cronología de confianza" : "Trust timeline"}
        </h3>
        <p className="text-sm text-white/60">
          {isSpanish
            ? "Momentos auditables que marcan la evolución del supply, la liquidez y las fases estratégicas."
            : "Auditable milestones marking supply evolution, liquidity commitments and strategic phases."}
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-transparent via-white/30 to-transparent lg:block" />
        <div className="space-y-10">
          {TOKENOMICS_MILESTONES.map((milestone, index) => {
            const side = index % 2 === 0 ? "left" : "right";
            const content = isSpanish ? milestone.descriptionEs : milestone.description;
            const title = isSpanish ? milestone.titleEs : milestone.title;

            return (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className={`relative grid gap-4 lg:grid-cols-2 ${side === "left" ? "lg:text-right" : ""}`}
              >
                {side === "left" && (
                  <div className="lg:pr-8">
                    <p className="text-xs uppercase tracking-wide text-white/50">{milestone.tag}</p>
                    <h4 className="text-xl font-semibold text-white">{title}</h4>
                    <p className="text-sm text-white/60">{content}</p>
                  </div>
                )}

                <div className="flex items-center gap-4 lg:justify-center">
                  <span className="text-sm font-semibold text-white/50">
                    {formatter.format(milestone.date)}
                  </span>
                  <div className="h-12 w-12 rounded-full border border-white/20 bg-black/60 text-center text-sm font-semibold text-white flex items-center justify-center">
                    {milestone.tag}
                  </div>
                </div>

                {side === "right" && (
                  <div className="lg:pl-8">
                    <p className="text-xs uppercase tracking-wide text-white/50">{milestone.tag}</p>
                    <h4 className="text-xl font-semibold text-white">{title}</h4>
                    <p className="text-sm text-white/60">{content}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
