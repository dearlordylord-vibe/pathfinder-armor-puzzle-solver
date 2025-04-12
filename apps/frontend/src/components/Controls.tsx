import { GameState } from '@app/solver';
import { GamePhase } from '@app/state';
import './Controls.css';
import { useState } from 'react';

interface ControlsProps {
  gameState: GameState;
  setCustomGameState: (index: number, value: boolean) => void;
  resetGame: (customState?: GameState) => void;
  solutionReached: boolean;
  showSolution: boolean;
  phase: GamePhase;
}

export const Controls = ({
  gameState,
  setCustomGameState,
  resetGame,
  solutionReached,
  showSolution,
  phase
}: ControlsProps) => {
  // State for custom setup mode
  const [isCustomSetupMode, setIsCustomSetupMode] = useState(false);
  
  // Handle toggle for custom setup
  const handleCustomToggle = (index: number) => {
    setCustomGameState(index, !gameState[index]);
  };
  
  return (
    <div className="controls">
      <h2>Controls</h2>
      
      <div className="control-buttons">
        <button
          onClick={() => resetGame()}
          className="reset-button"
        >
          Reset Game
        </button>
        
        <button
          onClick={() => setIsCustomSetupMode(!isCustomSetupMode)}
          className={`custom-button ${isCustomSetupMode ? 'active' : ''}`}
        >
          {isCustomSetupMode ? 'Exit Custom Setup' : 'Custom Setup'}
        </button>
      </div>
      
      {isCustomSetupMode && (
        <div className="custom-setup">
          <h3>Custom Setup Mode</h3>
          <p className="setup-info">
            Toggle tiles without affecting their neighbors
          </p>
          
          <div className="custom-grid">
            {gameState.map((isActive, index) => (
              <div 
                key={index} 
                className={`custom-tile ${isActive ? 'active' : ''}`}
                onClick={() => handleCustomToggle(index)}
              >
                <div className="custom-index">{index}</div>
                <div className="custom-status">{isActive ? 'ON' : 'OFF'}</div>
              </div>
            ))}
          </div>
          
          <button
            onClick={() => {
              setIsCustomSetupMode(false);
            }}
            className="apply-custom-button"
          >
            Apply Custom Setup
          </button>
        </div>
      )}
      
      {solutionReached && (
        <div className="solution-status">
          <h3>🎉 Solution Reached!</h3>
          <p>All tiles are now {gameState[0] ? 'ON' : 'OFF'}</p>
          <button
            onClick={() => resetGame()}
            className="play-again-button"
          >
            Play Again
          </button>
        </div>
      )}

    </div>
  );
};