import { BaseResponse } from '@/types/common/common.type';

export interface faqData {
  display: boolean;
  seq: number;
  type: string;
  question: string;
  answer_Ko?: string[];
  answer_En?: string[];
}

export interface SubData {
  id: string;
  name: string;
  value: number;
  isActive: boolean;
}

export interface SubResponse extends BaseResponse {
  data: SubData;
}
