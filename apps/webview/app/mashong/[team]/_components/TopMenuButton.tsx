'use client';

import { useRouter } from 'next/navigation';
import { PropsWithChildren, useState } from 'react';

import { revalidateMashongMissionStatus } from '@/app/mashong/_actions/revalidateMashongMissionStatus';
import { revalidateMashongStatus } from '@/app/mashong/_actions/revalidateMashongStatus';
import { css } from '@/styled-system/css';
import { styled } from '@/styled-system/jsx';
import SvgImage from '@/ui/svg-image';

import CheckInBottomSheet from './CheckInBottomSheet';

export const TopMenuButton = ({
  variant,
  shouldOpenSheet = false,
  children,
}: PropsWithChildren<{ variant: 'checkin' | 'mission'; shouldOpenSheet?: boolean }>) => {
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(shouldOpenSheet);

  const onClick = () => {
    if (variant === 'checkin') {
      setIsSheetOpen(true);
    } else {
      revalidateMashongStatus();
      revalidateMashongMissionStatus();
      router.push('/mashong/mission-board');
    }
  };

  return (
    <>
      <styled.button type="button" cursor="pointer" onClick={onClick}>
        <SvgImage
          path={`main/icon-${variant}-button`}
          width={48}
          height={48}
          className={css({
            background: '#fff',
            borderRadius: 10,
            border: '1px solid #EBEFF9',
            padding: 9,
            marginBottom: 6,
          })}
        />
        <styled.span
          fontWeight={500}
          fontSize={14}
          lineHeight="16.7px"
          letterSpacing="-1%"
          color="#4D535E"
        >
          {children}
        </styled.span>
      </styled.button>
      {variant === 'checkin' && (
        <CheckInBottomSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)} />
      )}
    </>
  );
};
