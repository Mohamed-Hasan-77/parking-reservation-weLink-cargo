import api from "./axiosInit";

// get zones
export const getZones = async () => {
  const res = await api.get("/master/zones");
  return res.data;
};

// get gates
export const getGates = async () => {
  const res = await api.get("/master/gates");
  return res.data;
};


// check in
export const checkInTicket = async (payload: { 
  gateId: string; 
  zoneId: string; 
  type?: "visitor" | "subscriber"; 
  subscriptionId?: string;
}) => {
  const res = await api.post("/tickets/checkin", payload);
  return res.data; // بيرجع { ticket, zoneState }
};

// check out
export const checkOutTicket = async (payload: { ticketId: string; forceConvertToVisitor?: boolean }) => {
  const res = await api.post("/tickets/checkout", payload);
  return res.data; 
};


