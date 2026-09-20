import { Game } from '../../../../src/domain/entity';
import { createGame } from '../../../../src/domain/service';
import { countSolutions } from '../../../../src/domain/service/count_solutions';
import {
  Board,
  BOARD_SIZE,
  Difficulty,
  EMPTY_CELLS,
} from '../../../../src/domain/valueobject';

describe('createGame', () => {
  it('generates a valid easy board', () => {
    const difficulty = 'easy';
    const game = createGame(difficulty);
    expect(validate(game, difficulty)).toBe(true);
  });

  it('generates a valid medium sudoku', () => {
    const difficulty = 'medium';
    const game = createGame(difficulty);
    expect(validate(game, difficulty)).toBe(true);
  });

  it('generates a valid hard sudoku', () => {
    const difficulty = 'hard';
    const game = createGame(difficulty);
    expect(validate(game, difficulty)).toBe(true);
  });
});

const validate = (game: Game, difficulty: Difficulty): boolean => {
  const board = game.board;
  const solution = game.solution;

  if (board.length !== BOARD_SIZE) return false;
  if (board[0].length !== BOARD_SIZE) return false;

  for (const row of solution) {
    for (const value of row) {
      if (value < 1) return false;
      if (value > 9) return false;
    }
  }

  if (countSolutions(board) > 1) return false;
  if (countEmpties(board) !== EMPTY_CELLS[difficulty]) return false;

  return true;
};

const countEmpties = (board: Board): number => {
  let empties = 0;
  for (let row of board) {
    for (let value of row) {
      if (value === 0) empties++;
    }
  }
  return empties;
};
