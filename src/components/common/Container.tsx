'use client';

import { wasLastInputKeyboard } from '@/utils/globals';
import { cn } from '@/utils/styleUtil';
import { useEffect, useRef } from 'react';

export default function Container({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleFocus = () => {
      if (wasLastInputKeyboard()) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'start', // scroll-mt 유사 효과
        });
      }
    };

    el.addEventListener('focus', handleFocus);
    return () => el.removeEventListener('focus', handleFocus);
  }, []);
  return (
    <div
      ref={ref}
      id={id || ''}
      className={cn('w-full py-[80px] flex-1 focus:outline-none scroll-mt-[74px]', className)}
      tabIndex={0}
    >
      {children}
    </div>
  );
}
