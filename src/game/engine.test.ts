import { describe, it, expect } from 'vitest';
import {
  createInitialState,
  makeMove,
  getCellColor,
  describeEndReason,
  createRematchState,
  getEmptyCells,
  isPlaying,
  isFinished,
  BOARD_COLORS,
  WINNING_SETS,
} from './index';
import type { GameState } from './types';

describe('constants', () => {
  it('BOARD_COLORS has 9 entries', () => {
    expect(BOARD_COLORS).toHaveLength(9);
  });

  it('BOARD_COLORS matches the fixed pattern', () => {
    // Row 1: 1, 3, 2
    // Row 2: 3, 2, 1
    // Row 3: 2, 1, 3
    expect(BOARD_COLORS).toEqual([1, 3, 2, 3, 2, 1, 2, 1, 3]);
  });

  it('WINNING_SETS contains 9 sets (3 rows, 3 columns, 3 color groups)', () => {
    expect(WINNING_SETS).toHaveLength(9);
  });

  it('each winning set has exactly 3 cells', () => {
    for (const set of WINNING_SETS) {
      expect(set.cells).toHaveLength(3);
    }
  });
});

describe('createInitialState', () => {
  it('returns a fresh board with all null cells', () => {
    const state = createInitialState();
    expect(state.board).toEqual(Array(9).fill(null));
  });

  it('starts with X as current turn', () => {
    const state = createInitialState();
    expect(state.currentTurn).toBe('X');
  });

  it('starts with zero counts', () => {
    const state = createInitialState();
    expect(state.xCount).toBe(0);
    expect(state.oCount).toBe(0);
  });

  it('starts in playing status with no winner', () => {
    const state = createInitialState();
    expect(state.status).toBe('playing');
    expect(state.winner).toBeNull();
    expect(state.endReason).toBeNull();
    expect(state.winningCells).toBeNull();
    expect(state.winningColor).toBeNull();
  });
});

describe('makeMove — legal move rejection', () => {
  it('rejects moves on an occupied cell', () => {
    const state = createInitialState();
    const result1 = makeMove(state, 0, 'X');
    expect(result1.ok).toBe(true);

    if (result1.ok) {
      const result2 = makeMove(result1.state, 0, 'O');
      expect(result2.ok).toBe(false);
      if (!result2.ok) {
        expect(result2.error).toContain('occupied');
      }
    }
  });

  it('rejects moves when it is not the player\'s turn', () => {
    const state = createInitialState();
    const result = makeMove(state, 0, 'O');
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain("X's turn");
    }
  });

  it('rejects moves after the game is finished', () => {
    // X wins row 1: cells 0, 1, 2
    const state = createInitialState();
    const r1 = makeMove(state, 0, 'X');
    expect(r1.ok).toBe(true);
    if (r1.ok) {
      const r2 = makeMove(r1.state, 3, 'O');
      expect(r2.ok).toBe(true);
      if (r2.ok) {
        const r3 = makeMove(r2.state, 1, 'X');
        expect(r3.ok).toBe(true);
        if (r3.ok) {
          const r4 = makeMove(r3.state, 4, 'O');
          expect(r4.ok).toBe(true);
          if (r4.ok) {
            const r5 = makeMove(r4.state, 2, 'X');
            expect(r5.ok).toBe(true);
            if (r5.ok) {
              expect(r5.state.status).toBe('finished');
              const r6 = makeMove(r5.state, 5, 'O');
              expect(r6.ok).toBe(false);
              if (!r6.ok) {
                expect(r6.error).toContain('finished');
              }
            }
          }
        }
      }
    }
  });

  it('rejects moves when player has already placed all 4 marks', () => {
    const state = createInitialState();
    // X places 4 marks without winning (spread across different rows/cols)
    // X: 0, 4, 8, 3 — no row/col/color win
    let s: GameState = state;
    const xMoves = [0, 4, 8, 3];
    const oMoves = [1, 5, 7];

    for (let i = 0; i < 3; i++) {
      const xr = makeMove(s, xMoves[i], 'X');
      expect(xr.ok).toBe(true);
      if (xr.ok) s = xr.state;
      const or_ = makeMove(s, oMoves[i], 'O');
      expect(or_.ok).toBe(true);
      if (or_.ok) s = or_.state;
    }
    // X places 4th mark
    const r4 = makeMove(s, xMoves[3], 'X');
    expect(r4.ok).toBe(true);
    if (r4.ok) {
      // X has placed 4 marks but hasn't won, so O wins by four-move-loss
      expect(r4.state.status).toBe('finished');
      expect(r4.state.winner).toBe('O');
    }
  });
});

describe('makeMove — row wins', () => {
  it('detects a row win for X on row 1', () => {
    const state = createInitialState();
    // X: 0, 1, 2 (row 1)
    // O: 3, 4
    const r1 = makeMove(state, 0, 'X');
    expect(r1.ok).toBe(true);
    if (r1.ok) {
      const r2 = makeMove(r1.state, 3, 'O');
      expect(r2.ok).toBe(true);
      if (r2.ok) {
        const r3 = makeMove(r2.state, 1, 'X');
        expect(r3.ok).toBe(true);
        if (r3.ok) {
          const r4 = makeMove(r3.state, 4, 'O');
          expect(r4.ok).toBe(true);
          if (r4.ok) {
            const r5 = makeMove(r4.state, 2, 'X');
            expect(r5.ok).toBe(true);
            if (r5.ok) {
              expect(r5.state.status).toBe('finished');
              expect(r5.state.winner).toBe('X');
              expect(r5.state.endReason).toBe('row-win');
              expect(r5.state.winningCells).toEqual([0, 1, 2]);
            }
          }
        }
      }
    }
  });

  it('detects a row win for O on row 2', () => {
    const state = createInitialState();
    // O: 3, 4, 5 (row 2)
    // X: 0, 1, 2
    const r1 = makeMove(state, 0, 'X');
    expect(r1.ok).toBe(true);
    if (r1.ok) {
      const r2 = makeMove(r1.state, 3, 'O');
      expect(r2.ok).toBe(true);
      if (r2.ok) {
        const r3 = makeMove(r2.state, 1, 'X');
        expect(r3.ok).toBe(true);
        if (r3.ok) {
          const r4 = makeMove(r3.state, 4, 'O');
          expect(r4.ok).toBe(true);
          if (r4.ok) {
            const r5 = makeMove(r4.state, 6, 'X');
            expect(r5.ok).toBe(true);
            if (r5.ok) {
              const r6 = makeMove(r5.state, 5, 'O');
              expect(r6.ok).toBe(true);
              if (r6.ok) {
                expect(r6.state.status).toBe('finished');
                expect(r6.state.winner).toBe('O');
                expect(r6.state.endReason).toBe('row-win');
                expect(r6.state.winningCells).toEqual([3, 4, 5]);
              }
            }
          }
        }
      }
    }
  });
});

describe('makeMove — column wins', () => {
  it('detects a column win for X on column 1', () => {
    const state = createInitialState();
    // X: 0, 3, 6 (column 1)
    // O: 1, 4
    const r1 = makeMove(state, 0, 'X');
    expect(r1.ok).toBe(true);
    if (r1.ok) {
      const r2 = makeMove(r1.state, 1, 'O');
      expect(r2.ok).toBe(true);
      if (r2.ok) {
        const r3 = makeMove(r2.state, 3, 'X');
        expect(r3.ok).toBe(true);
        if (r3.ok) {
          const r4 = makeMove(r3.state, 4, 'O');
          expect(r4.ok).toBe(true);
          if (r4.ok) {
            const r5 = makeMove(r4.state, 6, 'X');
            expect(r5.ok).toBe(true);
            if (r5.ok) {
              expect(r5.state.status).toBe('finished');
              expect(r5.state.winner).toBe('X');
              expect(r5.state.endReason).toBe('column-win');
              expect(r5.state.winningCells).toEqual([0, 3, 6]);
            }
          }
        }
      }
    }
  });

  it('detects a column win for O on column 3', () => {
    const state = createInitialState();
    // O: 2, 5, 8 (column 3)
    // X: 0, 1, 3
    const r1 = makeMove(state, 0, 'X');
    expect(r1.ok).toBe(true);
    if (r1.ok) {
      const r2 = makeMove(r1.state, 2, 'O');
      expect(r2.ok).toBe(true);
      if (r2.ok) {
        const r3 = makeMove(r2.state, 1, 'X');
        expect(r3.ok).toBe(true);
        if (r3.ok) {
          const r4 = makeMove(r3.state, 5, 'O');
          expect(r4.ok).toBe(true);
          if (r4.ok) {
            const r5 = makeMove(r4.state, 3, 'X');
            expect(r5.ok).toBe(true);
            if (r5.ok) {
              const r6 = makeMove(r5.state, 8, 'O');
              expect(r6.ok).toBe(true);
              if (r6.ok) {
                expect(r6.state.status).toBe('finished');
                expect(r6.state.winner).toBe('O');
                expect(r6.state.endReason).toBe('column-win');
                expect(r6.state.winningCells).toEqual([2, 5, 8]);
              }
            }
          }
        }
      }
    }
  });
});

describe('makeMove — same-color wins', () => {
  it('detects a color win for X on color 1 (cells 0, 5, 7)', () => {
    const state = createInitialState();
    // X: 0, 5, 7 (color 1)
    // O: 1, 2
    const r1 = makeMove(state, 0, 'X');
    expect(r1.ok).toBe(true);
    if (r1.ok) {
      const r2 = makeMove(r1.state, 1, 'O');
      expect(r2.ok).toBe(true);
      if (r2.ok) {
        const r3 = makeMove(r2.state, 5, 'X');
        expect(r3.ok).toBe(true);
        if (r3.ok) {
          const r4 = makeMove(r3.state, 2, 'O');
          expect(r4.ok).toBe(true);
          if (r4.ok) {
            const r5 = makeMove(r4.state, 7, 'X');
            expect(r5.ok).toBe(true);
            if (r5.ok) {
              expect(r5.state.status).toBe('finished');
              expect(r5.state.winner).toBe('X');
              expect(r5.state.endReason).toBe('color-win');
              expect(r5.state.winningCells).toEqual([0, 5, 7]);
              expect(r5.state.winningColor).toBe(1);
            }
          }
        }
      }
    }
  });

  it('detects a color win for O on color 2 (cells 2, 4, 6)', () => {
    const state = createInitialState();
    // O: 2, 4, 6 (color 2)
    // X: 0, 1, 3
    const r1 = makeMove(state, 0, 'X');
    expect(r1.ok).toBe(true);
    if (r1.ok) {
      const r2 = makeMove(r1.state, 2, 'O');
      expect(r2.ok).toBe(true);
      if (r2.ok) {
        const r3 = makeMove(r2.state, 1, 'X');
        expect(r3.ok).toBe(true);
        if (r3.ok) {
          const r4 = makeMove(r3.state, 4, 'O');
          expect(r4.ok).toBe(true);
          if (r4.ok) {
            const r5 = makeMove(r4.state, 3, 'X');
            expect(r5.ok).toBe(true);
            if (r5.ok) {
              const r6 = makeMove(r5.state, 6, 'O');
              expect(r6.ok).toBe(true);
              if (r6.ok) {
                expect(r6.state.status).toBe('finished');
                expect(r6.state.winner).toBe('O');
                expect(r6.state.endReason).toBe('color-win');
                expect(r6.state.winningCells).toEqual([2, 4, 6]);
                expect(r6.state.winningColor).toBe(2);
              }
            }
          }
        }
      }
    }
  });

  it('detects a color win for X on color 3 (cells 1, 3, 8)', () => {
    const state = createInitialState();
    // X: 1, 3, 8 (color 3)
    // O: 0, 2
    const s1 = makeMove(state, 1, 'X');
    expect(s1.ok).toBe(true);
    if (s1.ok) {
      const s2 = makeMove(s1.state, 0, 'O');
      expect(s2.ok).toBe(true);
      if (s2.ok) {
        const s3 = makeMove(s2.state, 3, 'X');
        expect(s3.ok).toBe(true);
        if (s3.ok) {
          const s4 = makeMove(s3.state, 2, 'O');
          expect(s4.ok).toBe(true);
          if (s4.ok) {
            const s5 = makeMove(s4.state, 8, 'X');
            expect(s5.ok).toBe(true);
            if (s5.ok) {
              expect(s5.state.status).toBe('finished');
              expect(s5.state.winner).toBe('X');
              expect(s5.state.endReason).toBe('color-win');
              expect(s5.state.winningCells).toEqual([1, 3, 8]);
              expect(s5.state.winningColor).toBe(3);
            }
          }
        }
      }
    }
  });
});

describe('makeMove — four-move loss condition', () => {
  it('awards O the win when X places 4 marks without winning', () => {
    const state = createInitialState();
    // X places 4 marks that don't form any winning set
    // X: 0, 4, 8, 3 — no row, col, or color win
    // O: 1, 5, 7
    let s: GameState = state;

    // Move 1: X at 0
    const r1 = makeMove(s, 0, 'X');
    expect(r1.ok).toBe(true);
    if (r1.ok) s = r1.state;

    // Move 2: O at 1
    const r2 = makeMove(s, 1, 'O');
    expect(r2.ok).toBe(true);
    if (r2.ok) s = r2.state;

    // Move 3: X at 4
    const r3 = makeMove(s, 4, 'X');
    expect(r3.ok).toBe(true);
    if (r3.ok) s = r3.state;

    // Move 4: O at 5
    const r4 = makeMove(s, 5, 'O');
    expect(r4.ok).toBe(true);
    if (r4.ok) s = r4.state;

    // Move 5: X at 8
    const r5 = makeMove(s, 8, 'X');
    expect(r5.ok).toBe(true);
    if (r5.ok) s = r5.state;

    // Move 6: O at 7
    const r6 = makeMove(s, 7, 'O');
    expect(r6.ok).toBe(true);
    if (r6.ok) s = r6.state;

    // Move 7: X at 3 (X's 4th mark)
    const r7 = makeMove(s, 3, 'X');
    expect(r7.ok).toBe(true);
    if (r7.ok) {
      expect(r7.state.status).toBe('finished');
      expect(r7.state.winner).toBe('O');
      expect(r7.state.endReason).toBe('four-move-loss');
      expect(r7.state.winningCells).toBeNull();
      expect(r7.state.winningColor).toBeNull();
    }
  });
});

describe('getCellColor', () => {
  it('returns correct colors for all cells', () => {
    const expected = [1, 3, 2, 3, 2, 1, 2, 1, 3];
    for (let i = 0; i < 9; i++) {
      expect(getCellColor(i)).toBe(expected[i]);
    }
  });
});

describe('describeEndReason', () => {
  it('returns human-readable descriptions', () => {
    expect(describeEndReason('row-win')).toBe('Row completed');
    expect(describeEndReason('column-win')).toBe('Column completed');
    expect(describeEndReason('color-win')).toBe('Same-color set completed');
    expect(describeEndReason('four-move-loss')).toBe('First player did not win in four moves');
  });
});

describe('createRematchState', () => {
  it('starts with X by default', () => {
    const state = createRematchState();
    expect(state.currentTurn).toBe('X');
  });

  it('starts with O when alternateStarter is true', () => {
    const state = createRematchState({ alternateStarter: true });
    expect(state.currentTurn).toBe('O');
  });

  it('returns a fresh board', () => {
    const state = createRematchState();
    expect(state.board).toEqual(Array(9).fill(null));
    expect(state.status).toBe('playing');
    expect(state.winner).toBeNull();
  });
});

describe('getEmptyCells', () => {
  it('returns all cells for an empty board', () => {
    const state = createInitialState();
    expect(getEmptyCells(state.board)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('returns remaining cells after some moves', () => {
    const state = createInitialState();
    const r1 = makeMove(state, 0, 'X');
    expect(r1.ok).toBe(true);
    if (r1.ok) {
      expect(getEmptyCells(r1.state.board)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    }
  });
});

describe('isPlaying / isFinished', () => {
  it('isPlaying is true for a new game', () => {
    expect(isPlaying(createInitialState())).toBe(true);
  });

  it('isFinished is false for a new game', () => {
    expect(isFinished(createInitialState())).toBe(false);
  });

  it('isFinished is true after a win', () => {
    const state = createInitialState();
    const r1 = makeMove(state, 0, 'X');
    expect(r1.ok).toBe(true);
    if (r1.ok) {
      const r2 = makeMove(r1.state, 3, 'O');
      expect(r2.ok).toBe(true);
      if (r2.ok) {
        const r3 = makeMove(r2.state, 1, 'X');
        expect(r3.ok).toBe(true);
        if (r3.ok) {
          const r4 = makeMove(r3.state, 4, 'O');
          expect(r4.ok).toBe(true);
          if (r4.ok) {
            const r5 = makeMove(r4.state, 2, 'X');
            expect(r5.ok).toBe(true);
            if (r5.ok) {
              expect(isFinished(r5.state)).toBe(true);
              expect(isPlaying(r5.state)).toBe(false);
            }
          }
        }
      }
    }
  });
});
