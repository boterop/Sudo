import { Board, BOARD_SIZE } from '../valueobject';
import { shuffle } from './shuffle';
import { isValid } from './validate_game';

export const countSolutions = (board: Board): number => {
  let solutions = 0;

  const search = (): void => {
    if (solutions > 1) {
      return;
    }

    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (board[row][col] !== 0) {
          continue;
        }

        for (const number of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
          if (!isValid(board, row, col, number)) {
            continue;
          }

          board[row][col] = number;

          search();

          board[row][col] = 0;

          if (solutions > 1) {
            return;
          }
        }

        return;
      }
    }

    solutions++;
  };

  search();

  return solutions;
};
