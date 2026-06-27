import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { HospitalsService, NeedsService } from '../services/api.js';
import { QUERY_KEYS } from '../config/constants.js';

export const useHospitals = ({ state = '', city = '', page = 1 } = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.HOSPITALS, state, city, page],
    queryFn: () => HospitalsService.getAll({ state, city, page }),
    retry: 3,
    staleTime: 1000 * 60,
    placeholderData: keepPreviousData, // mantiene la página anterior visible al cambiar de página
  });
};

export const useCreateHospital = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => HospitalsService.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.HOSPITALS] }),
  });
};

export const useCreateNeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => NeedsService.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.HOSPITALS] }),
  });
};

export const useUpdateNeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => NeedsService.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.HOSPITALS] }),
  });
};
