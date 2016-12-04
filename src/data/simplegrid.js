import {unfold} from '../utils';
//
// basicgrid.js
// BasicGrid module contains functions that can be used to work on simple grids.
//

export const cell = (x, y) => ({x, y});

export const row = (width, y) => unfold(
  (x) => (x === width ? undefined : [x + 1, cell(x, y)]),
  0
);

export const grid = (width, height) => unfold(
  (y) => (y === height ? undefined : [y + 1, row(width, y)]),
  0
);