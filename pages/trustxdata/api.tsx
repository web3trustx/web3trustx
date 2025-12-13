'use client';

import Head from 'next/head';
import { useLanguage } from '../../lib/LanguageContext';
import { motion } from 'framer-motion';
import APIDocumentation from '../../components/APIDocumentation';

export default function TrustXDataAPI() {
  const { t } = useLanguage();

  return (
    <>
      <Head>
        <title>TrustXData API - Web3TrustX</title>
        <meta name="description" content="Access verified blockchain data, contract analysis, and real-time trust metrics through our developer API." />
      </Head>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6">
              <span className="text-gradient">{t.trustxdataApi.hero.title}</span>
            </h1>
            <p className="text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
              {t.trustxdataApi.hero.subtitle}
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              {t.trustxdataApi.hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://portal.web3trustx.com/" className="btn-primary">
                {t.trustxdataApi.hero.ctaPrimary}
              </a>
              <a href="#documentation" className="btn-secondary">
                {t.trustxdataApi.hero.ctaSecondary}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Documentation Section */}
      <section id="documentation" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <APIDocumentation />
          </motion.div>
        </div>
      </section>

      {/* Authentication & Limits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              {t.trustxdataApi.auth.title}
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              {t.trustxdataApi.auth.subtitle}
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* API Key */}
              <div className="card-cyber p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  {t.trustxdataApi.auth.apiKey.title}
                </h3>
                <p className="text-gray-400 mb-4">
                  {t.trustxdataApi.auth.apiKey.description}
                </p>
                <div className="bg-dark-lighter p-4 rounded-lg">
                  <code className="text-primary text-sm">
                    {t.trustxdataApi.auth.apiKey.example}
                  </code>
                </div>
              </div>

              {/* Response Headers */}
              <div className="card-cyber p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  {t.trustxdataApi.auth.headers.title}
                </h3>
                <div className="space-y-3">
                  <div>
                    <code className="text-primary text-sm">{t.trustxdataApi.auth.headers.limit}</code>
                    <p className="text-gray-400 text-sm mt-1">{t.trustxdataApi.auth.headers.limitDesc}</p>
                  </div>
                  <div>
                    <code className="text-primary text-sm">{t.trustxdataApi.auth.headers.remaining}</code>
                    <p className="text-gray-400 text-sm mt-1">{t.trustxdataApi.auth.headers.remainingDesc}</p>
                  </div>
                  <div>
                    <code className="text-primary text-sm">{t.trustxdataApi.auth.headers.reset}</code>
                    <p className="text-gray-400 text-sm mt-1">{t.trustxdataApi.auth.headers.resetDesc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rate Limits */}
            <div className="card-cyber p-8">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">
                {t.trustxdataApi.auth.rateLimits.title}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/5 p-6 rounded-lg text-center">
                  <p className="text-gray-400 mb-2">{t.trustxdataApi.auth.rateLimits.demo}</p>
                  <p className="text-2xl font-bold text-white">{t.trustxdataApi.auth.rateLimits.demoLimit}</p>
                </div>
                <div className="bg-white/5 p-6 rounded-lg text-center">
                  <p className="text-gray-400 mb-2">{t.trustxdataApi.auth.rateLimits.free}</p>
                  <p className="text-2xl font-bold text-primary">{t.trustxdataApi.auth.rateLimits.freeLimit}</p>
                </div>
                <div className="bg-white/5 p-6 rounded-lg text-center">
                  <p className="text-gray-400 mb-2">{t.trustxdataApi.auth.rateLimits.pro}</p>
                  <p className="text-2xl font-bold text-primary">{t.trustxdataApi.auth.rateLimits.proLimit}</p>
                </div>
                <div className="bg-white/5 p-6 rounded-lg text-center">
                  <p className="text-gray-400 mb-2">{t.trustxdataApi.auth.rateLimits.enterprise}</p>
                  <p className="text-2xl font-bold text-primary">{t.trustxdataApi.auth.rateLimits.enterpriseLimit}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Security & Compliance Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              {t.trustxdataApi.security.title}
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              {t.trustxdataApi.security.subtitle}
            </p>

            {/* Compliance Badges */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">
                {t.trustxdataApi.security.compliance.title}
              </h3>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="card-cyber p-6 text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {t.trustxdataApi.security.compliance.gdpr}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {t.trustxdataApi.security.compliance.gdprDesc}
                  </p>
                </div>

                <div className="card-cyber p-6 text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {t.trustxdataApi.security.compliance.ccpa}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {t.trustxdataApi.security.compliance.ccpaDesc}
                  </p>
                </div>

                <div className="card-cyber p-6 text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {t.trustxdataApi.security.compliance.soc2}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {t.trustxdataApi.security.compliance.soc2Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Security Resources */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="card-cyber p-6">
                <h4 className="text-lg font-semibold text-white mb-2">
                  {t.trustxdataApi.security.resources.whitepaper}
                </h4>
                <p className="text-gray-400 mb-4">
                  {t.trustxdataApi.security.resources.whitepaperDesc}
                </p>
                <button className="btn-secondary">
                  {t.trustxdataApi.security.resources.download}
                </button>
              </div>

              <div className="card-cyber p-6">
                <h4 className="text-lg font-semibold text-white mb-2">
                  {t.trustxdataApi.security.resources.audit}
                </h4>
                <p className="text-gray-400 mb-4">
                  {t.trustxdataApi.security.resources.auditDesc}
                </p>
                <button className="btn-secondary">
                  {t.trustxdataApi.security.resources.download}
                  <span className="text-xs ml-2">
                    ({t.trustxdataApi.security.resources.requiresAuth})
                  </span>
                </button>
              </div>
            </div>

            {/* Vulnerability Disclosure */}
            <div className="card-cyber p-8 text-center">
              <h3 className="text-xl font-semibold text-white mb-4">
                {t.trustxdataApi.security.vulnerability.title}
              </h3>
              <p className="text-gray-400 mb-4">
                {t.trustxdataApi.security.vulnerability.description}
              </p>
              <a href="mailto:security@web3trustx.com" className="text-primary hover:underline font-mono">
                {t.trustxdataApi.security.vulnerability.email}
              </a>
              <p className="text-sm text-gray-500 mt-2">
                {t.trustxdataApi.security.vulnerability.pgp}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              {t.trustxdataApi.faq.title}
            </h2>

            <div className="space-y-4">
              {[
                { q: t.trustxdataApi.faq.q1, a: t.trustxdataApi.faq.a1 },
                { q: t.trustxdataApi.faq.q2, a: t.trustxdataApi.faq.a2 },
                { q: t.trustxdataApi.faq.q3, a: t.trustxdataApi.faq.a3 },
                { q: t.trustxdataApi.faq.q4, a: t.trustxdataApi.faq.a4 },
                { q: t.trustxdataApi.faq.q5, a: t.trustxdataApi.faq.a5 },
              ].map((faq, index) => (
                <div key={index} className="card-cyber p-6">
                  <h4 className="text-lg font-semibold text-white mb-3">{faq.q}</h4>
                  <p className="text-gray-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
