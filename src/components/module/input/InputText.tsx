import { InputTemplateOptions } from '@/types/common/common.type';
import { cn } from '@/utils/styleUtil';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import InputContainer from './InputContainer';

type InputTextProps = InputTemplateOptions &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
    onChange?: (value: string) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  };

export interface InputTextRef {
  validateEmail: () => boolean;
  validatePhone: () => boolean;
}

const InputText = forwardRef<InputTextRef, InputTextProps>(
  ({ id, type, value, onChange, onKeyDown, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // 이메일 유효성 검사
    const isValidEmail = (email: string) => {
      return /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))+$/.test(
        email
      );
    };

    // 전화번호 유효성 검사 (국내/국제 모두 포함)
    const isValidPhone = (phone: string) => {
      // 공백, 하이픈 제거
      const normalized = phone.replace(/[\s-]/g, '');

      return /^(\+?\d{7,15})$/.test(normalized);
    };

    useImperativeHandle(ref, () => ({
      validateEmail: () => {
        if (type === 'EMAIL' && value && !isValidEmail(value)) {
          alert('Check your email format!');
          inputRef.current?.focus();
          return false;
        }
        return true;
      },
      validatePhone: () => {
        if (type === 'tel' && value && !isValidPhone(value)) {
          alert('Please enter a valid phone number!');
          inputRef.current?.focus();
          return false;
        }
        return true;
      },
    }));

    return (
      <InputContainer>
        <input
          ref={inputRef}
          type={type || 'text'}
          id={id}
          className={cn(
            'w-full leading-[1.5] border border-gray-200 rounded-[5px] p-[10px] focus:outline-none focus:ring-1 focus:ring-amber-800'
          )}
          value={value || ''}
          onChange={e => onChange?.(e.target.value)}
          onKeyDown={onKeyDown}
          {...props}
        />
      </InputContainer>
    );
  }
);

InputText.displayName = 'InputText';

export default InputText;
