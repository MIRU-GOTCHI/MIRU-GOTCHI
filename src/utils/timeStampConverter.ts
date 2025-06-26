import { Timestamp } from "firebase/firestore";

export const convertTimestampToDate = (timestamp: any): Date => {
  return timestamp?.toDate() || new Date();
};

type DataToConvert = Record<string, any>;
export const convertDatesToTimestamps = (data: DataToConvert): DataToConvert => {
  if (data === null || typeof data !== 'object') {
    return data;
  }

  if (data instanceof Date) {
    return Timestamp.fromDate(data); 
  }

  if (Array.isArray(data)) {
    return data.map(item => convertDatesToTimestamps(item));
  }

  return Object.keys(data).reduce((acc, key) => {
    acc[key] = convertDatesToTimestamps(data[key]);
    return acc;
  }, {} as DataToConvert);
};
