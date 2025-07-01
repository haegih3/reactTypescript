import Country, { CountryType } from '@/data/Country.data';

interface InputSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  onChange?: (value: string) => void;
}

const InputSelect = ({ onChange, ...props }: InputSelectProps) => {
  return (
    <select
      {...props}
      onChange={e => onChange && onChange(e.target.value)}
      className="w-full leading-[1.5] border border-gray-200 rounded-[5px] p-[10px] focus:outline-none focus:ring-1 focus:ring-amber-800"
    >
      {Country.map((c: CountryType, index: number) => (
        <option key={`${index}_${c.third_code}`} value={c.second_code}>
          {c.eng_name}
        </option>
      ))}
    </select>
  );
};

export default InputSelect;
