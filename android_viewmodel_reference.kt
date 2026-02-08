
/*
 * REFERENCE KOTLIN CODE (ViewModel & Repository)
 * This file is for your learning only and is not executed in the web environment.
 */

package com.lifeos.ui.viewmodel

import androidx.lifecycle.*
import com.lifeos.data.repository.LifeRepository
import com.lifeos.domain.model.Decision
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

class MainViewModel(private val repository: LifeRepository) : ViewModel() {

    private val _uiState = MutableStateFlow(MainUiState())
    val uiState: StateFlow<MainUiState> = _uiState.asStateFlow()

    init {
        loadInitialData()
    }

    private fun loadInitialData() {
        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true) }
            try {
                // In a real app, combine these into one Flow for reactive updates
                val decisions = repository.getDecisions()
                val checkins = repository.getCheckIns()
                _uiState.update { it.copy(
                    decisions = decisions,
                    checkins = checkins,
                    isLoading = false
                )}
            } catch (e: Exception) {
                _uiState.update { it.copy(error = e.message, isLoading = false) }
            }
        }
    }

    fun addDecision(title: String, desc: String, mood: String, conf: Int) {
        viewModelScope.launch {
            repository.createDecision(title, desc, mood, conf)
            loadInitialData() // Refresh
        }
    }
}

data class MainUiState(
    val decisions: List<Decision> = emptyList(),
    val checkins: List<CheckIn> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null
)
