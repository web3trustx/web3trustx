import Head from 'next/head';
import Leaderboard from '../components/Leaderboard';
import { useLanguage } from '../lib/LanguageContext';

export default function LeaderboardPage() {
  const { t } = useLanguage();

  return (
    <>
      <Head>
        <title>{t.leaderboard.title} - Web3TrustX</title>
        <meta name="description" content={t.leaderboard.subtitle} />
        <meta property="og:title" content={`${t.leaderboard.title} - Web3TrustX`} />
        <meta property="og:description" content={t.leaderboard.subtitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Leaderboard />
    </>
  );
}
