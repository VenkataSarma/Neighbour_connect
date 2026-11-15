import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

const StyledView = styled(View);
const StyledText = styled(Text);

export const DashboardPage = ({ navigation }: any) => {
  return (
    <ScrollView className="flex-1 bg-slate-50 dark:bg-slate-950 px-6 py-8">
      <StyledView className="flex-row justify-between items-center mb-8">
        <StyledView>
          <StyledText className="text-2xl font-bold text-slate-900 dark:text-white">Hello, John!</StyledText>
          <StyledText className="text-slate-500 dark:text-slate-400">Explore your neighbourhood</StyledText>
        </StyledView>
        <Avatar size="md" />
      </StyledView>

      <StyledView className="grid-cols-2 gap-4 flex-row mb-8">
        <Card className="flex-1 mr-2 p-4 items-center justify-center">
          <StyledText className="text-2xl font-bold text-sky-500">12</StyledText>
          <StyledText className="text-xs text-slate-500 dark:text-slate-400 text-center">Activities Today</StyledText>
        </Card>
        <Card className="flex-1 ml-2 p-4 items-center justify-center">
          <StyledText className="text-2xl font-bold text-sky-500">45</StyledText>
          <StyledText className="text-xs text-slate-500 dark:text-slate-400 text-center">Connections</StyledText>
        </Card>
      </StyledView>

      <StyledText className="text-xl font-bold text-slate-900 dark:text-white mb-4">Nearby Activities</StyledText>

      {[1, 2, 3].map((i) => (
        <Card key={i} className="mb-4 p-0 overflow-hidden">
          <StyledView className="h-32 bg-sky-200 dark:bg-sky-900/30 w-full" />
          <StyledView className="p-4">
            <StyledView className="flex-row justify-between items-start mb-2">
              <StyledText className="font-bold text-lg text-slate-900 dark:text-white">Morning Yoga Session</StyledText>
              <Badge variant="success">Open</Badge>
            </StyledView>
            <StyledText className="text-slate-500 dark:text-slate-400 text-sm mb-4">
              Join us for a relaxing yoga session at Jubilee Hills Park.
            </StyledText>
            <TouchableOpacity
              onPress={() => navigation.navigate('ActivityDetail', { id: i })}
              className="bg-sky-500 p-3 rounded-xl items-center"
            >
              <StyledText className="text-white font-semibold">View Details</StyledText>
            </TouchableOpacity>
          </StyledView>
        </Card>
      ))}
    </ScrollView>
  );
};
