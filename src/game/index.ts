/**
 * Tripos game engine — public API.
 *
 * All game logic lives here as UI-independent TypeScript modules.
 */

// Types
export type { Board, CellIndex, Color, GameEndReason, GameState, MoveResult, Player } from './types';

// Constants
export { BOARD_COLORS, MAX_MARKS_PER_PLAYER, WINNING_SETS } from './constants';

// Core engine
export { createInitialState, makeMove, getCellColor, describeEndReason } from './engine';

/**
 * Create a fresh game state for a rematch.
 *
 * In human-vs-human mode, X always starts.
 * In human-vs-computer mode, pass `alternateStarter` to swap who goes first
 * compared to the previous game.
 */
export function createRematchState(options?: { alternateStarter?: boolean }): GameState {
  const firstPlayer: Player = options?.alternateStarter ? 'O' : 'X';
  return {
    board: Array(9).fill(null) as Board,
    currentTurn: firstPlayer,
    xCount: 0,
    oCount: 0,
    status: 'playing',
    winner: null,
    endReason: null,
    winningCells: null,
    winningColor: null,
  };
}

import type { Board, CellIndex, GameState, Player } from './types';

/** Return a list of empty cell indices on the board. */
export function getEmptyCells(board: Board): CellIndex[] {
  return board.reduce<CellIndex[]>((acc, cell, idx) => {
    if (cell === null) acc.push(idx);
    return acc;
  }, []);
}

/** Check if the game is still in progress. */
export function isPlaying(state: GameState): boolean {
  return state.status === 'playing';
}

/** Check if the game has ended. */
export function isFinished(state: GameState): boolean {
  return state.status === 'finished';
}
