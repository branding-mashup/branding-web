import Lottie from 'lottie-react';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { JoinRecruitCard } from '@/components/main';
import { PLATFORM_INTRODUCE, PLATFORM_RADIO_ITEMS, TPlatformName } from '@/constants';

import * as Styled from './PlatformIntroduceSection.styled';

const PlatformIntroduceSection = () => {
  const [isAnimationPause, setIsAnimationPause] = useState(false);
  const [currentSelectedPlatform, setCurrentSelectedPlatform] =
    useState<TPlatformName>('productDesign');
  const [currentRenderSlide, setCurrentRenderSlide] = useState<'A' | 'B'>('A');

  const { ref: platformIntroduceSectionRef, inView: isPlatformIntroduceSectionInView } =
    useInView();

  const refreshPlatformIntroduceSlideAnimation = () => {
    setCurrentRenderSlide((prevRenderSlide) => (prevRenderSlide === 'A' ? 'B' : 'A'));
  };

  const handleSelectPlatform = (platform: TPlatformName) => {
    if (platform === currentSelectedPlatform) return;

    refreshPlatformIntroduceSlideAnimation();
    setCurrentSelectedPlatform(platform);
  };

  const handlePauseSlideAnimation = () => {
    setIsAnimationPause(true);
  };

  const handleRunSlideAnimation = () => {
    setIsAnimationPause(false);
  };

  const introduceSlideArray = [
    ...PLATFORM_INTRODUCE[currentSelectedPlatform].map(
      ({ type, description, imageUrl, lottieData }, index) =>
        type === 'text' ? (
          <Styled.IntroduceTextCard key={`introduce-text-card-${index}`}>
            <Styled.IntroduceText>
              {description}
              <Styled.IntroduceGradientText aria-hidden>{description}</Styled.IntroduceGradientText>
            </Styled.IntroduceText>
            <Styled.LottieWrapper>
              <Lottie animationData={lottieData} />
            </Styled.LottieWrapper>
          </Styled.IntroduceTextCard>
        ) : (
          <Styled.IntroduceImageCard
            backgroundUrl={imageUrl ?? ''}
            key={`introduce-text-card-${index}`}
          />
        ),
    ),
    <JoinRecruitCard key={`introduce-text-card-${PLATFORM_INTRODUCE.productDesign.length}`} />,
  ];

  return (
    <Styled.PlatformIntroduceSection ref={platformIntroduceSectionRef}>
      <Styled.PlatformIntroduceLayout isInView={isPlatformIntroduceSectionInView}>
        <Styled.Title>
          <span>WE’RE</span>
          <Styled.GradientText>MASH-UP</Styled.GradientText>
        </Styled.Title>
        <Styled.Description>
          {
            '지식과 정보가 넘쳐나고 서로에게 새로운 도전을 시도할 수 있게\n큰 힘이 되어주는 멋진 매쉬업 팀들을 소개해드릴게요.'
          }
        </Styled.Description>
      </Styled.PlatformIntroduceLayout>

      <Styled.PlatformSlideLayout isInView={isPlatformIntroduceSectionInView}>
        <Styled.PlatformList>
          {PLATFORM_RADIO_ITEMS.map(({ displayName, name }) => (
            <Styled.Platform
              onClick={() => handleSelectPlatform(name)}
              isSelected={name === currentSelectedPlatform}
              key={name}
            >
              {displayName}
            </Styled.Platform>
          ))}
        </Styled.PlatformList>

        {currentRenderSlide === 'A' ? (
          <Styled.IntroduceSlideA
            onMouseOver={handlePauseSlideAnimation}
            onMouseOut={handleRunSlideAnimation}
            isAnimationPause={isAnimationPause}
          >
            {introduceSlideArray}
            {introduceSlideArray}
            {introduceSlideArray}
            {introduceSlideArray}
          </Styled.IntroduceSlideA>
        ) : (
          <Styled.IntroduceSlideB
            onMouseOver={handlePauseSlideAnimation}
            onMouseOut={handleRunSlideAnimation}
            isAnimationPause={isAnimationPause}
          >
            {introduceSlideArray}
            {introduceSlideArray}
            {introduceSlideArray}
            {introduceSlideArray}
          </Styled.IntroduceSlideB>
        )}
      </Styled.PlatformSlideLayout>
    </Styled.PlatformIntroduceSection>
  );
};

export default PlatformIntroduceSection;
