import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GameProvider } from '../game/context/GameContext'
import App from './App/App'
import '../style.css'

createRoot(document.getElementById('root')!).render(
  <GameProvider>
    <App />
  </GameProvider>
)
