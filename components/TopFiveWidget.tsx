'use client';

import Link from 'next/link';
import { useLanguage } from '../lib/LanguageContext';
import { useLeaderboardApi } from '../lib/useLeaderboardApi';
import { motion } from 'framer-motion';

export default function TopFiveWidget() {
  const { t } = useLanguage();
  const { data, loading, error } = useLeaderboardApi('participant', 1, 5);

  if (loading) {
    return (
      <div className="glass-effect rounded-xl p-8 border border-white/10">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return null; // No mostrar el widget si hay error
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-effect rounded-xl p-8 border border-white/10"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-display font-bold text-white">
          {t.leaderboard.topFive.title}
        </h3>
        <Link
          href="/leaderboard"
          className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
        >
          {t.leaderboard.topFive.viewFull} →
        </Link>
      </div>

      {/* Top 5 List */}
      <div className="space-y-3">
        {data.data.map((entry, index) => (
          <motion.div
            key={entry.userId}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5"
          >
            {/* Rank con medallas */}
            <div className="flex-shrink-0 w-12 text-center">
              <div className="flex items-center justify-center gap-1">
                <span className="text-xl font-bold text-gray-400 tabular-nums">{entry.rank}</span>
                {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : null}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-mono text-gray-300 truncate">
                {entry.userId ?? ''}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {entry.username ? `@${entry.username}` : ''}{entry.username && entry.x ? ' · ' : ''}{entry.x || ''}
              </div>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1">
                  <span className="text-primary text-lg font-bold">
                    {Number(entry.totalPoints ?? 0).toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500">pts</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-300 font-semibold">
                    {Number(entry.referralsCount ?? 0)}
                  </span>
                  <span className="text-xs text-gray-500">refs</span>
                </div>
              </div>
            </div>

            {/* Arrow indicator */}
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View Full Ranking Button */}
      <Link href="/leaderboard">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-primary to-yellow-500 text-black font-semibold rounded-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
        >
          {t.leaderboard.topFive.viewFull}
        </motion.button>
      </Link>
    </motion.div>
  );
}
