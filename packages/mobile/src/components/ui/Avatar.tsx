import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

interface AvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
}

const SIZE_MAP = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-16 h-16 text-base',
  xl: 'w-20 h-20 text-lg',
};

export const Avatar = ({ size = 'md', fallback = 'U' }: AvatarProps) => {
  return (
    <StyledView className={`${SIZE_MAP[size]} rounded-full bg-sky-500 items-center justify-center`}>
      <StyledText className="text-white font-medium">
        {fallback.charAt(0).toUpperCase()}
      </StyledText>
    </StyledView>
  );
};
