"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TokenCategory, formatTokenAmount } from "../../lib/tokenomicsData";
import { useLanguage } from "../../lib/LanguageContext";

interface TokenomicsDetailModalProps {
  category?: TokenCategory;
  isOpen: boolean;
  onClose: () => void;
}

const sectionTitleStyles = "text-sm font-semibold uppercase tracking-wide text-white/60";

export function TokenomicsDetailModal({ category, isOpen, onClose }: TokenomicsDetailModalProps) {
  const { language } = useLanguage();
  const isSpanish = language === "es";
  const content = useMemo(() => {
    if (!category) return null;

    return {
      title: isSpanish ? category.nameEs : category.name,
      objective: isSpanish ? category.objectiveEs : category.objective,
      details: isSpanish ? category.detailsEs : category.details,
      cliff: isSpanish ? category.cliffEs : category.cliff,
      vesting: isSpanish ? category.vestingEs : category.vesting,
      burnMechanism: isSpanish ? category.burnMechanismEs : category.burnMechanism,
      releaseNotes: isSpanish ? category.releaseNotesEs : category.releaseNotes,
      governance: isSpanish ? category.governanceEs : category.governance,
      phases: category.phases?.map(phase => ({
        ...phase,
        name: isSpanish ? phase.nameEs : phase.name,
        duration: isSpanish ? phase.durationEs : phase.duration,
        mechanism: isSpanish ? phase.mechanismEs : phase.mechanism,
        notes: isSpanish ? phase.notesEs : phase.notes,
      })),
      subAllocations: category.subAllocations?.map(sub => ({
        ...sub,
        name: isSpanish ? sub.nameEs : sub.name,
        description: isSpanish ? sub.descriptionEs : sub.description,
        release: isSpanish ? sub.releaseEs : sub.release,
      })),
    };
  }, [category, isSpanish]);

  return (
    <AnimatePresence>
      {isOpen && category && content && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="relative mx-4 h-[85vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#050914]/95 p-6 shadow-2xl"
          >
            <div className="h-full overflow-y-auto pr-2">
              <div className="flex flex-col gap-6">
                <header className="flex flex-col gap-4 border-b border-white/5 pb-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl" style={{ backgroundColor: `${category.color}22` }}>
                      {category.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-white">{content.title}</h2>
                      <p className="text-sm text-white/60">{content.objective}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white/60">{isSpanish ? "Asignación" : "Allocation"}</p>
                    <p className="text-4xl font-bold" style={{ color: category.color }}>
                      {category.percentage}%
                    </p>
                    <p className="text-xs text-white/50">{formatTokenAmount(category.tokens)} WTX</p>
                  </div>
                </header>

                <section className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className={sectionTitleStyles}>{isSpanish ? "Cliff" : "Cliff"}</p>
                    <p className="text-lg text-white">{content.cliff}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className={sectionTitleStyles}>{isSpanish ? "Vesting" : "Vesting"}</p>
                    <p className="text-lg text-white">{content.vesting}</p>
                  </div>
                </section>

                {content.details && (
                  <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className={sectionTitleStyles}>{isSpanish ? "Descripción" : "Description"}</p>
                    <p className="mt-2 text-white/80">{content.details}</p>
                  </section>
                )}

                {content.releaseNotes && (
                  <section className="rounded-3xl border border-white/10 bg-black/30 p-5">
                    <p className={sectionTitleStyles}>{isSpanish ? "Notas de liberación" : "Release notes"}</p>
                    <p className="mt-2 text-white/70">{content.releaseNotes}</p>
                  </section>
                )}

                {content.burnMechanism && (
                  <section className="rounded-3xl border border-white/10 bg-black/20 p-5">
                    <p className={sectionTitleStyles}>{isSpanish ? "Mecanismo de quema" : "Burn mechanism"}</p>
                    <p className="mt-2 text-white/70">{content.burnMechanism}</p>
                  </section>
                )}

                {content.phases && content.phases.length > 0 && (
                  <section>
                    <p className={`${sectionTitleStyles} mb-3`}>
                      {isSpanish ? "Fases oficiales" : "Official phases"}
                    </p>
                    <div className="grid gap-3 md:grid-cols-2">
                      {content.phases.map(phase => (
                        <div key={phase.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <p className="text-sm font-semibold text-white">{phase.name}</p>
                          <p className="text-xs text-white/50">{phase.duration}</p>
                          <p className="mt-2 text-xs text-white/60">{phase.mechanism}</p>
                          {phase.notes && <p className="mt-2 text-xs text-white/40">{phase.notes}</p>}
                          <p className="mt-3 text-xs text-white/50">
                            {phase.percentage}% · {formatTokenAmount(phase.tokens)} WTX
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {content.subAllocations && content.subAllocations.length > 0 && (
                  <section>
                    <p className={`${sectionTitleStyles} mb-3`}>
                      {isSpanish ? "Subprogramas" : "Sub-programs"}
                    </p>
                    <div className="grid gap-3 md:grid-cols-2">
                      {content.subAllocations.map(sub => (
                        <div key={sub.id} className="rounded-2xl border border-white/10 bg-[#0A1220]/70 p-4">
                          <p className="text-sm font-semibold text-white">{sub.name}</p>
                          <p className="text-xs text-white/60">{sub.percentage}% · {formatTokenAmount(sub.tokens)} WTX</p>
                          <p className="mt-2 text-xs text-white/60">{sub.description}</p>
                          <p className="mt-2 text-[11px] text-white/40">{sub.release}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {content.governance && (
                  <section className="rounded-3xl border border-white/10 bg-black/40 p-5">
                    <p className={sectionTitleStyles}>{isSpanish ? "Gobernanza" : "Governance"}</p>
                    <p className="mt-2 text-white/70">{content.governance}</p>
                  </section>
                )}
              </div>

              <div className="mt-6 flex flex-col gap-4 border-t border-white/5 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-white/50">
                  {isSpanish
                    ? "Toda la información es verificable en dashboards on-chain y calendarios públicos."
                    : "All information is verifiable via on-chain dashboards and public calendars."}
                </p>
                <button
                  onClick={onClose}
                  className="rounded-2xl border border-white/20 px-6 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {isSpanish ? "Cerrar" : "Close"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
