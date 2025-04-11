
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

// a Move toggles the booleans of GameState according to the indices

const solution = (state: GameState, possibleMoves: PossibleMoves): Solutions => {
  // note that once one Solution is found, the other Solution is not being searched from the Initial state but continues to be searched from the Solved state the 1st solution led the GameState to: all true or all false
}

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
