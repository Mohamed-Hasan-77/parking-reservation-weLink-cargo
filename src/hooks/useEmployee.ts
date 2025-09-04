import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getZones, checkInTicket, checkOutTicket, getGates } from "../api/employeeApi";



/** --- Zones ------------------------------------------------- */
export type Zone = {
  id: string;
  name: string;
  categoryId: string;
  gateIds: string[];
  totalSlots: number;
  occupied: number;
  open: boolean;
};

export const useZones = () => {
  return useQuery<Zone[]>({
    queryKey: ["zones"],
    queryFn: getZones,
  });
};

/** --- Gates ------------------------------------------------- */

/*
 {
      "id": "gate_1",
      "name": "Main Entrance",
      "zoneIds": [
        "zone_a",
        "zone_b",
        "zone_f"
      ],
      "location": "North"
    },
*/


type Gate = {
  id: string;
  name: string;
  zoneIds: string[];
  location: string;
};

export const useGates = () => {
  return useQuery<Gate[]>({
    queryKey: ["gates"],
    queryFn: getGates,
  });
};


/** --- CHECK-IN ------------------------------------------------- */
export type CheckInPayload = {
  gateId: string;
  zoneId: string;
  type?: "visitor" | "subscriber";
  subscriptionId?: string;
};

export type CheckInResponse = {
  ticket: {
    id: string;
    type: "visitor" | "subscriber";
    zoneId: string;
    gateId: string;
    checkinAt: string;
    checkoutAt: string | null;
  };
  zoneState: unknown; 
};

export const useCheckIn = () => {
  const queryClient = useQueryClient();

  return useMutation<CheckInResponse, Error, CheckInPayload>({
    mutationFn: checkInTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["zones"] });
    },
  });
};

/** --- CHECK-OUT ------------------------------------------------ */
export type CheckOutPayload = {
  ticketId: string;
  forceConvertToVisitor?: boolean;
};

export type CheckOutResponse = {
  ticketId: string;
  checkinAt: string;
  checkoutAt: string;
  durationHours: number;
  breakdown: Array<{
    from: string;
    to: string;
    hours: number;
    rateMode: "normal" | "special";
    rate: number;
    amount: number;
  }>;
  amount: number;
  zoneState: unknown; 
};

export const useCheckOut = () => {
  return useMutation<CheckOutResponse, Error, CheckOutPayload>({
    mutationFn: checkOutTicket,
  });
};