import { cn } from '@/utils/styleUtil';

export default function InputContainer({
  className,
  align,
  children,
}: {
  className?: string;
  align?: 'between' | 'start' | 'end';
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'w-full flex items-center gap-[10px]',
        align === 'between' && 'items-between',
        align === 'start' && 'items-start',
        align === 'end' && 'items-end',
        className
      )}
    >
      {children}
    </div>
  );
}
