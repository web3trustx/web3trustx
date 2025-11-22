'use client';

import Head from 'next/head';
import { useLanguage } from '../lib/LanguageContext';
import { motion } from 'framer-motion';

export default function Tokenomics() {
  const { t } = useLanguage();

  const distribution = [
    { name: 'Comunidad & Ecosistema', percentage: 63, amount: '630.000.000', color: '#00B5AD' },
    { name: 'Equipo & Advisors', percentage: 12.5, amount: '125.000.000', color: '#4A90E2' },
    { name: 'Reservas Estratégicas', percentage: 7.5, amount: '75.000.000', color: '#9B59B6' },
    { name: 'Marketing', percentage: 5, amount: '50.000.000', color: '#E74C3C' },
    { name: 'Preventa Pública', percentage: 4, amount: '40.000.000', color: '#F39C12' },
    { name: 'Liquidez (WTX-side)', percentage: 3, amount: '30.000.000', color: '#1ABC9C' },
    { name: 'Tesoro Operativo', percentage: 2.5, amount: '25.000.000', color: '#34495E' },
    { name: 'Seed', percentage: 2.5, amount: '25.000.000', color: '#95A5A6' },
  ];

  const utilities = [
    'TrustXScanner (premium)',
    'TrustXDex (herramientas avanzadas)',
    'TrustXScore (reputación y auditoría)',
    'TrustXHub (análisis de desarrolladores)',
    'TrustXInfluence (recompensas)',
    'TrustXBadge (credenciales verificadas)',
    'Bots premium',
    'Recompensas por actividad',
    'Staking / LP Mining',
    'App móvil',
    'Expansión multichain',
  ];

  const protections = [
    'Límites por wallet en preventa',
    'Límites por transacción en lanzamiento',
    'LP bloqueada 24 meses',
    'Equipo sin tokens 2 años',
    'Sin minting, sin funciones ocultas',
    'Contratos bloqueados y auditables',
  ];

  return (
    <>
      <Head>
        <title>Tokenomics - Web3TrustX (WTX)</title>
        <meta name="description" content="Tokenomics oficiales del token WTX de Web3TrustX" />
      </Head>

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="section-title mb-6">
              Tokenomics Oficiales — WEB3TRUSTX (WTX)
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Supply total: 1.000.000.000 WTX • Red inicial: BNB Chain (BEP-20)
            </p>
          </motion.div>

          {/* Datos Generales */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">🌐 Datos Generales</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Supply Total', value: '1.000.000.000 WTX' },
                { label: 'Red Inicial', value: 'BNB Chain (BEP-20)' },
                { label: 'Precio de Lanzamiento', value: '0,00085 USD' },
                { label: 'FDV Inicial', value: '850.000 USD' },
                { label: 'Liquidez Inicial', value: '≈ 51.000 USD' },
                { label: 'Liquidez Bloqueada', value: '24 meses' },
                { label: 'Circulante Inicial', value: '1,85% – 1,90%' },
                { label: 'Token', value: 'Supply fijo, sin minting' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="card-cyber text-center"
                >
                  <p className="text-sm text-primary font-semibold mb-2">{item.label}</p>
                  <p className="text-lg font-bold text-white">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Distribución del Supply con Donut Chart */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">🟦 Distribución del Supply (100%)</h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Donut Chart */}
              <div className="relative">
                <svg viewBox="0 0 400 400" className="w-full max-w-md mx-auto">
                  {(() => {
                    let cumulativePercent = 0;
                    return distribution.map((item, index) => {
                      const startAngle = (cumulativePercent * 360) / 100;
                      const endAngle = ((cumulativePercent + item.percentage) * 360) / 100;
                      cumulativePercent += item.percentage;
                      
                      const startRad = (startAngle - 90) * (Math.PI / 180);
                      const endRad = (endAngle - 90) * (Math.PI / 180);
                      
                      const outerRadius = 180;
                      const innerRadius = 100;
                      
                      const x1 = 200 + outerRadius * Math.cos(startRad);
                      const y1 = 200 + outerRadius * Math.sin(startRad);
                      const x2 = 200 + outerRadius * Math.cos(endRad);
                      const y2 = 200 + outerRadius * Math.sin(endRad);
                      const x3 = 200 + innerRadius * Math.cos(endRad);
                      const y3 = 200 + innerRadius * Math.sin(endRad);
                      const x4 = 200 + innerRadius * Math.cos(startRad);
                      const y4 = 200 + innerRadius * Math.sin(startRad);
                      
                      const largeArc = item.percentage > 50 ? 1 : 0;
                      
                      const pathData = `
                        M ${x1} ${y1}
                        A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2}
                        L ${x3} ${y3}
                        A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
                        Z
                      `;
                      
                      return (
                        <motion.path
                          key={index}
                          d={pathData}
                          fill={item.color}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          className="hover:opacity-80 transition-opacity cursor-pointer"
                        />
                      );
                    })
                  })()}
                  <circle cx="200" cy="200" r="80" fill="#0A1220" />
                  <text x="200" y="195" textAnchor="middle" fill="#00B5AD" fontSize="24" fontWeight="bold">
                    1B
                  </text>
                  <text x="200" y="220" textAnchor="middle" fill="#ffffff" fontSize="16">
                    WTX
                  </text>
                </svg>
              </div>

              {/* Legend */}
              <div className="space-y-3">
                {distribution.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-white font-medium">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-primary font-bold">{item.percentage}%</p>
                      <p className="text-gray-400 text-sm">{item.amount}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Liquidez (LP) */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">🟣 Liquidez (LP)</h2>
            <div className="card-cyber max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-primary font-semibold mb-2">WTX Asignados</p>
                  <p className="text-2xl font-bold text-white mb-4">30.000.000 WTX (3%)</p>
                  <p className="text-gray-400 text-sm">Valor inicial: 25.500 USD en WTX</p>
                </div>
                <div>
                  <p className="text-primary font-semibold mb-2">Liquidez Total</p>
                  <p className="text-2xl font-bold text-white mb-4">≈ 51.000 USD</p>
                  <p className="text-gray-400 text-sm">25.500 USD en WTX + 25.500 USD en BNB</p>
                </div>
                <div>
                  <p className="text-primary font-semibold mb-2">LP Bloqueada</p>
                  <p className="text-xl font-bold text-white">24 meses</p>
                </div>
                <div>
                  <p className="text-primary font-semibold mb-2">LP-side Accesible</p>
                  <p className="text-xl font-bold text-white">7–9 millones WTX</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Precios por Fase */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">🟩 Precios por Fase</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { phase: 'Seed', price: '0,00066 USD', color: 'from-gray-500 to-gray-600' },
                { phase: 'Preventa Pública', price: '0,00075 USD', color: 'from-yellow-500 to-orange-500' },
                { phase: 'Lanzamiento', price: '0,00085 USD', color: 'from-primary to-accent-blue' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-cyber text-center relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10`} />
                  <div className="relative z-10">
                    <p className="text-primary font-semibold mb-3">{item.phase}</p>
                    <p className="text-3xl font-bold text-white">{item.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Vesting & Bloqueos */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">🟨 Vesting & Bloqueos</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Seed — 2,5%',
                  details: ['15% TGE', '3 meses cliff', '85% lineal en 9 meses'],
                },
                {
                  title: 'Preventa Pública — 4%',
                  details: ['20% TGE', '80% lineal en 4 meses'],
                },
                {
                  title: 'Equipo & Advisors — 12,5%',
                  details: ['24 meses cliff', '72 meses vesting lineal', 'Total: 96 meses'],
                },
                {
                  title: 'Comunidad & Ecosistema — 63%',
                  details: ['100% bloqueado', 'Liberación programada', 'Sin liberación automática'],
                },
                {
                  title: 'Reservas Estratégicas — 7,5%',
                  details: ['Bloqueo largo plazo'],
                },
                {
                  title: 'Marketing — 5%',
                  details: ['1 mes cliff', 'Vesting 12 meses'],
                },
                {
                  title: 'Tesoro Operativo — 2,5%',
                  details: ['6 meses cliff', 'Vesting 12 meses'],
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="card-cyber"
                >
                  <h3 className="text-xl font-bold text-primary mb-4">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.details.map((detail, i) => (
                      <li key={i} className="text-gray-300 text-sm flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Circulante Inicial */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">🟥 Circulante Inicial</h2>
            <div className="card-cyber max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-gray-400 mb-2">LP accesible</p>
                  <p className="text-2xl font-bold text-white">7–9M WTX</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-2">Seed TGE</p>
                  <p className="text-2xl font-bold text-white">3,75M WTX</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-2">Preventa TGE</p>
                  <p className="text-2xl font-bold text-white">8M WTX</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-2">Airdrop inicial</p>
                  <p className="text-2xl font-bold text-white">3,53M WTX</p>
                </div>
              </div>
              <div className="border-t border-white/10 pt-6">
                <p className="text-gray-400 mb-2 text-center">Total Circulante Inicial</p>
                <p className="text-4xl font-bold text-primary text-center">≈ 18,5–19,3M WTX</p>
                <p className="text-gray-400 text-center mt-2">(1,85–1,90% del supply total)</p>
              </div>
            </div>
          </motion.section>

          {/* Utilidad del Token */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">🟩 Utilidad del Token WTX</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {utilities.map((utility, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="bg-white/5 hover:bg-white/10 rounded-lg p-4 flex items-center gap-3 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <span className="text-2xl">✓</span>
                  <span className="text-white">{utility}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Protección al Usuario */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">🟧 Protección al Usuario</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {protections.map((protection, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="card-cyber flex items-center gap-3"
                >
                  <span className="text-2xl">🛡️</span>
                  <span className="text-white">{protection}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Expansión Multichain */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">🟦 Expansión Multichain</h2>
            <div className="card-cyber max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-4xl mb-3">🚀</p>
                  <p className="text-primary font-semibold mb-2">Lanzamiento</p>
                  <p className="text-white font-bold">BNB Chain</p>
                </div>
                <div>
                  <p className="text-4xl mb-3">⏭️</p>
                  <p className="text-primary font-semibold mb-2">Siguiente</p>
                  <p className="text-white font-bold">Solana</p>
                </div>
                <div>
                  <p className="text-4xl mb-3">🌐</p>
                  <p className="text-primary font-semibold mb-2">Futuras Cadenas</p>
                  <p className="text-white font-bold">Base, Polygon, Sui</p>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
}
