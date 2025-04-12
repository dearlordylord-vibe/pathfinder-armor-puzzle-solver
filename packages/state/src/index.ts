import { GameState, Move, PossibleMoves, Solution, solution, applyMove as applySolverMove, isAllFalse, isAllTrue } from '@app/solver';

// Game phase definitions
export enum GamePhase {
  Initial = 'initial',    // Starting phase
  PhaseOne = 'phase_one', // Working on making all tiles the same
  PhaseTwo = 'phase_two', // Working on flipping all tiles to the opposite
  Completed = 'completed' // Successfully completed both phases
}

// Subscription type
type Listener = () => void;

// Main state management class
export class GameManager {
  // Internal state
  private _gameState: GameState;
  private _possibleMoves: PossibleMoves;
  private _listeners: Listener[] = [];
  private _solutions: [Solution, Solution] = [[], []];
  private _phase: GamePhase = GamePhase.Initial;
  private _moveHistory: number[] = [];

  constructor(initialState: GameState, possibleMoves: PossibleMoves) {
    this._gameState = [...initialState];
    this._possibleMoves = [...possibleMoves];
    
    // Calculate initial solutions
    this.updateSolutions();
  }

  // Getters
  get gameState(): GameState {
    return [...this._gameState];
  }

  get possibleMoves(): PossibleMoves {
    return [...this._possibleMoves];
  }

  get phase(): GamePhase {
    return this._phase;
  }

  get solutions(): [Solution, Solution] {
    return [
      [...this._solutions[0]], 
      [...this._solutions[1]]
    ];
  }

  get currentPhaseSolution(): Solution {
    if (this._phase === GamePhase.PhaseTwo || this._phase === GamePhase.Completed) {
      return [...this._solutions[1]];
    }
    return [...this._solutions[0]];
  }

  get nextPhaseSolution(): Solution | null {
    if (this._phase === GamePhase.Initial || this._phase === GamePhase.PhaseOne) {
      return [...this._solutions[1]];
    }
    return null;
  }

  get isAllSame(): boolean {
    return isAllTrue(this._gameState) || isAllFalse(this._gameState);
  }

  get isAllTrue(): boolean {
    return isAllTrue(this._gameState);
  }

  get isAllFalse(): boolean {
    return isAllFalse(this._gameState);
  }

  get moveHistory(): number[] {
    return [...this._moveHistory];
  }

  // Methods for updating state
  applyMove(moveIndex: number): void {
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

  setCustomState(index: number, value: boolean): void {
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

  reset(customState?: GameState): void {
    if (customState) {
      this._gameState = [...customState];
    } else {
      // Default to initial state from constructor
      this._gameState = [false, true, false, true, false, true];
    }
    
    this._moveHistory = []; // Reset move history
    this._phase = GamePhase.Initial; // Reset phase
    
    // Recalculate solutions for the reset state
    this.updateSolutions();
    
    // Notify listeners
    this.notifyListeners();
  }

  private updatePhase(): void {
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

  private updateSolutions(): void {
    // Get solutions from solver
    this._solutions = solution(this._gameState, this._possibleMoves);
  }

  // Subscribe to state changes
  subscribe(listener: Listener): () => void {
    this._listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      this._listeners = this._listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    for (const listener of this._listeners) {
      listener();
    }
  }
}