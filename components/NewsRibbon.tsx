'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../lib/LanguageContext';

export default function NewsRibbon() {
  const [isVisible, setIsVisible] = useState(true);
  const { t } = useLanguage();

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-16 md:top-20 left-0 right-0 w-full bg-[#101A2B]/95 backdrop-blur-md border-b border-primary/30 z-40"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            {/* Content */}
            <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-1 w-full sm:w-auto">
              {/* NEW Badge with strong pulse animation */}
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-red-600 text-white whitespace-nowrap flex-shrink-0 pulse-strong">
                {t.newsRibbon.badge}
              </span>
              
              {/* Message */}
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm sm:text-base leading-tight">
                  {t.newsRibbon.title}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm mt-0.5 sm:mt-1 line-clamp-2">
                  {t.newsRibbon.description}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <a
                href="https://scanner.web3trustx.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 bg-primary hover:bg-[#00a59d] text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 text-center text-xs sm:text-sm whitespace-nowrap"
              >
                {t.newsRibbon.button}
              </a>
              
              {/* Close button */}
              <button
                onClick={() => setIsVisible(false)}
                className="p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors flex-shrink-0"
                aria-label="Close announcement"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Decorative gradient border bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      </motion.div>
    </AnimatePresence>
  );
}
