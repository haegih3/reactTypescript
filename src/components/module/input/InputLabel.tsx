import { cn } from '@/utils/styleUtil';

const InputLabel = ({
  htmlFor,
  label,
  required = false,
  labelView,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
  labelView?: boolean;
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn('flex items-center gap-[4px] leading-[45px]', !labelView && 'sr-only')}
    >
      <span className="break-keep whitespace-nowrap">{label}</span>{' '}
      {required && <span className="text-red-500">*</span>}
    </label>
  );
};

export default InputLabel;
