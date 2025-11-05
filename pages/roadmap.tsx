'use client';

import Head from 'next/head';
import { useLanguage } from '../lib/LanguageContext';
import { motion } from 'framer-motion';

export default function Roadmap() {
  const { t } = useLanguage();

  const phases = [
    {
      phase: 0,
      ...t.roadmap.phases.phase0,
      status: 'in-progress',
    },
    {
      phase: 1,
      ...t.roadmap.phases.phase1,
      status: 'upcoming',
    },
    {
      phase: 2,
      ...t.roadmap.phases.phase2,
      status: 'upcoming',
    },
    {
      phase: 3,
      ...t.roadmap.phases.phase3,
      status: 'upcoming',
    },
    {
      phase: 4,
      ...t.roadmap.phases.phase4,
      status: 'upcoming',
    },
    {
      phase: 5,
      ...t.roadmap.phases.phase5,
      status: 'upcoming',
    },
    {
      phase: 6,
      ...t.roadmap.phases.phase6,
      status: 'future',
    },
  ];

  return (
    <>
      <Head>
        <title>{t.roadmap.title} - Web3TrustX</title>
        <meta name="description" content={t.roadmap.subtitle} />
      </Head>

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-title text-center mb-6"
          >
            {t.roadmap.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 text-center mb-16"
          >
            {t.roadmap.subtitle}
          </motion.p>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent-blue to-primary-light transform md:-translate-x-1/2" />

            {/* Phase Cards */}
            <div className="space-y-12">
              {phases.map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary transform md:-translate-x-1/2 border-4 border-dark z-10">
                    {phase.status === 'in-progress' && (
                      <div className="absolute inset-0 rounded-full bg-primary animate-ping" />
                    )}
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                    <div className={`card-cyber ${phase.status === 'in-progress' ? 'border-primary/50' : ''}`}>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-primary font-bold text-lg">
                          Phase {phase.phase}
                        </span>
                        {phase.status === 'in-progress' && (
                          <span className="px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full">
                            En Progreso
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{phase.title}</h3>
                      <ul className="space-y-2">
                        {phase.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-400">
                            <span className="text-primary mt-1">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
