import { InfoCompanyDatas } from '@/data/common.data';
import { cn } from '@/utils/styleUtil';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import InnerBasic from './InnerBasic';

export default function FooterComponent() {
  const pathname = usePathname();
  return (
    <footer id="footer" className="bg-black text-gray-400 py-[36px]">
      <InnerBasic>
        <div className="w-full flex justify-between items-start">
          <h3 className="sr-only">Footer</h3>
          <div className="">
            <ul className="flex gap-4 text-white [&_a:hover]:text-amber-300">
              <li className={cn(pathname === '/legal/policy' ? 'text-amber-300' : '')}>
                <Link href="/legal/policy">Privacy Policy</Link>
              </li>
              <li className={cn(pathname === '/legal/terms' ? 'text-amber-300' : '')}>
                <Link href="/legal/terms">Terms & Conditions</Link>
              </li>
            </ul>
            <ul>
              {InfoCompanyDatas.map(info => (
                <li key={info.title}>
                  <span>{info.title} _ </span>
                  <span>{info.description}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <ul className="flex gap-4">
              <li className="linkedin">
                <a href="https://kr.linkedin.com/" target="_blank">
                  linkedin
                </a>
              </li>
              <li className="youtube">
                <a href="https://www.youtube.com/" target="_blank">
                  youtube
                </a>
              </li>
            </ul>
          </div>
        </div>
      </InnerBasic>
    </footer>
  );
}
