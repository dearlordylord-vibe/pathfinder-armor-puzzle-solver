import { pipe } from 'fp-ts/lib/function.js';
import * as A from 'fp-ts/lib/Array.js';
import * as O from 'fp-ts/lib/Option.js';
// Apply a move to a game state (pure function)
export const applyMove = (state, move) => {
    return state.map((value, index) => move.includes(index) ? !value : value);
};
// Check if all values in the state are the same
export const isAllSame = (state) => pipe(state, A.head, O.map(head => state.every(value => value === head)), O.getOrElse(() => true) // Empty array is considered all same
);
// Check if all values in the state are true/false
export const isAllTrue = (state) => state.every(value => value === true);
export const isAllFalse = (state) => state.every(value => value === false);
// BFS to find a solution that satisfies a given target condition
export const findPath = (initialState, possibleMoves, isTargetState) => {
    const queue = [{ state: initialState, path: [] }];
    const visited = new Set();
    visited.add(JSON.stringify(initialState));
    while (queue.length > 0) {
        const { state, path } = queue.shift();
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
export const solution = (state, possibleMoves) => pipe(
// First, find path to make all booleans the same
findPath(state, possibleMoves, isAllSame), 
// Then compute state after first solution
firstSolution => {
    const stateAfterFirst = firstSolution.reduce((currentState, moveIndex) => applyMove(currentState, possibleMoves[moveIndex]), [...state]);
    // Determine the target for second solution
    const targetForSecond = !isAllTrue(stateAfterFirst);
    // Find the second solution
    const secondSolution = findPath(stateAfterFirst, possibleMoves, targetForSecond ? isAllTrue : isAllFalse);
    return [firstSolution, secondSolution];
});
