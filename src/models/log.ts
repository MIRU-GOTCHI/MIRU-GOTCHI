import { Timestamp } from 'firebase/firestore';

export interface LogFirestore {
  goalId: string;
  date: Timestamp;
  checked: boolean;
  createdAt: Timestamp;
}

export interface Log {
  id: string;
  goalId: string;
  date: Date;
  checked: boolean;
  createdAt: Date;
}

export interface CreateLogData {
  date: Date;
  checked: boolean;
}
