// Constants
export const CELL_STATE = {
  EMPTY: 'empty',
  ABSENT: 'absent',
  PRESENT: 'present',
  CORRECT: 'correct',
  FOCUS: 'focus'
}

export const GAME_STATE = {
  PLAYING: 'playing',
  GAME_OVER: 'game_over',
  WIN: 'win'
}

export const STORAGE_KEY = '__wordle_vue_storage__'

export const MAX_ATTEMPTS = 5

// Classes
export class Cell {
  constructor(letter = '', state = CELL_STATE.EMPTY, reveal = false, shake = false) {
    this.letter = letter
    this.state = state
    this.reveal = reveal
    this.shake = shake
  }

  clear() {
    this.letter = ''
    this.state = CELL_STATE.EMPTY
  }
}

// Helper functions
export function getCellBgRevealedColor(state) {
  if (state === CELL_STATE.CORRECT) return 'bg-lime-600'
  if (state === CELL_STATE.PRESENT) return 'bg-orange-500'
  if (state === CELL_STATE.ABSENT) return 'bg-dark-300'
  return ''
}

export function waitFor(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// https://www.sohamkamani.com/javascript/localstorage-with-ttl-expiry/
export function setStorage(key, value, ttl) {
  const now = new Date()
  const item = { value, expiry: now.getTime() + ttl }

  console.log()
  localStorage.setItem(key, JSON.stringify(item))
}

export function getStorage(key) {
  const itemStr = localStorage.getItem(key)
  if (!itemStr) return null
  const item = JSON.parse(itemStr)
  const now = new Date()
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key)
    return null
  }
  return item.value
}

export function loadGame() {
  const game = getStorage(STORAGE_KEY)
  if (game) {
    // Restore cell class in the matrix because of json stringifcation
    game.matrix.forEach(row => {
      row.forEach((cell, idx) => {
        const { letter, state, reveal, shake } = cell
        row[idx] = new Cell(letter, state, reveal, shake)
      })
    })
    return game
  }
  return {
    matrix: Array.from({ length: 6 }, () => Array.from({ length: MAX_ATTEMPTS }, () => new Cell())),
    state: GAME_STATE.PLAYING,
    currentRowIdx: 0,
    darkMode: false
  }
}

export function saveGame(game) {
  const EXPIRATION_MS = 60000 * 60 // 1 hour
  setStorage(STORAGE_KEY, game, EXPIRATION_MS)
}

export function resetGame() {
  localStorage.removeItem(STORAGE_KEY)
}
