export type Category = {
    id: string;
    name: string;
    rateNormal: number;
    rateSpecial: number;
};


export type Car = {
  plate: string;
  brand: string;
  model: string;
  color: string;
};

export type Subscription = {
  id: string;
  userName: string;
  active: boolean;
  category: string;
  cars: Car[];
  startsAt: string;
  expiresAt: string;
  currentCheckins: string[]; 
};



export type ZoneReport = {
  zoneId: string;
  name: string;
  totalSlots: number;
  occupied: number;
  free: number;
  reserved: number;
  subscriberCount: number;
  availableForSubscribers: number;
  availableForVisitors: number;
  open: boolean;
};


export type RushHour = {
  id: string;
  weekDay: number; 
  from: string;    
  to: string;     
}


export type Vacation = {
  id: string;
  name: string;
  from: string; 
  to: string;   
};