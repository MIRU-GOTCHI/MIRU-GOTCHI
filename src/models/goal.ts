import type { CharacterStatus } from '@models/character';
import type { Timestamp } from 'firebase/firestore';

export interface Goal {
  id: string;
  userId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  characterId: string;
  characterStatus: CharacterStatus;
  successCount: number;
  failCount: number;
  totalDays: number;
  createdAt: Date;
  updatedAt: Date;
  status: 'in_progress' | 'completed' | 'failed';
}

export interface GoalFirestore {
  userId: string;
  title: string;
  description: string;
  startDate: Timestamp;
  endDate: Timestamp;
  characterId: string;
  characterStatus: CharacterStatus;
  successCount: number;
  failCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  status: 'in_progress' | 'completed' | 'failed';
}

export interface CreateGoalData {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  characterId: string;
  characterStatus: CharacterStatus;
  successCount: number;
  failCount: number;
  status?: 'in_progress' | 'completed' | 'failed';
}

export type UpdateGoalData = Partial<Omit<CreateGoalData, 'startDate' | 'endDate'>> & {
  startDate?: Date;
  endDate?: Date;
};
