import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';

export const usePeople = (filters: any) => {
  return useQuery({
    queryKey: ['people', filters],
    queryFn: async () => {
      const { data } = await api.get('/people', { params: filters });
      return data;
    },
  });
};

export const useConnection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ targetUserId }: { targetUserId: string }) => {
      const { data } = await api.post('/connections/request', { targetUserId });
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['people', variables.targetUserId] });
    },
  });
};

export const useRespondToConnection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ connectionId, status }: { connectionId: string; status: 'accepted' | 'rejected' }) => {
      const { data } = await api.post(`/connections/${connectionId}/respond`, { status });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['people'] });
    },
  });
};
