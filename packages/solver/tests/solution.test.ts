import { solution, applyMove, GameState, isAllTrue, isAllFalse } from '../src/index.js';
import { describe, it, expect } from 'vitest';

describe('Pathfinder Puzzle Solver', () => {
  it('should find solutions for the game state [true, true, true, true, false, false]', () => {
    const gameState: GameState = [true, true, true, true, false, false];
    const possibleMoves = [
      [0, 1, 3],
      [1, 0],
      [2, 5],
      [3, 0, 4],
      [4, 5, 3],
      [5, 4, 2]
    ];

    const [firstSolution, secondSolution] = solution(gameState, possibleMoves);
    
    // Apply the first solution and verify that all values are the same
    let stateAfterFirstSolution = [...gameState];
    for (const moveIndex of firstSolution) {
      stateAfterFirstSolution = applyMove(stateAfterFirstSolution, possibleMoves[moveIndex]);
    }
    
    // Check that all values are the same after first solution
    const allTrue = isAllTrue(stateAfterFirstSolution);
    const allFalse = isAllFalse(stateAfterFirstSolution);
    
    // Assert that first solution makes all values the same
    expect(allTrue || allFalse).toBe(true);
    
    // Apply the second solution to the state after first solution
    let finalState = [...stateAfterFirstSolution];
    for (const moveIndex of secondSolution) {
      finalState = applyMove(finalState, possibleMoves[moveIndex]);
    }
    
    // Assert that second solution flips all values
    if (allTrue) {
      expect(isAllFalse(finalState)).toBe(true);
    } else {
      expect(isAllTrue(finalState)).toBe(true);
    }
  });
});