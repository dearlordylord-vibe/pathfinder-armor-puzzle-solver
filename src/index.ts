// n bools
type GameState = boolean[]
// unique indices of GameState, and len(Move) < len(GameState)
type Move = number[]
// len(PossibleMoves) <= len(GameState)
type PossibleMoves = Move[]

// indices of Moves in PossibleMoves, can repeat, length unbounded
type Solution = number[]
// one Solution is "all booleans in GameState are true"
// another Solution is "all booleans in GameState are false"
// order of Solutions doesn't matter
type Solutions = [Solution, Solution]

// Apply a move to a game state
const applyMove = (state: GameState, move: Move): GameState => {
  const newState = [...state];
  for (const index of move) {
    newState[index] = !newState[index];
  }
  return newState;
};

// Check if all values in the state are the same
const isAllSame = (state: GameState): boolean => {
  return state.every(value => value === state[0]);
};

// Check if all values in the state are true
const isAllTrue = (state: GameState): boolean => {
  return state.every(value => value === true);
};

// Check if all values in the state are false
const isAllFalse = (state: GameState): boolean => {
  return state.every(value => value === false);
};

// a Move toggles the booleans of GameState according to the indices
const solution = (state: GameState, possibleMoves: PossibleMoves): Solutions => {
  // First solution: find a path to make all booleans the same (either all true or all false)
  const firstSolution = findSolution(state, possibleMoves);
  
  // Apply the first solution to get to a state where all values are the same
  let currentState = [...state];
  for (const moveIndex of firstSolution) {
    currentState = applyMove(currentState, possibleMoves[moveIndex]);
  }
  
  // Check if we reached all true or all false
  const reachedAllTrue = isAllTrue(currentState);
  
  // Second solution: from the current state (all same), find a path to flip all values
  const secondTarget = reachedAllTrue ? false : true;
  const secondSolution = findSecondSolution(currentState, possibleMoves, secondTarget);
  
  return [firstSolution, secondSolution];
};

// BFS to find a solution that makes all booleans the same
const findSolution = (initialState: GameState, possibleMoves: PossibleMoves): Solution => {
  const queue: { state: GameState; path: number[] }[] = [{ state: initialState, path: [] }];
  const visited = new Set<string>();
  
  visited.add(JSON.stringify(initialState));
  
  while (queue.length > 0) {
    const { state, path } = queue.shift()!;
    
    if (isAllSame(state)) {
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

// BFS to find a solution that flips all booleans to the target value
const findSecondSolution = (initialState: GameState, possibleMoves: PossibleMoves, targetValue: boolean): Solution => {
  const queue: { state: GameState; path: number[] }[] = [{ state: initialState, path: [] }];
  const visited = new Set<string>();
  
  visited.add(JSON.stringify(initialState));
  
  while (queue.length > 0) {
    const { state, path } = queue.shift()!;
    
    if (state.every(value => value === targetValue)) {
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

const gameState = [true, true, true, true, false, false];
// note that in this specific instance of game, every first index coincides with the index of the possible move itself
// and also n of possible moves = length of game state
const possibleMoves = [
  [0, 1, 3],
  [1, 0],
  [2, 5],
  [3, 0, 4],
  [4, 5, 3],
  [5, 4, 2]
];

console.log(solution(gameState, possibleMoves));