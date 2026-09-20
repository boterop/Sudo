import { Board, BOARD_SIZE, BOX_SIZE } from '../valueobject';

export const isValid = (
  board: Board,
  row: number,
  col: number,
  number: number,
): boolean => {
  for (let x = 0; x < BOARD_SIZE; x++) {
    if (board[row][x] === number) {
      return false;
    }
  }

  for (let x = 0; x < BOARD_SIZE; x++) {
    if (board[x][col] === number) {
      return false;
    }
  }

  const boxRow = Math.floor(row / BOX_SIZE) * BOX_SIZE;
  const boxCol = Math.floor(col / BOX_SIZE) * BOX_SIZE;

  for (let rowOffset = 0; rowOffset < BOX_SIZE; rowOffset++) {
    for (let colOffset = 0; colOffset < BOX_SIZE; colOffset++) {
      if (board[boxRow + rowOffset][boxCol + colOffset] === number) {
        return false;
      }
    }
  }

  return true;
};
