import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { styled } from 'nativewind';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

export const ActivitiesPage = ({ navigation }: any) => {
  return (
    <ScrollView className="flex-1 bg-slate-50 dark:bg-slate-950 px-6 py-8">
      <StyledText className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Discover</StyledText>
      <StyledText className="text-slate-500 dark:text-slate-400 mb-6">Find activities near you</StyledText>

      <StyledTextInput
        placeholder="Search activities..."
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl mb-6 text-slate-900 dark:text-white"
      />

      <StyledView className="flex-row gap-2 mb-6">
        {['All', 'Sports', 'Travel', 'Gaming', 'Social'].map((cat) => (
          <Badge key={cat} variant={cat === 'All' ? 'default' : 'info'}>{cat}</Badge>
        ))}
      </StyledView>

      {[1, 2, 3, 4, 5].map((i) => (
        <Card key={i} className="mb-4 p-0 overflow-hidden">
          <StyledView className="h-32 bg-slate-200 dark:bg-slate-800 w-full" />
          <StyledView className="p-4">
            <StyledView className="flex-row justify-between items-start mb-2">
              <StyledText className="font-bold text-lg text-slate-900 dark:text-white">Activity {i}</StyledText>
              <Badge variant="success">Open</Badge>
            </StyledView>
            <StyledText className="text-slate-500 dark:text-slate-400 text-sm mb-4">
              Description of the activity goes here. Join the community!
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
