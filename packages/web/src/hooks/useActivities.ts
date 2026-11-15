import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';

export const useActivities = (filters: any) => {
  return useQuery({
    queryKey: ['activities', filters],
    queryFn: async () => {
      const { data } = await api.get('/activities', { params: filters });
      return data;
    },
  });
};

export const useActivity = (id: string) => {
  return useQuery({
    queryKey: ['activity', id],
    queryFn: async () => {
      const { data } = await api.get(`/activities/${id}`);
      return data;
    },
  });
};

export const useCreateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (activityData: any) => {
      const { data } = await api.post('/activities', activityData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });
};

export const useJoinActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ activityId }: { activityId: string }) => {
      const { data } = await api.post(`/activities/${activityId}/join`);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['activity', variables.activityId] });
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });
};

export const useLeaveActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ activityId }: { activityId: string }) => {
      const { data } = await api.post(`/activities/${activityId}/leave`);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['activity', variables.activityId] });
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });
};
