export interface BaseResponse {
  success: boolean;
  message?: string;
}

export type InfoCompanyProps = {
  title: string;
  description: string;
};

export type GnbAreaProps = {
  homeLink: string;
  menus: {
    type?: 'main' | 'sub' | 'legal';
    title: string;
    link: string;
  }[];
};

// input 타입 정의
export type InputGroupType = 'TEXT' | 'EMAIL';

export interface InputTemplateOptions {
  id: string;
  value?: string;
  placeholder?: string;
}

export interface InputError {
  message: string;
}

export interface InputTemplate {
  id: string;
  label: string;
  placeholder?: string;
  type: InputGroupType;
  suffix?: string;
  description?: string;
  options?: Array<InputTemplateOptions>;
  checked?: boolean;
  value?: string;
  length?: number;
  min?: number;
  max?: number;
  hideLabel?: boolean;
  maxLength?: number;
  minLength?: number;
  defaultValue?: string;
}

export interface InputGroupProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  field: InputTemplate;
  required: boolean;
  registerId: string;
  error: InputError;
  style?: object;
  disabled?: boolean;
}

export interface InputGroupTemplate extends InputGroupProps, InputTemplate {
  createValidator: () => (value: string) => string | undefined;
}
