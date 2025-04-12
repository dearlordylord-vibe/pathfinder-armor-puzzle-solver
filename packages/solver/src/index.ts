import { pipe } from 'fp-ts/lib/function.js';
import * as A from 'fp-ts/lib/Array.js';
import * as O from 'fp-ts/lib/Option.js';

// n bools
export type GameState = boolean[]
// unique indices of GameState, and len(Move) < len(GameState)
export type Move = number[]
// len(PossibleMoves) <= len(GameState)
export type PossibleMoves = Move[]

// indices of Moves in PossibleMoves, can repeat, length unbounded
export type Solution = number[]
// one Solution is "all booleans in GameState are true"
// another Solution is "all booleans in GameState are false"
// order of Solutions doesn't matter
export type Solutions = [Solution, Solution]

// Apply a move to a game state (pure function)
export const applyMove = (state: GameState, move: Move): GameState => {
  return state.map((value, index) => 
    move.includes(index) ? !value : value
  );
};

// Check if all values in the state are the same
export const isAllSame = (state: GameState): boolean =>
  pipe(
    state,
    A.head,
    O.map(head => state.every(value => value === head)),
    O.getOrElse(() => true) // Empty array is considered all same
  );

// Check if all values in the state are true/false
export const isAllTrue = (state: GameState): boolean => state.every(value => value === true);
export const isAllFalse = (state: GameState): boolean => state.every(value => value === false);

// BFS to find a solution that satisfies a given target condition
export const findPath = (
  initialState: GameState, 
  possibleMoves: PossibleMoves, 
  isTargetState: (state: GameState) => boolean
): Solution => {
  const queue: { state: GameState; path: Solution }[] = [{ state: initialState, path: [] }];
  const visited = new Set<string>();
  
  visited.add(JSON.stringify(initialState));
  
  while (queue.length > 0) {
    const { state, path } = queue.shift()!;
    
    if (isTargetState(state)) {
      return path;
    }
    
    for (let moveIndex = 0; moveIndex < possibleMoves.length; moveIndex++) {
      const nextState = applyMove(state, possibleMoves[moveIndex]);
      const stateKey = JSON.stringify(nextState);
      
      if (!visited.has(stateKey)) {
        visited.add(stateKey);
        queue.push({ 
          state: nextState, 
          path: [...path, moveIndex] 
        });
      }
    }
  }
  
  return []; // No solution found
};

// Main solution function - using pipe pattern
export const solution = (state: GameState, possibleMoves: PossibleMoves): Solutions =>
  pipe(
    // First, find path to make all booleans the same
    findPath(state, possibleMoves, isAllSame),
    
    // Then compute state after first solution
    firstSolution => {
      const stateAfterFirst = firstSolution.reduce(
        (currentState, moveIndex) => applyMove(currentState, possibleMoves[moveIndex]),
        [...state]
      );
      
      // Determine the target for second solution
      const targetForSecond = !isAllTrue(stateAfterFirst);
      
      // Find the second solution
      const secondSolution = findPath(
        stateAfterFirst,
        possibleMoves,
        targetForSecond ? isAllTrue : isAllFalse
      );
      
      return [firstSolution, secondSolution] as Solutions;
    }
  );