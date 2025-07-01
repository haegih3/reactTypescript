'use client';

import { cn } from '@/utils/styleUtil';
import { useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  threshold?: number;
  once?: boolean;
  className?: string;
}

export default function MotionSection({
  children,
  threshold = 0.3,
  once = true,
  className = '',
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          if (once && ref.current) observer.unobserve(ref.current);
        } else if (!once) {
          setActive(false);
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [once, threshold]);
  return (
    <div
      ref={ref}
      className={cn(
        'w-full transition-all duration-700 ease-out transform',
        className,
        active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
    >
      {children}
    </div>
  );
}
