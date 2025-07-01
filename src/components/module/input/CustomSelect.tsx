import { CountryType } from '@/data/Country.data';
import useDetectClose from '@/hooks/useDetectClose';
import SVGarrowHead from '@/images/SVGarrowHead';
import { cn } from '@/utils/styleUtil';
import { BaseSyntheticEvent, useState } from 'react';

interface Props {
  id: string;
  options: CountryType[];
}

const CustomSelect = ({ id, options }: Props) => {
  const [isSelected, selectRef, selectHandler] = useDetectClose();
  const [viewValue, setViewValue] = useState('');

  const handleSelectValue = (e: BaseSyntheticEvent) => {
    const current = e.target.getAttribute('value');
    setViewValue(current);
  };

  // eng_name 기준으로 대소문자 구분없이 정렬
  const sortedOptions = [...options].sort((a, b) =>
    a.eng_name.toLowerCase().localeCompare(b.eng_name.toLowerCase())
  );

  const labelText = id ? `Select ${id.charAt(0).toUpperCase() + id.slice(1)}...` : 'Select...';

  return (
    <div
      id={id}
      ref={selectRef}
      onClick={selectHandler}
      className="relative grow pr-[50px] cursor-pointer flex items-center justify-between border border-gray-200 rounded-[5px] p-[10px] focus:outline-none focus:ring-1 focus:ring-amber-800"
    >
      <span className={cn('text-[16px] leading-[1.5]', viewValue ? 'text-black' : 'text-gray-300')}>
        {viewValue ? viewValue : labelText}
      </span>
      <ul
        className={cn(
          'absolute z-10 top-[calc(100%+10px)] left-0 w-full max-h-[200px] overflow-y-scroll bg-white border border-gray-200 rounded-[4px]',
          '[&>li]:hover:bg-gray-100 [&>li]:cursor-pointer [&>li]:p-[5px_10px]',
          isSelected ? 'block' : 'hidden'
        )}
      >
        {sortedOptions.map((c: CountryType, index: number) => (
          <li key={`${index}_${c.third_code}`} value={c.eng_name} onClick={handleSelectValue}>
            {c.eng_name}
          </li>
        ))}
      </ul>
      <SVGarrowHead className="absolute right-[10px] top-[50%] translate-y-[-50%]" />
    </div>
  );
};

export default CustomSelect;
