import type { GrowthStage } from '@models/common';
export interface Character {
  id: string;
  name: string;
  type: string;
  description: string;
}

export interface CharacterStatus {
  growthStage: GrowthStage;
  level: number;
  gone?: boolean;
}
