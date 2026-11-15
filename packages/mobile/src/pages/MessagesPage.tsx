import React from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import { styled } from 'nativewind';
import { Avatar } from '../components/ui/Avatar';
import { Card } from '../components/ui/Card';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

export const MessagesPage = () => {
  const conversations = [1, 2, 3, 4, 5];

  return (
    <StyledView className="flex-1 bg-white dark:bg-slate-950">
      <StyledView className="px-6 pt-12 pb-4 border-b border-slate-100 dark:border-slate-800">
        <StyledText className="text-2xl font-bold text-slate-900 dark:text-white">Messages</StyledText>
      </StyledView>

      <FlatList
        data={conversations}
        keyExtractor={(item) => item.toString()}
        contentContainerStyle={{ padding: 24 }}
        renderItem={({ item }) => (
          <Card className="p-4 mb-4 flex-row items-center gap-4">
            <Avatar size="md" />
            <StyledView className="flex-1">
              <StyledView className="flex-row justify-between mb-1">
                <StyledText className="font-bold text-slate-900 dark:text-white">User {item}</StyledText>
                <StyledText className="text-xs text-slate-400">2m ago</StyledText>
              </StyledView>
              <StyledText className="text-slate-500 dark:text-slate-400 text-sm" numberOfLines={1}>
                Hey, are we still meeting up tomorrow?
              </StyledText>
            </StyledView>
          </Card>
        )}
      />
    </StyledView>
  );
};
