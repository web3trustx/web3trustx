'use client';

import Head from 'next/head';
import { useLanguage } from '../lib/LanguageContext';
import { motion } from 'framer-motion';

export default function Tokenomics() {
  const { t } = useLanguage();

  return (
    <>
      <Head>
        <title>{t.tokenomics.title} - Web3TrustX</title>
        <meta name="description" content={t.tokenomics.message} />
      </Head>

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="section-title mb-8">{t.tokenomics.title}</h1>
            
            <div className="glass-effect rounded-2xl p-12 border-2 border-primary/30 relative overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 opacity-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-primary rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-accent-blue rounded-full"
                />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-8xl mb-8"
                >
                  🚧
                </motion.div>
                
                <h2 className="text-4xl font-bold text-primary mb-6">
                  {t.tokenomics.placeholder}
                </h2>
                
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  {t.tokenomics.message}
                </p>
                
                <div className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-accent-blue rounded-full text-white font-semibold text-lg">
                  {t.tokenomics.comingSoon}
                </div>

                {/* Info Cards */}
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                  {['💎', '🔒', '📊'].map((icon, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="bg-white/5 rounded-lg p-6"
                    >
                      <div className="text-4xl mb-3">{icon}</div>
                      <p className="text-gray-400 text-sm">
                        {index === 0 && 'Token Utility'}
                        {index === 1 && 'Vesting & Security'}
                        {index === 2 && 'Distribution Model'}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
