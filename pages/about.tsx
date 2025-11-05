'use client';

import Head from 'next/head';
import { useLanguage } from '../lib/LanguageContext';
import { motion } from 'framer-motion';

export default function About() {
  const { t } = useLanguage();

  const values = [
    { title: t.about.values.transparency, icon: '🔍' },
    { title: t.about.values.community, icon: '👥' },
    { title: t.about.values.innovation, icon: '🚀' },
    { title: t.about.values.security, icon: '🛡️' },
  ];

  return (
    <>
      <Head>
        <title>{t.about.title} - Web3TrustX</title>
        <meta name="description" content={t.about.mission.content} />
      </Head>

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-title text-center mb-16"
          >
            {t.about.title}
          </motion.h1>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-cyber"
            >
              <h2 className="text-3xl font-bold text-primary mb-4">{t.about.mission.title}</h2>
              <p className="text-gray-300 text-lg leading-relaxed">{t.about.mission.content}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-cyber"
            >
              <h2 className="text-3xl font-bold text-primary mb-4">{t.about.vision.title}</h2>
              <p className="text-gray-300 text-lg leading-relaxed">{t.about.vision.content}</p>
            </motion.div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center mb-12 text-white"
            >
              {t.about.values.title}
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-cyber text-center"
                >
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-lg font-semibold text-white">{value.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-effect rounded-2xl p-12 border-2 border-primary/30 text-center"
          >
            <blockquote className="text-2xl md:text-3xl font-display italic text-gray-200">
              {t.about.founderQuote}
            </blockquote>
          </motion.div>
        </div>
      </div>
    </>
  );
}
