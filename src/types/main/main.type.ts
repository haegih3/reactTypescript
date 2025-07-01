import { BaseResponse } from '@/types/common/common.type';

export interface MainData {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface MainResponse extends BaseResponse {
  data: MainData;
}
