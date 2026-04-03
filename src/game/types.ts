/** The three fixed colors on the Tripos board. */
export type Color = 1 | 2 | 3;

/** A player mark. */
export type Player = 'X' | 'O';

/** A cell index on the 3x3 board (0-8). */
export type CellIndex = number;

/** The board is a flat array of 9 cells; each cell is null or a Player. */
export type Board = (Player | null)[];

/** The current status of a game. */
export type GameStatus = 'playing' | 'finished';

/** The reason the game ended. */
export type GameEndReason =
  | 'row-win'
  | 'column-win'
  | 'color-win'
  | 'four-move-loss';

/** Structured state exposed to the UI. */
export interface GameState {
  /** The current board (flat array of 9 cells). */
  board: Board;
  /** Whose turn it is. */
  currentTurn: Player;
  /** How many marks X has placed. */
  xCount: number;
  /** How many marks O has placed. */
  oCount: number;
  /** Current game status. */
  status: GameStatus;
  /** The winner, if the game is finished. */
  winner: Player | null;
  /** The reason the game ended, if finished. */
  endReason: GameEndReason | null;
  /** The cell indices that form the winning line/group, if applicable. */
  winningCells: CellIndex[] | null;
  /** The color group that won, if applicable (for color wins). */
  winningColor: Color | null;
}

/** Result of attempting a move. */
export type MoveResult =
  | { ok: true; state: GameState }
  | { ok: false; error: string };
