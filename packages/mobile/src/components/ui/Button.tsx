import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { styled } from 'nativewind';

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  fullWidth = false
}: ButtonProps) => {
  const variants = {
    primary: 'bg-sky-500',
    secondary: 'bg-slate-200 dark:bg-slate-800',
    ghost: 'bg-transparent',
    danger: 'bg-red-500',
    outline: 'bg-transparent border border-slate-300 dark:border-slate-700',
  };

  const textVariants = {
    primary: 'text-white',
    secondary: 'text-slate-900 dark:text-white',
    ghost: 'text-slate-600 dark:text-slate-400',
    danger: 'text-white',
    outline: 'text-slate-900 dark:text-white',
  };

  return (
    <StyledTouchableOpacity
      onPress={onPress}
      disabled={loading}
      className={`${variants[variant]} ${fullWidth ? 'w-full' : ''} px-6 py-3 rounded-xl items-center justify-center flex-row`}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' || variant === 'danger' ? 'white' : '#64748b'} />
      ) : (
        <StyledText className={`${textVariants[variant]} font-semibold text-center`}>
          {title}
        </StyledText>
      )}
    </StyledTouchableOpacity>
  );
};
