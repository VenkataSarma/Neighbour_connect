import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

interface InputProps {
  label?: string;
  placeholder?: string;
  error?: string;
  hint?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  ...rest: any;
}

export const Input = ({ label, placeholder, error, hint, ...props }: InputProps) => {
  return (
    <StyledView className="w-full mb-4">
      {label && (
        <StyledText className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          {label}
        </StyledText>
      )}
      <StyledTextInput
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-white dark:bg-slate-900 border ${
          error ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
        } rounded-xl text-slate-900 dark:text-white`}
        {...props}
      />
      {hint && !error && (
        <StyledText className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">{hint}</StyledText>
      )}
      {error && (
        <StyledText className="text-xs text-red-500 mt-1.5">{error}</StyledText>
      )}
    </StyledView>
  );
};
