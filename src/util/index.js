export const CELL_STATE = {
  EMPTY: 'EMPTY',
  ABSENT: 'ABSENT',
  PRESENT: 'PRESENT',
  CORRECT: 'CORRECT'
}

export const GAME_STATE = {
  PLAYING: 'PLAYING',
  GAME_OVER: 'GAME_OVER',
  WIN: 'WIN'
}

export class Cell {
  constructor() {
    this.letter = ''
    this.state = CELL_STATE.EMPTY
    this.reveal = false
    this.shake = false
  }

  clear() {
    this.letter = ''
    this.state = CELL_STATE.EMPTY
  }
}

export const WORD_LIST = []

export function getCellBgColor(state) {
  if (state === CELL_STATE.CORRECT) return 'bg-lime-600'
  if (state === CELL_STATE.PRESENT) return 'bg-orange-500'
  if (state === CELL_STATE.ABSENT) return 'bg-dark-600'
  return ''
}

export function waitFor(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
