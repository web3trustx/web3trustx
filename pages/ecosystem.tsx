'use client';

import Head from 'next/head';
import { useLanguage } from '../lib/LanguageContext';
import { motion } from 'framer-motion';

export default function Ecosystem() {
  const { t } = useLanguage();

  // Categoría 1: Confianza y análisis de proyectos
  const trustAnalysisTools = [
    {
      ...t.ecosystem.trustAnalysis.tools.trustxscanner,
      icon: '🔍',
      color: 'from-primary to-accent-blue',
    },
    {
      ...t.ecosystem.trustAnalysis.tools.trustxscore,
      icon: '⭐',
      color: 'from-accent-blue to-accent-purple',
    },
    {
      ...t.ecosystem.trustAnalysis.tools.trustxdex,
      icon: '📊',
      color: 'from-accent-purple to-primary',
    },
  ];

  // Categoría 2: Reputación y responsabilidad de los creadores
  const creatorReputationTools = [
    {
      ...t.ecosystem.creatorReputation.tools.trustxhub,
      icon: '🌐',
      color: 'from-primary to-primary-light',
    },
    {
      ...t.ecosystem.creatorReputation.tools.trustxbadge,
      icon: '🏆',
      color: 'from-accent-blue to-primary',
    },
  ];

  // Categoría 3: Protección, educación y fortalecimiento comunitario
  const communityProtectionTools = [
    {
      ...t.ecosystem.communityProtection.tools.trustxshield,
      icon: '🛡️',
      color: 'from-primary to-accent-blue',
    },
    {
      ...t.ecosystem.communityProtection.tools.trustxrevive,
      icon: '♻️',
      color: 'from-accent-purple to-accent-blue',
    },
    {
      ...t.ecosystem.communityProtection.tools.trustxacademy,
      icon: '📚',
      color: 'from-accent-blue to-primary-light',
    },
    {
      ...t.ecosystem.communityProtection.tools.trustxinfluence,
      icon: '�',
      color: 'from-primary-light to-accent-purple',
    },
  ];

  return (
    <>
      <Head>
        <title>{t.ecosystem.title} - Web3TrustX</title>
        <meta name="description" content={t.ecosystem.subtitle} />
      </Head>

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="section-title mb-6">
              {t.ecosystem.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.ecosystem.subtitle}
            </p>
          </motion.div>

          {/* Categoría 1: Confianza y análisis de proyectos */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              {t.ecosystem.trustAnalysis.title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trustAnalysisTools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-cyber group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center mb-6 text-4xl transform group-hover:scale-110 transition-transform duration-300`}>
                    {tool.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{tool.name}</h3>
                  <p className="text-sm text-primary font-semibold mb-3">{tool.tagline}</p>
                  <p className="text-gray-400 leading-relaxed">{tool.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Categoría 2: Reputación y responsabilidad de los creadores */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              {t.ecosystem.creatorReputation.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {creatorReputationTools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-cyber group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center mb-6 text-4xl transform group-hover:scale-110 transition-transform duration-300`}>
                    {tool.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{tool.name}</h3>
                  <p className="text-sm text-primary font-semibold mb-3">{tool.tagline}</p>
                  <p className="text-gray-400 leading-relaxed">{tool.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Categoría 3: Protección, educación y fortalecimiento comunitario */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              {t.ecosystem.communityProtection.title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {communityProtectionTools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-cyber group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center mb-6 text-4xl transform group-hover:scale-110 transition-transform duration-300`}>
                    {tool.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{tool.name}</h3>
                  <p className="text-sm text-primary font-semibold mb-3">{tool.tagline}</p>
                  <p className="text-gray-400 leading-relaxed">{tool.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
}
