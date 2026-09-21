import { Game } from '../../../../src/domain/entity';
import { createGame } from '../../../../src/domain/service';
import { countSolutions } from '../../../../src/domain/service/count_solutions';

describe('countSolutions', () => {
  let game: Game;

  beforeAll(() => {
    game = createGame('easy');
  });

  it('returns 1 for a valid board', () => {
    const solutions = countSolutions(game.board);
    expect(solutions).toBe(1);
  });

  it('return more than 1 for an invalid board', () => {
    const board = game.board;
    for (let row = 0; row < board.length * 0.5; row++) {
      for (let col = 0; col < board[0].length * 0.5; col++) {
        if (board[row][col] === 0) {
          continue;
        }

        board[row][col] = 0;
      }
    }
    const solutions = countSolutions(board);
    expect(solutions).toBeGreaterThan(1);
  });
});
