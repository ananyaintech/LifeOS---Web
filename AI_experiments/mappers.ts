
import { DecisionEntity, FactorEntity, CheckInEntity, InsightEntity } from './entities';
import { DecisionWithFactors, Mood, EmotionCheckIn, Insight, FactorType } from './types';

/**
 * Mappers decouple the Database Schema from the UI logic.
 * In Kotlin, these are usually defined as extension functions:
 * e.g. fun DecisionEntity.toDomainModel(factors: List<FactorEntity>)
 */

export const mapDecisionToDomain = (
  entity: DecisionEntity, 
  factors: FactorEntity[]
): DecisionWithFactors => {
  return {
    id: entity.id,
    title: entity.title,
    description: entity.description,
    moodAtTime: entity.mood_at_time as Mood,
    confidence: entity.confidence,
    timestamp: entity.timestamp,
    isFinalized: entity.is_finalized,
    outcomeNote: entity.outcome_note,
    outcomeRating: entity.outcome_rating,
    factors: factors.map(f => ({
      id: f.id,
      decisionId: f.decision_id,
      type: f.type as FactorType,
      content: f.content
    }))
  };
};

export const mapCheckInToDomain = (entity: CheckInEntity): EmotionCheckIn => ({
  id: entity.id,
  mood: entity.mood as Mood,
  stressLevel: entity.stress_level,
  energyLevel: entity.energy_level,
  note: entity.note,
  timestamp: entity.timestamp
});

export const mapInsightToDomain = (entity: InsightEntity): Insight => ({
  id: entity.id,
  title: entity.title,
  content: entity.content,
  type: entity.type as any,
  timestamp: entity.timestamp
});

export const mapDomainToDecisionEntity = (model: DecisionWithFactors): DecisionEntity => ({
  id: model.id,
  title: model.title,
  description: model.description,
  mood_at_time: model.moodAtTime,
  confidence: model.confidence,
  timestamp: model.timestamp,
  is_finalized: model.isFinalized,
  outcome_note: model.outcomeNote,
  outcome_rating: model.outcomeRating
});
