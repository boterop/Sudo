import { Board, Difficulty } from '../valueobject';

export class Game {
  constructor(
    public readonly board: Board,
    public readonly difficulty: Difficulty,
    public readonly solution: Board,
    public readonly created_at: Date,
  ) {}
}
