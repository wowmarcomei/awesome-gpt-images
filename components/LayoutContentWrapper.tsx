'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { ScrollButton } from './ScrollButton';

export function LayoutContentWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <>
      {!isDashboard && <Navbar />}
      <div className={!isDashboard ? "pt-12" : ""}>
        {children}
      </div>
      {!isDashboard && <ScrollButton />}
    </>
  );
}
