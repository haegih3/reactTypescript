import Image from 'next/image';
import Link from 'next/link';
import GNB from './GNB';
import InnerBasic from './InnerBasic';

import { GnbMenuDatas } from '@/data/common.data';

export default function Header() {
  const menus = GnbMenuDatas.filter(menu => menu.type === 'sub');
  return (
    <header id="header" className="sticky top-0 z-10 border-b border-[#ddd] py-[16px]">
      <InnerBasic>
        <div className="flex justify-between items-center">
          <h1>
            <Link href="/" title="Go to Home" className="block">
              <Image
                className="dark:invert"
                src="/next.svg"
                alt="logo"
                width={180}
                height={38}
                priority
                style={{ objectFit: 'cover' }}
              />
            </Link>
          </h1>
          <GNB menus={menus} />
        </div>
      </InnerBasic>
    </header>
  );
}
