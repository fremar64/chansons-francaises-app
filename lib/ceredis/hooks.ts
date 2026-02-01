import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { calculateUserScore, getCachedUserScore } from './client';

/**
 * Hook pour charger le score CEREDIS d'un utilisateur
 *
 * Usage :
 * const { data, isLoading, error, refetch } = useCeredisScore(userId);
 */
export function useCeredisScore(userId: string) {
  return useQuery({
    queryKey: ['ceredis-score', userId],
    queryFn: async () => {
      const cached = await getCachedUserScore(userId);
      if (cached) return cached;
      return calculateUserScore(userId);
    },
    enabled: Boolean(userId),
    retry: 1
  });
}

/**
 * Hook pour recalculer le score CEREDIS
 *
 * Usage :
 * const { mutate: recalculate, isPending } = useRecalculateCeredisScore();
 * recalculate(userId);
 */
export function useRecalculateCeredisScore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: calculateUserScore,
    onSuccess: (data) => {
      queryClient.setQueryData(['ceredis-score', data.userId], data);
      queryClient.invalidateQueries({ queryKey: ['ceredis-score', data.userId] });
    }
  });
}
