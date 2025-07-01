'use client';

import { GnbAreaProps } from '@/types/common/common.type';
import { cn } from '@/utils/styleUtil';
import { usePathname, useRouter } from 'next/navigation';

export default function GNB({ menus }: { menus: GnbAreaProps['menus'] }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuClick = (path: string) => {
    router.push(path);
  };

  return (
    <nav id="gnb">
      <ul className="flex gap-4">
        {menus.map((menu, index) => (
          <li
            key={`menu-${menu.type}-${index}`}
            data-key={`menu-${menu.type}-${index}`}
            className={cn(
              'border-b-2 transition-all duration-300',
              pathname === menu.link
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-black hover:border-gray-400'
            )}
          >
            <button onClick={() => handleMenuClick(menu.link)} className="px-4 py-2 cursor-pointer">
              {menu.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
