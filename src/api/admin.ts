import type { Category, RushHour, Subscription, Vacation, ZoneReport } from "../types/admin";
import api from "./axiosInit";

export const toggleZone = async (id: string, open: boolean) => {
  const res = await api.put(`/admin/zones/${id}/open`, { open });
  return res.data;
};


// Categories
export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get("/master/categories");
  return res.data;
};

export const updateCategoryRate = async ({
  id,
  rate,
}: {
  id: string;
  rate: number;
}): Promise<Category> => {
  const res = await api.put(`/admin/categories/${id}`, { rate });
  return res.data;
};



// Subscriptions
export const getSubscriptions = async (): Promise<Subscription[]> => {
  const res = await api.get("/admin/subscriptions");
  return res.data; 
};

export const getSubscriptionById = async (
  id: string
): Promise<Subscription> => {
  const res = await api.get(`/subscriptions/${id}`);
  return res.data;
};


// Reports
export const getParkingStateReport = async (): Promise<ZoneReport[]> => {
  const res = await api.get("/admin/reports/parking-state");
  return res.data;
};


// rush hours
export const addRushHour = async (data: {
  weekDay: number;
  from: string;
  to: string;
}): Promise<RushHour> => {
  const res = await api.post("/admin/rush-hours", data);
  return res.data;
};


// Vacations
export const addVacation = async (data: {
  name: string;
  from: string;
  to: string;
}): Promise<Vacation> => {
  const res = await api.post("/admin/vacations", data);
  return res.data;
};