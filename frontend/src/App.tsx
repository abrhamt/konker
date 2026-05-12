import { useState } from 'react'
import { Play, Info, Users, Github } from 'lucide-react'
import GameBoard from './components/GameBoard'
import './App.css'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [playerName, setPlayerName] = useState('')

  if (gameStarted && playerName) {
    return <GameBoard playerName={playerName} onExit={() => setGameStarted(false)} />
  }

  return (
    <div className="app-container">
      <div className="welcome-screen">
        <div className="header">
          <h1>🃏 Konker</h1>
          <p className="subtitle">Ethiopian Rummy 41</p>
        </div>

        <div className="content-grid">
          <div className="info-section">
            <div className="info-card">
              <Info className="icon" size={32} />
              <h2>About Konker</h2>
              <p>An authentic digital implementation of the traditional Ethiopian card game, Rummy 41 (Konker).</p>
              <p>Play in real-time with friends and experience strategic card gameplay.</p>
            </div>

            <div className="info-card">
              <Users className="icon" size={32} />
              <h2>How to Play</h2>
              <ul className="rules-list">
                <li><strong>Goal:</strong> Meld all cards with 41+ points</li>
                <li><strong>Deal:</strong> 13 cards (dealer gets 14)</li>
                <li><strong>Melds:</strong> Sequences or groups</li>
                <li><strong>Limit:</strong> 60 seconds per turn</li>
              </ul>
            </div>
          </div>

          <div className="join-section">
            <div className="join-card">
              <h2>Join Game</h2>
              <input
                type="text"
                placeholder="Enter your name"
                aria-label="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && playerName && setGameStarted(true)}
                className="player-input"
              />
              <button
                onClick={() => setGameStarted(true)}
                disabled={!playerName.trim()}
                title={!playerName.trim() ? "Please enter your name to start" : undefined}
                className="play-button"
              >
                <Play size={20} />
                Start Game
              </button>
              <p className="hint">Coming soon: Real multiplayer with Socket.io</p>
            </div>

            <div className="features-card">
              <h3>Game Features</h3>
              <ul className="features-list">
                <li>Real-time multiplayer</li>
                <li>Server-validated moves</li>
                <li>Authentic game rules</li>
                <li>60-second turn timers</li>
                <li>Room codes</li>
                <li>Player statistics</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer">
          <a href="https://github.com/abrhamt/konker" target="_blank" rel="noopener noreferrer" className="github-link">
            <Github size={20} />
            View Source Code
          </a>
          <p>Built with ❤️ • <a href="https://github.com/abrhamt">@abrhamt</a></p>
        </div>
      </div>
    </div>
  )
}

export default App
