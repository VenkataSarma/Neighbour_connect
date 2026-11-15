import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
}

const VARIANT_MAP = {
  default: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
  success: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
  warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
  danger: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
  info: 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400',
};

export const Badge = ({ children, variant = 'default', size = 'sm' }: BadgeProps) => {
  return (
    <StyledView className={`${VARIANT_MAP[variant]} ${size === 'sm' ? 'px-2 py-0.5' : 'px-3 py-1'} rounded-full`}>
      <StyledText className={`text-xs font-medium ${VARIANT_MAP[variant].split(' ')[0] === 'bg-transparent' ? '' : ''}`}>
        {children}
      </StyledText>
    </StyledView>
  );
};
