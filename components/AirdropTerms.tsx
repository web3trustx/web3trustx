'use client';

import { useLanguage } from '../lib/LanguageContext';
import { motion } from 'framer-motion';

const translations = {
  es: {
    title: '🎯 Campaña Oficial de Airdrop – Web3TrustX',
    period: {
      title: '📅 Periodo de Campaña',
      content: 'Del 31 de octubre de 2025 al 1 de marzo de 2026.',
      distribution: 'Distribución oficial: 2 de marzo de 2026.',
    },
    summary: {
      title: '💰 Resumen General',
      total: 'Total distribución: 13.000.000 $WTRUSTX ≈ 3.250 USD',
      price: '(Precio estimado: $0.00025)',
      participants: 'Participantes: 5.000.000 $WTRUSTX (≈ 1.250 USD)',
      influencers: 'Influencers: 8.000.000 $WTRUSTX (≈ 2.000 USD)',
    },
    participantsAirdrop: {
      title: '🏆 Airdrop Participantes',
      top3: 'Top 3 - Premios Fijos',
      proportional: 'Reparto Proporcional (Posiciones 4-50)',
      proportionalAmount: '3.000.000 $WTRUSTX (≈ 750 USD)',
    },
    influencersAirdrop: {
      title: '⭐ Airdrop Influencers',
      top3: 'Top 3 - Premios Fijos',
      proportional: 'Reparto Proporcional (Posiciones 4-50)',
      proportionalAmount: '4.000.000 $WTRUSTX (≈ 1.000 USD)',
    },
    scoring: {
      title: '📊 Sistema de Puntuación',
      items: [
        '+3 puntos por seguir en X (Twitter)',
        '+3 puntos por unirse al canal de Telegram',
        '+10 puntos si completa ambas acciones',
        'Cada referido de primer nivel hereda todos los puntos que sume su referido durante la campaña',
        'Los puntos se acumulan automáticamente y se reflejan en el ranking en tiempo real',
      ],
    },
    ranking: {
      title: '📈 Ranking y Verificación',
      items: [
        'El ranking está publicado permanentemente en web3trustx.com/leaderboard',
        'Tu posición puede bajar si dejas de cumplir las condiciones requeridas',
        'Revisión de condiciones cada 14 días',
        'Actualización automática del ranking tras cada revisión',
        'Los datos son auditables y transparentes',
      ],
    },
    conditions: {
      title: '⚖️ Condiciones Generales',
      items: [
        'Verificación obligatoria mediante @Web3TrustX_AirdropBot en Telegram',
        'Todos los resultados son públicos y auditables on-chain',
        'Cualquier fraude, duplicación o manipulación resultará en expulsión inmediata',
        'Web3TrustX se reserva el derecho de ajustar fechas por motivos técnicos o de transparencia',
        'El incumplimiento de condiciones puede resultar en ajustes a la baja en la puntuación',
        'La distribución final está sujeta al cumplimiento de todas las condiciones en la fecha de cierre',
      ],
    },
    channels: {
      title: '📢 Canales Oficiales',
      telegram: 'Telegram',
      twitter: 'X (Twitter)',
      website: 'Sitio Web',
    },
    table: {
      position: 'Posición',
      prize: 'Premio USD',
      tokens: 'Tokens $WTRUSTX',
      total: 'Total Top 3',
    },
  },
  en: {
    title: '🎯 Official Airdrop Campaign – Web3TrustX',
    period: {
      title: '📅 Campaign Period',
      content: 'From October 31, 2025 to March 1, 2026.',
      distribution: 'Official distribution: March 2, 2026.',
    },
    summary: {
      title: '💰 General Summary',
      total: 'Total distribution: 13,000,000 $WTRUSTX ≈ 3,250 USD',
      price: '(Estimated price: $0.00025)',
      participants: 'Participants: 5,000,000 $WTRUSTX (≈ 1,250 USD)',
      influencers: 'Influencers: 8,000,000 $WTRUSTX (≈ 2,000 USD)',
    },
    participantsAirdrop: {
      title: '🏆 Participants Airdrop',
      top3: 'Top 3 - Fixed Prizes',
      proportional: 'Proportional Distribution (Positions 4-50)',
      proportionalAmount: '3,000,000 $WTRUSTX (≈ 750 USD)',
    },
    influencersAirdrop: {
      title: '⭐ Influencers Airdrop',
      top3: 'Top 3 - Fixed Prizes',
      proportional: 'Proportional Distribution (Positions 4-50)',
      proportionalAmount: '4,000,000 $WTRUSTX (≈ 1,000 USD)',
    },
    scoring: {
      title: '📊 Scoring System',
      items: [
        '+3 points for following on X (Twitter)',
        '+3 points for joining the Telegram channel',
        '+10 points if you complete both actions',
        'Each first-level referral inherits all points earned by their referral during the campaign',
        'Points accumulate automatically and are reflected in the ranking in real-time',
      ],
    },
    ranking: {
      title: '📈 Ranking and Verification',
      items: [
        'The ranking is permanently published at web3trustx.com/leaderboard',
        'Your position may drop if you stop meeting the required conditions',
        'Conditions review every 14 days',
        'Automatic ranking update after each review',
        'Data is auditable and transparent',
      ],
    },
    conditions: {
      title: '⚖️ General Conditions',
      items: [
        'Mandatory verification through @Web3TrustX_AirdropBot on Telegram',
        'All results are public and auditable on-chain',
        'Any fraud, duplication, or manipulation will result in immediate expulsion',
        'Web3TrustX reserves the right to adjust dates for technical or transparency reasons',
        'Non-compliance with conditions may result in downward score adjustments',
        'Final distribution is subject to compliance with all conditions on the closing date',
      ],
    },
    channels: {
      title: '📢 Official Channels',
      telegram: 'Telegram',
      twitter: 'X (Twitter)',
      website: 'Website',
    },
    table: {
      position: 'Position',
      prize: 'Prize USD',
      tokens: 'Tokens $WTRUSTX',
      total: 'Total Top 3',
    },
  },
};

const top3Participants = [
  { position: '1º', prizeUSD: '250', tokens: '1.000.000' },
  { position: '2º', prizeUSD: '150', tokens: '600.000' },
  { position: '3º', prizeUSD: '100', tokens: '400.000' },
];

const top3Influencers = [
  { position: '1º', prizeUSD: '500', tokens: '2.000.000' },
  { position: '2º', prizeUSD: '300', tokens: '1.200.000' },
  { position: '3º', prizeUSD: '200', tokens: '800.000' },
];

export default function AirdropTerms() {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.es;

  return (
    <section id="airdrop-terms" className="min-h-screen py-20 bg-gradient-to-b from-dark to-dark/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            {t.title}
          </h1>
        </motion.div>

        {/* Periodo de Campaña */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 glass-effect rounded-2xl p-6 md:p-10"
        >
          <h2 className="text-2xl font-bold text-primary mb-4">{t.period.title}</h2>
          <p className="text-gray-300 text-lg mb-2">{t.period.content}</p>
          <p className="text-primary font-semibold">{t.period.distribution}</p>
        </motion.div>

        {/* Resumen General */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 glass-effect rounded-2xl p-6 md:p-10"
        >
          <h2 className="text-2xl font-bold text-primary mb-4">{t.summary.title}</h2>
          <p className="text-white text-xl font-bold mb-2">{t.summary.total}</p>
          <p className="text-gray-400 text-sm mb-4">{t.summary.price}</p>
          <ul className="space-y-2 text-gray-300">
            <li>• {t.summary.participants}</li>
            <li>• {t.summary.influencers}</li>
          </ul>
        </motion.div>

        {/* Airdrop Participantes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 glass-effect rounded-2xl p-6 md:p-10"
        >
          <h2 className="text-2xl font-bold text-primary mb-6">{t.participantsAirdrop.title}</h2>
          
          <h3 className="text-xl font-semibold text-white mb-4">{t.participantsAirdrop.top3}</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full table-auto border border-white/10 rounded-lg">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300 border-b border-white/10">
                    {t.table.position}
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300 border-b border-white/10">
                    {t.table.prize}
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300 border-b border-white/10">
                    {t.table.tokens}
                  </th>
                </tr>
              </thead>
              <tbody>
                {top3Participants.map((item, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                    <td className="px-4 py-3 text-white font-semibold">{item.position}</td>
                    <td className="px-4 py-3 text-right text-primary font-bold">${item.prizeUSD}</td>
                    <td className="px-4 py-3 text-right text-gray-300 whitespace-nowrap">{item.tokens}</td>
                  </tr>
                ))}
                <tr className="bg-white/5 font-bold">
                  <td className="px-4 py-3 text-white">{t.table.total}</td>
                  <td className="px-4 py-3 text-right text-primary">$500</td>
                  <td className="px-4 py-3 text-right text-gray-300">2.000.000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-2">{t.participantsAirdrop.proportional}</h4>
            <p className="text-primary font-bold">{t.participantsAirdrop.proportionalAmount}</p>
          </div>
        </motion.div>

        {/* Airdrop Influencers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 glass-effect rounded-2xl p-6 md:p-10"
        >
          <h2 className="text-2xl font-bold text-primary mb-6">{t.influencersAirdrop.title}</h2>
          
          <h3 className="text-xl font-semibold text-white mb-4">{t.influencersAirdrop.top3}</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full table-auto border border-white/10 rounded-lg">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300 border-b border-white/10">
                    {t.table.position}
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300 border-b border-white/10">
                    {t.table.prize}
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300 border-b border-white/10">
                    {t.table.tokens}
                  </th>
                </tr>
              </thead>
              <tbody>
                {top3Influencers.map((item, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                    <td className="px-4 py-3 text-white font-semibold">{item.position}</td>
                    <td className="px-4 py-3 text-right text-primary font-bold">${item.prizeUSD}</td>
                    <td className="px-4 py-3 text-right text-gray-300 whitespace-nowrap">{item.tokens}</td>
                  </tr>
                ))}
                <tr className="bg-white/5 font-bold">
                  <td className="px-4 py-3 text-white">{t.table.total}</td>
                  <td className="px-4 py-3 text-right text-primary">$1.000</td>
                  <td className="px-4 py-3 text-right text-gray-300">4.000.000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-2">{t.influencersAirdrop.proportional}</h4>
            <p className="text-primary font-bold">{t.influencersAirdrop.proportionalAmount}</p>
          </div>
        </motion.div>

        {/* Sistema de Puntuación */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 glass-effect rounded-2xl p-6 md:p-10"
        >
          <h2 className="text-2xl font-bold text-primary mb-4">{t.scoring.title}</h2>
          <ul className="space-y-3">
            {t.scoring.items.map((item, index) => (
              <li key={index} className="text-gray-300 flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Ranking y Verificación */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 glass-effect rounded-2xl p-6 md:p-10"
        >
          <h2 className="text-2xl font-bold text-primary mb-4">{t.ranking.title}</h2>
          <ul className="space-y-3">
            {t.ranking.items.map((item, index) => (
              <li key={index} className="text-gray-300 flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Condiciones Generales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 glass-effect rounded-2xl p-6 md:p-10 border-2 border-yellow-500/30"
        >
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">{t.conditions.title}</h2>
          <ul className="space-y-3">
            {t.conditions.items.map((item, index) => (
              <li key={index} className="text-gray-300 flex items-start">
                <span className="text-yellow-400 mr-2">⚠</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Canales Oficiales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-effect rounded-2xl p-6 md:p-10 text-center"
        >
          <h2 className="text-2xl font-bold text-primary mb-6">{t.channels.title}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {/* Telegram */}
            <a
              href="https://t.me/Web3TrustX"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-primary hover:bg-primary/90 text-black font-medium rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
              title="Telegram: t.me/Web3TrustX"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
              </svg>
              <span className="font-semibold">Telegram</span>
            </a>

            {/* X (Twitter) */}
            <a
              href="https://x.com/Web3TrustX"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-primary hover:bg-primary/90 text-black font-medium rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
              title="X: x.com/Web3TrustX"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span className="font-semibold">X (Twitter)</span>
            </a>

            {/* Website */}
            <a
              href="https://web3trustx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-primary hover:bg-primary/90 text-black font-medium rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
              title="Website: web3trustx.com"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <span className="font-semibold">Website</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
