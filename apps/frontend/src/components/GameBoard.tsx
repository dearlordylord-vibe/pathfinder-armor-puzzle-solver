import { GameState, PossibleMoves } from '@app/solver';
import './GameBoard.css';

interface GameBoardProps {
  gameState: GameState;
  possibleMoves: PossibleMoves;
  onApplyMove: (moveIndex: number) => void;
  solutionReached: boolean;
}

export const GameBoard = ({ 
  gameState, 
  possibleMoves, 
  onApplyMove,
  solutionReached
}: GameBoardProps) => {
  return (
    <div className="game-board">
      <h2>Game Board</h2>
      
      <div className="game-grid">
        {/* First row: 0 1 2 _ _ 3 */}
        <div 
          className={`game-tile ${gameState[0] ? 'active' : ''}`}
          onClick={() => onApplyMove(0)}
          style={{gridColumn: '1 / 2', gridRow: '1 / 2'}}
        >
          <div className="tile-content">
            <div className="tile-index">0</div>
            <div className="tile-status">{gameState[0] ? 'ON' : 'OFF'}</div>
          </div>
          <div className="tile-moves">
            Affects: {possibleMoves[0].join(', ')}
          </div>
        </div>
        
        <div 
          className={`game-tile ${gameState[1] ? 'active' : ''}`}
          onClick={() => onApplyMove(1)}
          style={{gridColumn: '2 / 3', gridRow: '1 / 2'}}
        >
          <div className="tile-content">
            <div className="tile-index">1</div>
            <div className="tile-status">{gameState[1] ? 'ON' : 'OFF'}</div>
          </div>
          <div className="tile-moves">
            Affects: {possibleMoves[1].join(', ')}
          </div>
        </div>
        
        <div 
          className={`game-tile ${gameState[2] ? 'active' : ''}`}
          onClick={() => onApplyMove(2)}
          style={{gridColumn: '3 / 4', gridRow: '1 / 2'}}
        >
          <div className="tile-content">
            <div className="tile-index">2</div>
            <div className="tile-status">{gameState[2] ? 'ON' : 'OFF'}</div>
          </div>
          <div className="tile-moves">
            Affects: {possibleMoves[2].join(', ')}
          </div>
        </div>
        
        <div className="empty-tile" style={{gridColumn: '4 / 5', gridRow: '1 / 2'}}></div>
        <div className="empty-tile" style={{gridColumn: '5 / 6', gridRow: '1 / 2'}}></div>
        
        <div 
          className={`game-tile ${gameState[3] ? 'active' : ''}`}
          onClick={() => onApplyMove(3)}
          style={{gridColumn: '6 / 7', gridRow: '1 / 2'}}
        >
          <div className="tile-content">
            <div className="tile-index">3</div>
            <div className="tile-status">{gameState[3] ? 'ON' : 'OFF'}</div>
          </div>
          <div className="tile-moves">
            Affects: {possibleMoves[3].join(', ')}
          </div>
        </div>
        
        {/* Second row: _ _ _ 4 5 _ */}
        <div className="empty-tile" style={{gridColumn: '1 / 2', gridRow: '2 / 3'}}></div>
        <div className="empty-tile" style={{gridColumn: '2 / 3', gridRow: '2 / 3'}}></div>
        <div className="empty-tile" style={{gridColumn: '3 / 4', gridRow: '2 / 3'}}></div>
        
        <div 
          className={`game-tile ${gameState[4] ? 'active' : ''}`}
          onClick={() => onApplyMove(4)}
          style={{gridColumn: '4 / 5', gridRow: '2 / 3'}}
        >
          <div className="tile-content">
            <div className="tile-index">4</div>
            <div className="tile-status">{gameState[4] ? 'ON' : 'OFF'}</div>
          </div>
          <div className="tile-moves">
            Affects: {possibleMoves[4].join(', ')}
          </div>
        </div>
        
        <div 
          className={`game-tile ${gameState[5] ? 'active' : ''}`}
          onClick={() => onApplyMove(5)}
          style={{gridColumn: '5 / 6', gridRow: '2 / 3'}}
        >
          <div className="tile-content">
            <div className="tile-index">5</div>
            <div className="tile-status">{gameState[5] ? 'ON' : 'OFF'}</div>
          </div>
          <div className="tile-moves">
            Affects: {possibleMoves[5].join(', ')}
          </div>
        </div>
        
        <div className="empty-tile" style={{gridColumn: '6 / 7', gridRow: '2 / 3'}}></div>
      </div>
      
      {solutionReached && (
        <div className="solution-notification">
          Solution Reached! All tiles are {gameState[0] ? 'ON' : 'OFF'}
        </div>
      )}
      
      <div className="instructions">
        <h3>How to Play:</h3>
        <p>Click on a tile to toggle it and its connected tiles.</p>
        <p>For example, clicking on tile 0 will toggle tiles 0, 1, and 3.</p>
        <p>Your goal is to make all tiles either ON or OFF.</p>
      </div>
    </div>
  );
};