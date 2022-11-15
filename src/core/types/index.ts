export interface GraphData {
  date: string;
  targetAmount: number;
  currentUsage: number;
}

export interface Usage {
  graphData: GraphData[];
  monthly: number;
  total: number;
}

export interface Message {
  message: string;
  date: string;
}

export interface Tariff {
  price: number;
  priceChange: number;
}

export interface Account {
  balance: number;
}

export const TypeHelper = {
  isUsage: (obj: any): obj is Usage => {
    return obj.graphData && obj.monthly && obj.total;
  },

  isMessage: (obj: any): obj is Message => {
    return obj.message && obj.date;
  },

  isTariff: (obj: any): obj is Tariff => {
    return obj.priceChange !== undefined && obj.price !== undefined;
  },

  isAccount: (obj: any): obj is Account => {
    return obj.balance !== undefined;
  },

  isArray: (obj: any): obj is Array<any> => {
    return Array.isArray(obj);
  },

  isArrayOfMessages: (obj: any): obj is Array<Message> => {
    return Array.isArray(obj) && obj.every((item) => item.message && item.date);
  },
};
