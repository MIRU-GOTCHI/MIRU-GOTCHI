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
}
