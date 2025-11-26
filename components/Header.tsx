'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../lib/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTrustXDataOpen, setIsTrustXDataOpen] = useState(false);

  const menuItems = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/ecosystem', label: t.nav.ecosystem },
    { href: '/tokenomics', label: t.nav.tokenomics },
    { href: '/roadmap', label: t.nav.roadmap },
    { href: '/whitepaper', label: t.nav.whitepaper },
    { href: '/leaderboard', label: t.nav.leaderboard },
    { href: '/leaderboard#airdrop-terms', label: t.nav.airdropTerms },
    { href: '/contact', label: t.nav.contact },
  ];

  return (
    <header className="fixed top-0 w-full z-50 glass-effect border-b border-white/10">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <img 
              src="/logo.png" 
              alt="Web3TrustX Logo" 
              className="w-10 h-10 object-contain transform group-hover:scale-110 transition-transform duration-300" 
            />
            <span className="text-xl font-display font-bold text-white hidden sm:block">
              Web3TrustX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.slice(0, 8).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-primary hover:bg-white/5 rounded-lg transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
            
            {/* TrustXData Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsTrustXDataOpen(true)}
              onMouseLeave={() => setIsTrustXDataOpen(false)}
            >
              <button className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-primary hover:bg-white/5 rounded-lg transition-all duration-200 flex items-center gap-1">
                {t.nav.trustxdata}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {isTrustXDataOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 w-48 glass-effect border border-white/10 rounded-lg shadow-xl overflow-hidden"
                  >
                    <Link
                      href="/trustxdata/api"
                      className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-primary hover:bg-white/5 transition-all duration-200"
                    >
                      {t.nav.api}
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href={menuItems[8].href}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-primary hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              {menuItems[8].label}
            </Link>
          </div>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-dark-lighter rounded-lg p-1">
              <button
                onClick={() => setLanguage('es')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
                  language === 'es'
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                ES
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
                  language === 'en'
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-white/10"
            >
              <div className="py-4 space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-primary hover:bg-white/5 rounded-lg transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* TrustXData submenu for mobile */}
                <div className="px-4 py-2">
                  <button
                    onClick={() => setIsTrustXDataOpen(!isTrustXDataOpen)}
                    className="w-full text-left text-sm font-medium text-gray-300 hover:text-primary transition-all duration-200 flex items-center justify-between"
                  >
                    {t.nav.trustxdata}
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${isTrustXDataOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {isTrustXDataOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-4 mt-2 space-y-1"
                      >
                        <Link
                          href="/trustxdata/api"
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-3 py-2 text-sm text-gray-400 hover:text-primary hover:bg-white/5 rounded-lg transition-all duration-200"
                        >
                          {t.nav.api}
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
