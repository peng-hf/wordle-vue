export const CELL_STATE = {
  EMPTY: 'EMPTY',
  ABSENT: 'ABSENT',
  PRESENT: 'PRESENT',
  CORRECT: 'CORRECT'
}

export class Cell {
  constructor() {
    this.letter = ''
    this.state = CELL_STATE.EMPTY
  }

  clear() {
    this.letter = ''
    this.state = CELL_STATE.EMPTY
  }
}

export const WORD_LIST = []
