'use client';

import SVGarrowUp from '@/images/SVGarrowUp';
import { cn } from '@/utils/styleUtil';

import { useEffect, useState } from 'react';

interface IProps {
  isMobile?: boolean;
}

const ChatbotTopBtnAreaT = ({ isMobile }: IProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const detectScrollTop = () => {
    const scrollTop = window.scrollY;
    setIsVisible(scrollTop > 0);
  };

  const handleGoTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', detectScrollTop);

    return () => {
      window.removeEventListener('scroll', detectScrollTop);
    };
  }, []);

  return (
    <>
      <div className={'fixed bottom-[40px] right-[10px] z-30'}>
        <div
          className={cn(
            'flex flex-end gap-[10px] absolute bottom-0 right-[10px] mb-[17px]',
            isMobile && 'flex-col',
            !isMobile && ''
          )}
        >
          <button
            className={cn(
              'relative w-[48px] h-[48px] bg-white cursor-pointer rounded-[50%] border border-solid border-gray-200 shadow-[0_5px_5px_rgba(0,0,0,0.1)]',
              isVisible ? 'block' : 'hidden'
            )}
            onClick={handleGoTop}
          >
            <SVGarrowUp className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[24px] h-[24px] overflow-hidden shrink-0" />
            <span className="sr-only">맨 위로</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatbotTopBtnAreaT;
