
export enum Mood {
  EXCITED = 'Excited',
  CALM = 'Calm',
  STRESSED = 'Stressed',
  TIRED = 'Tired',
  ANXIOUS = 'Anxious',
  HAPPY = 'Happy'
}

export type FactorType = 'PRO' | 'CON';

export interface DecisionFactor {
  id: string;
  decisionId: string;
  type: FactorType;
  content: string;
}

export interface Decision {
  id: string;
  title: string;
  description: string;
  moodAtTime: Mood;
  confidence: number;
  timestamp: number;
  isFinalized: boolean;
  outcomeNote?: string;
  outcomeRating?: number;
}

// Data Transfer Object for UI - combines decision with its factors
export interface DecisionWithFactors extends Decision {
  factors: DecisionFactor[];
}

export interface EmotionCheckIn {
  id: string;
  mood: Mood;
  stressLevel: number;
  energyLevel: number;
  note: string;
  timestamp: number;
}

export interface Insight {
  id: string;
  title: string;
  content: string;
  type: 'pattern' | 'recommendation' | 'reflection' | 'summary';
  timestamp: number;
}

export type View = 'dashboard' | 'journal' | 'checkin' | 'insights';
