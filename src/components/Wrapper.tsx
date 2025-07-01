'use client';

import Footer from './common/Footer';
import GoTop from './common/GoTop';
import Header from './common/Header';

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div id="wrapper" className="relative flex min-h-screen flex-col justify-between">
      <Header />
      {children}
      <Footer />
      <GoTop />
    </div>
  );
}
