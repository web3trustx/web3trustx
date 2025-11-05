'use client';

import Head from 'next/head';
import { useLanguage } from '../lib/LanguageContext';
import { motion } from 'framer-motion';

export default function Ecosystem() {
  const { t } = useLanguage();

  const modules = [
    {
      name: 'TrustHubX',
      description: t.ecosystem.modules.trusthubx.description,
      icon: '🌐',
      color: 'from-primary to-accent-blue',
    },
    {
      name: 'TrustScanner',
      description: t.ecosystem.modules.trustscanner.description,
      icon: '🔍',
      color: 'from-accent-blue to-accent-purple',
    },
    {
      name: 'TrustScore',
      description: t.ecosystem.modules.trustscore.description,
      icon: '⭐',
      color: 'from-accent-purple to-primary',
    },
    {
      name: 'TrustShield',
      description: t.ecosystem.modules.trustshield.description,
      icon: '🛡️',
      color: 'from-primary to-primary-light',
    },
    {
      name: 'TrustAcademy',
      description: t.ecosystem.modules.trustacademy.description,
      icon: '📚',
      color: 'from-accent-blue to-primary',
    },
    {
      name: 'TrustDAO',
      description: t.ecosystem.modules.trustdao.description,
      icon: '🗳️',
      color: 'from-accent-purple to-accent-blue',
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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-title text-center mb-6"
          >
            {t.ecosystem.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto"
          >
            {t.ecosystem.subtitle}
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <motion.div
                key={module.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-cyber group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center mb-6 text-4xl transform group-hover:scale-110 transition-transform duration-300`}>
                  {module.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{module.name}</h3>
                <p className="text-gray-400 leading-relaxed">{module.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
