import { GameState, PossibleMoves, Solution } from '@app/solver';
export declare enum GamePhase {
    Initial = "initial",// Starting phase
    PhaseOne = "phase_one",// Working on making all tiles the same
    PhaseTwo = "phase_two",// Working on flipping all tiles to the opposite
    Completed = "completed"
}
type Listener = () => void;
export declare class GameManager {
    private _gameState;
    private _possibleMoves;
    private _listeners;
    private _solutions;
    private _phase;
    private _moveHistory;
    constructor(initialState: GameState, possibleMoves: PossibleMoves);
    get gameState(): GameState;
    get possibleMoves(): PossibleMoves;
    get phase(): GamePhase;
    get solutions(): [Solution, Solution];
    get currentPhaseSolution(): Solution;
    get nextPhaseSolution(): Solution | null;
    get isAllSame(): boolean;
    get isAllTrue(): boolean;
    get isAllFalse(): boolean;
    get moveHistory(): number[];
    applyMove(moveIndex: number): void;
    setCustomState(index: number, value: boolean): void;
    reset(customState?: GameState): void;
    private updatePhase;
    private updateSolutions;
    subscribe(listener: Listener): () => void;
    private notifyListeners;
}
export {};
