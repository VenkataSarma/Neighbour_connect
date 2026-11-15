import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { styled } from 'nativewind';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';

const StyledView = styled(View);
const StyledText = styled(Text);

export const NotificationsPage = () => {
  const notifications = [1, 2, 3, 4];

  return (
    <StyledView className="flex-1 bg-slate-50 dark:bg-slate-950">
      <StyledView className="px-6 pt-12 pb-4">
        <StyledText className="text-2xl font-bold text-slate-900 dark:text-white">Notifications</StyledText>
      </StyledView>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.toString()}
        contentContainerStyle={{ padding: 24 }}
        renderItem={({ item }) => (
          <Card className="p-4 mb-4 flex-row gap-4">
            <Avatar size="md" />
            <StyledView className="flex-1">
              <StyledText className="font-bold text-slate-900 dark:text-white">New Request</StyledText>
              <StyledText className="text-slate-500 dark:text-slate-400 text-sm mb-2">
                Someone wants to join your activity!
              </StyledText>
              <StyledView className="flex-row justify-between items-center">
                <StyledText className="text-xs text-slate-400">1 hour ago</StyledText>
                <Badge variant="info">New</Badge>
              </StyledView>
            </StyledView>
          </Card>
        )}
      />
    </StyledView>
  );
};
