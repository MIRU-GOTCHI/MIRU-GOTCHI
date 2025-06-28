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

// 특정 날짜의 시작 시점 (00:00:00.000)을 Timestamp로 반환
export const getStartOfDayTimestamp = (date: Date): Timestamp => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  return Timestamp.fromDate(startOfDay);
};

// 특정 날짜의 끝 시점 (23:59:59.999)을 Timestamp로 반환
export const getEndOfOfDayTimestamp = (date: Date): Timestamp => {
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  return Timestamp.fromDate(endOfDay);
};
