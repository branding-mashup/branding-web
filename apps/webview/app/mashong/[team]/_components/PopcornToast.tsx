'use client';

import { toast } from 'react-hot-toast/headless';

import { styled } from '@/styled-system/jsx';

const PopcornToast = ({ value }: { value: number }) => (
  <styled.span
    color="white"
    textAlign="center"
    fontWeight={500}
    fontSize={14}
    lineHeight="16.7px"
    letterSpacing="-1%"
    whiteSpace="nowrap"
  >
    <span>매숑이가 </span>
    <styled.span fontWeight={700} color="brand.300">
      팝콘 {value}개
    </styled.span>
    <span>를 냠냠했어요</span>
  </styled.span>
);

export const showPopcornToast = (value: number) => {
  toast.remove();
  toast.custom(<PopcornToast value={value} />, {
    duration: 3000,
  });
};
