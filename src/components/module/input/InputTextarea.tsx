import { InputTemplateOptions } from '@/types/common/common.type';
import { cn } from '@/utils/styleUtil';
import { forwardRef, useImperativeHandle, useRef } from 'react';

type InputTextProps = InputTemplateOptions &
  Omit<React.InputHTMLAttributes<HTMLTextAreaElement>, 'onChange'> & {
    onChange?: (value: string) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  };

export interface InputTextareaRef {
  validateMessage: () => boolean;
}

const InputTextarea = forwardRef<InputTextareaRef, InputTextProps>(
  ({ id, value, onChange, ...props }, ref) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
      validateMessage: () => {
        if (!value) {
          alert('Please write your message!');
          return false;
        }
        return true;
      },
    }));

    return (
      <textarea
        ref={inputRef}
        id={id}
        className={cn(
          'w-full border border-gray-200 rounded-[5px] p-[10px] focus:outline-none focus:ring-1 focus:ring-amber-800 resize-none h-[100px]'
        )}
        value={value || ''}
        onChange={e => onChange?.(e.target.value)}
        {...props}
      />
    );
  }
);

InputTextarea.displayName = 'InputTextarea';

export default InputTextarea;
