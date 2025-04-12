import { useState, useEffect } from 'react'
import './App.css'
import { GameBoard } from './components/GameBoard'
import { Controls } from './components/Controls'
import { GameState, Move, PossibleMoves } from '@app/solver'
import { GameManager, GamePhase } from '@app/state'

// Define the initial game state with 6 booleans - custom configuration
const initialGameState: GameState = [false, true, false, true, false, true];

// Define the possible moves for the game (same as in the test)
const possibleMoves: PossibleMoves = [
  [0, 1, 3],
  [1, 0],
  [2, 5],
  [3, 0, 4],
  [4, 5, 3],
  [5, 4, 2]
];

// Create the game manager instance
const gameManager = new GameManager(initialGameState, possibleMoves);

function App() {
  // State to trigger renders when game state changes
  const [gameStateVersion, setGameStateVersion] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  
  // Subscribe to game state changes
  useEffect(() => {
    const unsubscribe = gameManager.subscribe(() => {
      // Increment version to trigger re-render
      setGameStateVersion(v => v + 1);
    });
    
    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);
  
  // For rendering only - current state
  const gameState = gameManager.gameState;
  const phase = gameManager.phase;
  const currentSolution = gameManager.currentPhaseSolution;
  const nextSolution = gameManager.nextPhaseSolution;
  const isCompleted = phase === GamePhase.Completed;
  
  return (
    <div className="app">
      <h1>Pathfinder Puzzle Solver</h1>
      
      <div className="top-solution-container">
        <button
          onClick={() => setShowSolution(!showSolution)}
          className={`top-solution-button ${showSolution ? 'active' : ''}`}
        >
          {showSolution ? 'Hide Solution' : 'Show Solution'}
        </button>
        
        {showSolution && (
          <div className="solution-display">
            <h3>Solution</h3>
            <p className="solution-info">
              {phase === GamePhase.Initial && 'First make all tiles the same, then make them all the opposite'}
              {phase === GamePhase.PhaseOne && 'All tiles are now the same. Next, make them all the opposite'}
              {phase === GamePhase.PhaseTwo && !gameManager.isAllSame && 'First make all tiles the same again'}
              {phase === GamePhase.PhaseTwo && gameManager.isAllSame && 'All tiles are now the same again. Complete the puzzle!'}
              {phase === GamePhase.Completed && 'Puzzle completed! 🎉'}
            </p>
            
            <div className="solution-steps">
              {/* Show current phase solution */}
              {!gameManager.isAllSame && (
                <div className="solution-part">
                  <h4>
                    {phase === GamePhase.Initial && 'Step 1: Make all tiles the same'}
                    {phase === GamePhase.PhaseTwo && 'Step 3: Make all tiles the same again'}
                  </h4>
                  <div className="solution-moves">
                    {currentSolution.length > 0 ? (
                      <ol>
                        {currentSolution.map((moveIndex, index) => (
                          <li key={index}>
                            Press tile <strong>{moveIndex}</strong> (affects tiles {possibleMoves[moveIndex].join(', ')})
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p>No solution needed. Tiles are already all the same.</p>
                    )}
                  </div>
                </div>
              )}
              
              {/* Show next phase if all tiles are currently the same */}
              {gameManager.isAllSame && phase !== GamePhase.Completed && (
                <div className="solution-part">
                  <h4>
                    {phase === GamePhase.Initial && 'Step 2: Make all tiles opposite'}
                    {phase === GamePhase.PhaseOne && 'Step 2: Make all tiles opposite'}
                    {phase === GamePhase.PhaseTwo && 'Step 4: Complete the puzzle!'}
                  </h4>
                  <div className="solution-moves">
                    {nextSolution && nextSolution.length > 0 ? (
                      <ol>
                        {nextSolution.map((moveIndex, index) => (
                          <li key={index}>
                            Press tile <strong>{moveIndex}</strong> (affects tiles {possibleMoves[moveIndex].join(', ')})
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p>No solution needed</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="game-container">
        <GameBoard 
          gameState={gameState} 
          possibleMoves={possibleMoves}
          onApplyMove={(moveIndex) => gameManager.applyMove(moveIndex)}
          solutionReached={isCompleted}
        />
        
        <Controls 
          gameState={gameState}
          setCustomGameState={(index, value) => gameManager.setCustomState(index, value)}
          resetGame={() => gameManager.reset()}
          solutionReached={isCompleted}
          showSolution={showSolution}
          phase={phase}
        />
      </div>
    </div>
  )
}

export default App