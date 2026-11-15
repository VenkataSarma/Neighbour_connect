import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

const StyledView = styled(View);
const StyledText = styled(Text);

export const ActivityDetailPage = ({ route, navigation }: any) => {
  const { id } = route.params;

  return (
    <ScrollView className="flex-1 bg-white dark:bg-slate-950">
      <StyledView className="h-64 bg-sky-200 dark:bg-sky-900/30 w-full" />

      <StyledView className="px-6 -mt-8">
        <Card className="p-6 bg-white dark:bg-slate-900 shadow-xl rounded-3xl">
          <StyledView className="flex-row justify-between items-center mb-4">
            <Badge variant="success">Open</Badge>
            <Badge variant="info">Sports</Badge>
          </StyledView>

          <StyledText className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Morning Yoga Session {id}
          </StyledText>

          <StyledText className="text-slate-500 dark:text-slate-400 leading-6 mb-6">
            Join us for a relaxing yoga session at Jubilee Hills Park. Perfect for all levels.
          </StyledText>

          <StyledView className="space-y-4 mb-8">
            <Card className="p-3 flex-row items-center gap-3">
              <StyledText className="text-slate-400 w-20">Date</StyledText>
              <StyledText className="text-slate-900 dark:text-white font-medium">Tomorrow, 6AM</StyledText>
            </Card>
            <Card className="p-3 flex-row items-center gap-3">
              <StyledText className="text-slate-400 w-20">Location</StyledText>
              <StyledText className="text-slate-900 dark:text-white font-medium">Jubilee Hills</StyledText>
            </Card>
          </StyledView>

          <Button title="Join Activity" fullWidth />
        </Card>

        <StyledView className="mt-8 mb-10">
          <StyledText className="text-xl font-bold text-slate-900 dark:text-white mb-4">Organized By</StyledText>
          <Card className="p-4 flex-row items-center gap-4">
            <Avatar size="md" />
            <StyledView className="flex-1">
              <StyledText className="font-bold text-slate-900 dark:text-white">John Doe</StyledText>
              <StyledText className="text-slate-500 dark:text-slate-400 text-sm">Yoga Instructor</StyledText>
            </StyledView>
            <Button title="Profile" variant="outline" />
          </Card>
        </StyledView>
      </StyledView>
    </ScrollView>
  );
};
