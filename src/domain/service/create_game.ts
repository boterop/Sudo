import { Game } from '../entity';
import { Board, BOARD_SIZE, Difficulty, EMPTY_CELLS } from '../valueobject';
import { countSolutions } from './count_solutions';
import { shuffle } from './shuffle';
import { isValid } from './validate_game';

export const createGame = (difficulty: Difficulty): Game => {
  const solution = _genEmptyBoard();
  _genRandomBoard(solution);
  const board = _setDifficulty(solution, difficulty);

  return {
    board: board,
    difficulty,
    solution,
    created_at: new Date(),
  };
};

const _genEmptyBoard = () =>
  Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));

const _genRandomBoard = (board: Board): boolean => {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] !== 0) {
        continue;
      }

      const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

      for (const number of numbers) {
        if (!isValid(board, row, col, number)) {
          continue;
        }

        board[row][col] = number;

        if (_genRandomBoard(board)) {
          return true;
        }

        board[row][col] = 0;
      }

      return false;
    }
  }

  return true;
};

const _setDifficulty = (board: Board, difficulty: Difficulty): Board => {
  const puzzle = board.map(row => [...row]);

  const cellsToRemove = EMPTY_CELLS[difficulty];

  const positions = shuffle(Array.from({ length: 81 }, (_, index) => index));

  let removed = 0;

  for (const position of positions) {
    if (removed >= cellsToRemove) {
      break;
    }

    const row = Math.floor(position / BOARD_SIZE);
    const col = position % BOARD_SIZE;

    const backup = puzzle[row][col];

    puzzle[row][col] = 0;

    const solutions = countSolutions(puzzle);

    if (solutions === 1) {
      removed++;
    } else {
      puzzle[row][col] = backup;
    }
  }

  return puzzle;
};
