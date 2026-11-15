import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';

const StyledView = styled(View);
const StyledText = styled(Text);

export const ProfilePage = ({ route }: any) => {
  return (
    <ScrollView className="flex-1 bg-slate-50 dark:bg-slate-950 px-6 py-8">
      <StyledView className="items-center mb-8">
        <Avatar size="xl" />
        <StyledText className="text-2xl font-bold text-slate-900 dark:text-white mt-4">John Doe</StyledText>
        <StyledText className="text-slate-500 dark:text-slate-400">@johndoe</StyledText>
      </StyledView>

      <StyledView className="flex-row justify-center gap-4 mb-8">
        <Button title="Message" variant="outline" />
        <Button title="Connect" />
      </StyledView>

      <Card className="p-6 mb-6">
        <StyledText className="font-bold text-slate-900 dark:text-white mb-2">About Me</StyledText>
        <StyledText className="text-slate-500 dark:text-slate-400 leading-6">
          Yoga enthusiast and nature lover. I love organizing group runs and meditation sessions in the neighbourhood.
        </StyledText>
      </Card>

      <StyledText className="text-xl font-bold text-slate-900 dark:text-white mb-4">My Activities</StyledText>
      {[1, 2].map((i) => (
        <Card key={i} className="p-4 mb-4 flex-row items-center gap-4">
          <StyledView className="w-12 h-12 bg-sky-100 dark:bg-sky-900 rounded-lg" />
          <StyledView className="flex-1">
            <StyledText className="font-bold text-slate-900 dark:text-white">Morning Yoga {i}</StyledText>
            <StyledText className="text-slate-500 dark:text-slate-400 text-sm">Tomorrow, 6:00 AM</StyledText>
          </StyledView>
        </Card>
      ))}
    </ScrollView>
  );
};
