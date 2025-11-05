'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-cyber">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-blue/10 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <Header />
      
      <main className="flex-grow relative z-10">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
