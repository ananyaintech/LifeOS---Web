
/*
 * REFERENCE KOTLIN CODE (Room Implementation)
 * This file is for your learning only and is not executed in the web environment.
 */

package com.lifeos.data.local

import androidx.room.*

@Entity(tableName = "decisions")
data class DecisionEntity(
    @PrimaryKey val id: String,
    val title: String,
    val description: String,
    @ColumnInfo(name = "mood_at_time") val moodAtTime: String,
    val confidence: Int,
    val timestamp: Long,
    @ColumnInfo(name = "is_finalized") val isFinalized: Boolean,
    @ColumnInfo(name = "outcome_note") val outcomeNote: String?,
    @ColumnInfo(name = "outcome_rating") val outcomeRating: Int?
)

@Entity(
    tableName = "factors",
    foreignKeys = [
        ForeignKey(
            entity = DecisionEntity::class,
            parentColumns = ["id"],
            childColumns = ["decision_id"],
            onDelete = ForeignKey.CASCADE
        )
    ]
)
data class FactorEntity(
    @PrimaryKey val id: String,
    @ColumnInfo(name = "decision_id") val decisionId: String,
    val type: String, // "PRO" or "CON"
    val content: String
)

data class DecisionWithFactors(
    @Embedded val decision: DecisionEntity,
    @Relation(
        parentColumn = "id",
        entityColumn = "decision_id"
    )
    val factors: List<FactorEntity>
)

@Dao
interface DecisionDao {
    @Transaction
    @Query("SELECT * FROM decisions ORDER BY timestamp DESC")
    fun getAllDecisions(): List<DecisionWithFactors>

    @Insert
    fun insertDecision(decision: DecisionEntity)

    @Insert
    fun insertFactors(factors: List<FactorEntity>)

    @Update
    fun updateDecision(decision: DecisionEntity)
}
