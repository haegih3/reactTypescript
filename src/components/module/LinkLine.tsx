// 사용중 아님
import { cn } from '@/utils/styleUtil';

interface IProps {
  line: string;
  className?: string;
}

const LinkLine = ({ line, className }: IProps) => {
  const regex = /<a>(.*?)<\/a>/gi;

  const result: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(line)) !== null) {
    const [fullMatch, linkContent] = match;
    const start = match.index;
    let linkUrl = '';

    // 앞 텍스트
    if (linkContent.indexOf('Contact us') === -1) {
      linkUrl = 'mailto:halo-co@halo-co.co.kr';
    } else {
      linkUrl = 'https://halo&co.co.kr';
    }

    // a링크 부분
    result.push(
      <a key={key++} className={cn(className, 'underline')} target="_blank" href={linkUrl}>
        {linkContent}
      </a>
    );

    lastIndex = start + fullMatch.length;
  }

  // 마지막 남은 텍스트
  if (lastIndex < line.length) {
    result.push(line.slice(lastIndex));
  }

  return <p className="text-[14px]">{result}</p>;
};

export default LinkLine;
