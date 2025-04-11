import { solution, applyMove, GameState, isAllTrue, isAllFalse } from '../index.js';

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
    console.log('First solution:', firstSolution);
    console.log('State after first solution:', stateAfterFirstSolution);
    console.log('All true after first solution:', allTrue);
    console.log('All false after first solution:', allFalse);
    
    // Apply the second solution to the state after first solution
    let finalState = [...stateAfterFirstSolution];
    for (const moveIndex of secondSolution) {
      finalState = applyMove(finalState, possibleMoves[moveIndex]);
    }
    
    // Check that all values are the opposite after second solution
    const finalAllTrue = isAllTrue(finalState);
    const finalAllFalse = isAllFalse(finalState);
    console.log('Second solution:', secondSolution);
    console.log('Final state:', finalState);
    console.log('All true after second solution:', finalAllTrue);
    console.log('All false after second solution:', finalAllFalse);
    
    // Assert that first solution makes all values the same
    expect(allTrue || allFalse).toBe(true);
    
    // Assert that second solution flips all values
    if (allTrue) {
      expect(finalAllFalse).toBe(true);
    } else {
      expect(finalAllTrue).toBe(true);
    }
    
    // Expected solutions based on previous verification
    expect(firstSolution).toEqual([0, 1, 4]);
    expect(secondSolution).toEqual([0, 5]);
  });
});