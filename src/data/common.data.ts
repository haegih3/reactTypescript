import { GnbAreaProps, InfoCompanyProps } from '@/types/common/common.type';

export const GnbMenuDatas: GnbAreaProps['menus'] = [
  {
    type: 'main',
    title: '홈',
    link: '/',
  },
  {
    type: 'sub',
    title: 'Solution',
    link: '/solution',
  },
  {
    type: 'sub',
    title: 'Resources',
    link: '/resources',
  },
  {
    type: 'sub',
    title: 'Company',
    link: '/company',
  },
  {
    type: 'sub',
    title: 'FAQ',
    link: '/faq',
  },
  {
    type: 'legal',
    title: 'Legal',
    link: '/legal',
  },
];

export const InfoCompanyDatas: InfoCompanyProps[] = [
  {
    title: 'name',
    description: 'Halo Sync',
  },
  {
    title: 'address',
    description: '8F 9F, 78, Namdaemun-ro, Jung-gu, Seoul, Republic of Korea, Halo&Co Co., Ltd',
  },
  {
    title: 'copyright',
    description: 'Copyright (c) Halo&Co. CO. LTD. All Rights Reserved.',
  },
];
