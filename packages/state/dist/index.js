import { solution, applyMove as applySolverMove, isAllFalse, isAllTrue } from '@app/solver';
// Game phase definitions
export var GamePhase;
(function (GamePhase) {
    GamePhase["Initial"] = "initial";
    GamePhase["PhaseOne"] = "phase_one";
    GamePhase["PhaseTwo"] = "phase_two";
    GamePhase["Completed"] = "completed"; // Successfully completed both phases
})(GamePhase || (GamePhase = {}));
// Main state management class
export class GameManager {
    // Internal state
    _gameState;
    _possibleMoves;
    _listeners = [];
    _solutions = [[], []];
    _phase = GamePhase.Initial;
    _moveHistory = [];
    constructor(initialState, possibleMoves) {
        this._gameState = [...initialState];
        this._possibleMoves = [...possibleMoves];
        // Calculate initial solutions
        this.updateSolutions();
    }
    // Getters
    get gameState() {
        return [...this._gameState];
    }
    get possibleMoves() {
        return [...this._possibleMoves];
    }
    get phase() {
        return this._phase;
    }
    get solutions() {
        return [
            [...this._solutions[0]],
            [...this._solutions[1]]
        ];
    }
    get currentPhaseSolution() {
        if (this._phase === GamePhase.PhaseTwo || this._phase === GamePhase.Completed) {
            return [...this._solutions[1]];
        }
        return [...this._solutions[0]];
    }
    get nextPhaseSolution() {
        if (this._phase === GamePhase.Initial || this._phase === GamePhase.PhaseOne) {
            return [...this._solutions[1]];
        }
        return null;
    }
    get isAllSame() {
        return isAllTrue(this._gameState) || isAllFalse(this._gameState);
    }
    get isAllTrue() {
        return isAllTrue(this._gameState);
    }
    get isAllFalse() {
        return isAllFalse(this._gameState);
    }
    get moveHistory() {
        return [...this._moveHistory];
    }
    // Methods for updating state
    applyMove(moveIndex) {
        if (moveIndex < 0 || moveIndex >= this._possibleMoves.length) {
            throw new Error(`Invalid move index: ${moveIndex}`);
        }
        const move = this._possibleMoves[moveIndex];
        this._gameState = applySolverMove(this._gameState, move);
        this._moveHistory.push(moveIndex);
        // Update phase based on new state
        this.updatePhase();
        // Recalculate solutions for the current state
        this.updateSolutions();
        // Notify listeners
        this.notifyListeners();
    }
    setCustomState(index, value) {
        if (index < 0 || index >= this._gameState.length) {
            throw new Error(`Invalid state index: ${index}`);
        }
        const newState = [...this._gameState];
        newState[index] = value;
        this._gameState = newState;
        this._moveHistory = []; // Reset move history for custom state
        // Reset phase for custom state
        this._phase = GamePhase.Initial;
        // Recalculate solutions for the new state
        this.updateSolutions();
        // Notify listeners
        this.notifyListeners();
    }
    reset(customState) {
        if (customState) {
            this._gameState = [...customState];
        }
        else {
            // Default to initial state from constructor
            this._gameState = [true, true, true, true, false, false];
        }
        this._moveHistory = []; // Reset move history
        this._phase = GamePhase.Initial; // Reset phase
        // Recalculate solutions for the reset state
        this.updateSolutions();
        // Notify listeners
        this.notifyListeners();
    }
    updatePhase() {
        // If all true or all false, we've reached phase one completion
        if ((isAllTrue(this._gameState) || isAllFalse(this._gameState)) &&
            this._phase === GamePhase.Initial) {
            this._phase = GamePhase.PhaseOne;
        }
        // If we were in phase one or phase two and all same, we're in phase two
        else if ((this._phase === GamePhase.PhaseOne || this._phase === GamePhase.PhaseTwo) &&
            (isAllTrue(this._gameState) || isAllFalse(this._gameState))) {
            this._phase = GamePhase.PhaseTwo;
        }
        // If we were in phase two and no longer all same, we're back to phase one
        else if (this._phase === GamePhase.PhaseTwo &&
            !(isAllTrue(this._gameState) || isAllFalse(this._gameState))) {
            this._phase = GamePhase.PhaseOne;
        }
        // If all true or all false, and we've been in phase two already, we're complete
        else if ((isAllTrue(this._gameState) || isAllFalse(this._gameState)) &&
            this._moveHistory.length > 0 &&
            this._phase === GamePhase.PhaseTwo) {
            this._phase = GamePhase.Completed;
        }
    }
    updateSolutions() {
        // Get solutions from solver
        this._solutions = solution(this._gameState, this._possibleMoves);
    }
    // Subscribe to state changes
    subscribe(listener) {
        this._listeners.push(listener);
        // Return unsubscribe function
        return () => {
            this._listeners = this._listeners.filter(l => l !== listener);
        };
    }
    notifyListeners() {
        for (const listener of this._listeners) {
            listener();
        }
    }
}
