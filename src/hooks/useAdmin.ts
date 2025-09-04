import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addRushHour, addVacation, getCategories, getParkingStateReport, getSubscriptionById, getSubscriptions, toggleZone, updateCategoryRate } from "../api/admin";
import type { Category, Subscription, ZoneReport } from "../types/admin";


// toggle zone status
export const useToggleZone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, open }: { id: string; open: boolean }) =>
    toggleZone(id, open),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["zones"] });
    },
  });
};


// fetch categories
export const useCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

// update category rate
export const useUpdateCategoryRate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, rate }: { id: string; rate: number }) =>
      updateCategoryRate({ id, rate }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};


// ==== Subscriptions
export const useSubscriptions = () => {
  return useQuery<Subscription[]>({
    queryKey: ["subscriptions"],
    queryFn: getSubscriptions,
  });
};

export const useSubscriptionById = (id: string) => {
  return useQuery<Subscription>({
    queryKey: ["subscription", id],
    queryFn: () => getSubscriptionById(id),
    enabled: !!id,
  });
};




// ==== Reports 
export const useParkingStateReport = () => {
  return useQuery<ZoneReport[]>({
    queryKey: ["parkingStateReport"],
    queryFn: getParkingStateReport,
  });
};


// rush hours 
export const useAddRushHour = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addRushHour,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rushHours"] });
    },
  });
};



// vacations
export const useAddVacation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addVacation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vacations"] });
    },
  });
};