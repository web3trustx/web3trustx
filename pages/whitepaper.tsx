'use client';

import Head from 'next/head';
import { useLanguage } from '../lib/LanguageContext';
import { motion } from 'framer-motion';

export default function Whitepaper() {
  const { t } = useLanguage();

  const sections = [
    {
      title: t.whitepaper.sections.intro.title,
      content: t.whitepaper.sections.intro.content,
      icon: '📄',
    },
    {
      title: t.whitepaper.sections.problem.title,
      content: t.whitepaper.sections.problem.content,
      icon: '⚠️',
    },
    {
      title: t.whitepaper.sections.solution.title,
      content: t.whitepaper.sections.solution.content,
      icon: '💡',
    },
  ];

  return (
    <>
      <Head>
        <title>{t.whitepaper.title} - Web3TrustX</title>
        <meta name="description" content={t.whitepaper.subtitle} />
      </Head>

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-title text-center mb-6"
          >
            {t.whitepaper.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 text-center mb-12"
          >
            {t.whitepaper.subtitle}
          </motion.p>

          {/* Download Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <button className="btn-primary inline-flex items-center gap-3 text-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t.whitepaper.download}
            </button>
            <p className="text-gray-500 text-sm mt-4">{t.whitepaper.comingSoon}</p>
          </motion.div>

          {/* Litepaper Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-cyber"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{section.icon}</div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
                    <p className="text-gray-300 leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 glass-effect rounded-2xl p-8 border-2 border-primary/30 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-4">{t.whitepaper.fullDocumentation.title}</h3>
            <p className="text-gray-300 mb-6">
              {t.whitepaper.fullDocumentation.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-white/5 rounded-lg">
                <div className="text-primary font-bold text-2xl">6</div>
                <div className="text-gray-400 text-sm">{t.whitepaper.fullDocumentation.modules}</div>
              </div>
              <div className="px-6 py-3 bg-white/5 rounded-lg">
                <div className="text-primary font-bold text-2xl">7</div>
                <div className="text-gray-400 text-sm">{t.whitepaper.fullDocumentation.phases}</div>
              </div>
              <div className="px-6 py-3 bg-white/5 rounded-lg">
                <div className="text-primary font-bold text-2xl">5+</div>
                <div className="text-gray-400 text-sm">{t.whitepaper.fullDocumentation.chains}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
