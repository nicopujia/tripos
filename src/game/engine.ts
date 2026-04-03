import type { Board, CellIndex, Color, GameEndReason, GameState, MoveResult, Player } from './types';
import { BOARD_COLORS, MAX_MARKS_PER_PLAYER, WINNING_SETS } from './constants';

/** Create a fresh game state. X always goes first. */
export function createInitialState(): GameState {
  return {
    board: Array(9).fill(null) as Board,
    currentTurn: 'X',
    xCount: 0,
    oCount: 0,
    status: 'playing',
    winner: null,
    endReason: null,
    winningCells: null,
    winningColor: null,
  };
}

/** Check if a player has completed any winning set on the board. */
function findWin(board: Board, player: Player): { cells: CellIndex[]; type: 'row' | 'column' | 'color'; color?: number } | null {
  for (const set of WINNING_SETS) {
    if (set.cells.every((cell) => board[cell] === player)) {
      return set;
    }
  }
  return null;
}

/**
 * Attempt to place `player`'s mark at `cell`.
 *
 * Returns a MoveResult indicating success or the reason for failure.
 */
export function makeMove(state: GameState, cell: CellIndex, player: Player): MoveResult {
  // Game must still be playing
  if (state.status !== 'playing') {
    return { ok: false, error: 'Game is already finished.' };
  }

  // Must be the correct player's turn
  if (state.currentTurn !== player) {
    return { ok: false, error: `It is ${state.currentTurn}'s turn, not ${player}'s.` };
  }

  // Cell must be empty
  if (state.board[cell] !== null) {
    return { ok: false, error: 'Cell is already occupied.' };
  }

  // Player must not have already placed all their marks
  const playerCount = player === 'X' ? state.xCount : state.oCount;
  if (playerCount >= MAX_MARKS_PER_PLAYER) {
    return { ok: false, error: `${player} has already placed all ${MAX_MARKS_PER_PLAYER} marks.` };
  }

  // Apply the move
  const newBoard = [...state.board] as Board;
  newBoard[cell] = player;

  const newXCount = state.xCount + (player === 'X' ? 1 : 0);
  const newOCount = state.oCount + (player === 'O' ? 1 : 0);

  // Check for a win by the current player
  const win = findWin(newBoard, player);
  if (win) {
    const endReason: GameEndReason =
      win.type === 'row' ? 'row-win' : win.type === 'column' ? 'column-win' : 'color-win';
    return {
      ok: true,
      state: {
        board: newBoard,
        currentTurn: player === 'X' ? 'O' : 'X',
        xCount: newXCount,
        oCount: newOCount,
        status: 'finished',
        winner: player,
        endReason,
        winningCells: win.cells,
        winningColor: (win.color as Color) ?? null,
      },
    };
  }

  // Special rule: if X (first player) has placed all 4 marks and hasn't won, O wins.
  if (player === 'X' && newXCount >= MAX_MARKS_PER_PLAYER) {
    return {
      ok: true,
      state: {
        board: newBoard,
        currentTurn: 'O',
        xCount: newXCount,
        oCount: newOCount,
        status: 'finished',
        winner: 'O',
        endReason: 'four-move-loss',
        winningCells: null,
        winningColor: null,
      },
    };
  }

  // Continue playing
  return {
    ok: true,
    state: {
      board: newBoard,
      currentTurn: player === 'X' ? 'O' : 'X',
      xCount: newXCount,
      oCount: newOCount,
      status: 'playing',
      winner: null,
      endReason: null,
      winningCells: null,
      winningColor: null,
    },
  };
}

/** Return the color of a cell by its index. */
export function getCellColor(cell: CellIndex): number {
  return BOARD_COLORS[cell];
}

/** Return a human-readable description of the end reason. */
export function describeEndReason(reason: GameEndReason): string {
  switch (reason) {
    case 'row-win':
      return 'Row completed';
    case 'column-win':
      return 'Column completed';
    case 'color-win':
      return 'Same-color set completed';
    case 'four-move-loss':
      return 'First player did not win in four moves';
  }
}
