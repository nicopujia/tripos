import type { Color, CellIndex } from './types';

/** Fixed color pattern for the 3x3 board (flat, indices 0-8).
 *
 * Row 1: 1, 3, 2
 * Row 2: 3, 2, 1
 * Row 3: 2, 1, 3
 */
export const BOARD_COLORS: Color[] = [1, 3, 2, 3, 2, 1, 2, 1, 3];

/** Maximum marks each player can place. */
export const MAX_MARKS_PER_PLAYER = 4;

/** All winning cell triplets: rows, columns, and same-color groups. */
export const WINNING_SETS: { cells: CellIndex[]; type: 'row' | 'column' | 'color'; color?: Color }[] = [
  // Rows
  { cells: [0, 1, 2], type: 'row' },
  { cells: [3, 4, 5], type: 'row' },
  { cells: [6, 7, 8], type: 'row' },
  // Columns
  { cells: [0, 3, 6], type: 'column' },
  { cells: [1, 4, 7], type: 'column' },
  { cells: [2, 5, 8], type: 'column' },
  // Same-color groups
  { cells: [0, 5, 7], type: 'color', color: 1 },
  { cells: [2, 4, 6], type: 'color', color: 2 },
  { cells: [1, 3, 8], type: 'color', color: 3 },
];
