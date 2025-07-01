'use client';

import { useEffect, useRef, useState } from 'react';

const useDetectClose = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleHandler = () => setIsOpen(!isOpen);

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', handleClickOutside);
      return () => window.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  return [isOpen, ref, toggleHandler] as const;
};

export default useDetectClose;
