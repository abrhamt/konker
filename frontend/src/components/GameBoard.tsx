import { useState } from 'react'
import { LogOut, RotateCcw } from 'lucide-react'
import '../styles/GameBoard.css'

interface GameBoardProps {
  playerName: string
  onExit: () => void
}

function GameBoard({ playerName, onExit }: GameBoardProps) {
  const [gameState, setGameState] = useState('playing')
  const [hand, setHand] = useState(generateInitialHand())
  const [table, setTable] = useState<string[]>([])
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(60)

  function generateInitialHand() {
    const suits = ['♠', '♥', '♦', '♣']
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
    const hand = []
    for (let i = 0; i < 13; i++) {
      const suit = suits[Math.floor(Math.random() * suits.length)]
      const rank = ranks[Math.floor(Math.random() * ranks.length)]
      hand.push(`${rank}${suit}`)
    }
    return hand
  }

  const toggleCard = (index: number) => {
    setSelectedCards(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  const playCards = () => {
    if (selectedCards.length === 0) return
    const newHand = hand.filter((_, i) => !selectedCards.includes(i))
    const played = selectedCards.map(i => hand[i])
    setTable([...table, ...played])
    setHand(newHand)
    setSelectedCards([])
  }

  return (
    <div className="game-board">
      <div className="game-header">
        <div className="player-info">
          <h2>🃏 {playerName}</h2>
          <p>Konker Game</p>
        </div>
        <div className="game-timer">
          <div className={`timer ${timeLeft <= 10 ? 'warning' : ''}`}>
            {timeLeft}s
          </div>
        </div>
        <button onClick={onExit} className="exit-button">
          <LogOut size={20} />
          Exit Game
        </button>
      </div>

      <div className="game-content">
        <div className="opponents">
          <div className="opponent-slot">
            <div className="opponent-card">Opponent 1</div>
            <p>13 cards</p>
          </div>
          <div className="opponent-slot">
            <div className="opponent-card">Opponent 2</div>
            <p>13 cards</p>
          </div>
        </div>

        <div className="table-area">
          <h3>Table Melds</h3>
          {table.length === 0 ? (
            <div className="empty-table">No melds on table yet</div>
          ) : (
            <div className="melds">
              {table.map((card, i) => (
                <div key={i} className="card-on-table">
                  {card}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="player-area">
          <div className="deck-area">
            <div className="deck-card">Draw</div>
            <div className="discard-card">Discard Pile</div>
          </div>

          <div className="hand-area">
            <h3>Your Hand ({hand.length})</h3>
            <div className="hand">
              {hand.map((card, i) => (
                <button
                  key={i}
                  className={`card ${selectedCards.includes(i) ? 'selected' : ''}`}
                  onClick={() => toggleCard(i)}
                >
                  {card}
                </button>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            <button
              onClick={playCards}
              disabled={selectedCards.length === 0}
              className="play-btn"
            >
              Play Selected ({selectedCards.length})
            </button>
            <button onClick={onExit} className="discard-btn">
              Discard & Skip
            </button>
          </div>
        </div>
      </div>

      <div className="game-info">
        <p>🎮 Demo Mode - This is a single-player demo. Real multiplayer coming soon!</p>
      </div>
    </div>
  )
}

export default GameBoard
