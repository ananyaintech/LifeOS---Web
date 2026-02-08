
/**
 * Room Entities: These represent the physical tables in our SQLite database.
 * We use simple types that are easy for Room to serialize.
 */

export interface DecisionEntity {
  id: string; // UUID
  title: string;
  description: string;
  mood_at_time: string; // Enum stored as string
  confidence: number;
  timestamp: number; // Long
  is_finalized: boolean; // 0 or 1 in SQLite
  outcome_note?: string;
  outcome_rating?: number;
}

export interface FactorEntity {
  id: string;
  decision_id: string; // Foreign Key to DecisionEntity.id
  type: 'PRO' | 'CON';
  content: string;
}

export interface CheckInEntity {
  id: string;
  mood: string;
  stress_level: number;
  energy_level: number;
  note: string;
  timestamp: number;
}

export interface InsightEntity {
  id: string;
  title: string;
  content: string;
  type: string;
  timestamp: number;
}
