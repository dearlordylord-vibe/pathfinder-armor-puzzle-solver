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

// Apply a move to a game state
export const applyMove = (state: GameState, move: Move): GameState => {
  const newState = [...state];
  for (const index of move) {
    newState[index] = !newState[index];
  }
  return newState;
};

// Check if all values in the state are the same
export const isAllSame = (state: GameState): boolean => {
  return state.every(value => value === state[0]);
};

// Check if all values in the state are true
export const isAllTrue = (state: GameState): boolean => {
  return state.every(value => value === true);
};

// Check if all values in the state are false
export const isAllFalse = (state: GameState): boolean => {
  return state.every(value => value === false);
};

// BFS to find a solution that satisfies a given target condition
export const findPath = (
  initialState: GameState, 
  possibleMoves: PossibleMoves, 
  isTargetState: (state: GameState) => boolean
): Solution => {
  const queue: { state: GameState; path: number[] }[] = [{ state: initialState, path: [] }];
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
        queue.push({ state: nextState, path: [...path, moveIndex] });
      }
    }
  }
  
  return []; // No solution found
};

// a Move toggles the booleans of GameState according to the indices
export const solution = (state: GameState, possibleMoves: PossibleMoves): Solutions => {
  // First solution: find a path to make all booleans the same (either all true or all false)
  const firstSolution = findPath(state, possibleMoves, isAllSame);
  
  // Apply the first solution to get to a state where all values are the same
  let currentState = [...state];
  for (const moveIndex of firstSolution) {
    currentState = applyMove(currentState, possibleMoves[moveIndex]);
  }
  
  // Check if we reached all true or all false and set the opposite as target
  const reachedAllTrue = isAllTrue(currentState);
  const targetValue = !reachedAllTrue;
  
  // Second solution: from the current state (all same), find a path to flip all values
  const secondSolution = findPath(
    currentState, 
    possibleMoves, 
    (state) => state.every(value => value === targetValue)
  );
  
  return [firstSolution, secondSolution];
};