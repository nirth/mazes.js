import {expect} from 'chai';
import {cell, row, grid} from './simplegrid';

describe(`Cell factory creates cells at x and y coordinates,
in 2d simple mazes cells only need x and y coordinates. Cell factory should`, () => {
  it('exist', () => {
    expect(cell).to.be.a('function')
  });

  it(`accept two parameters:
    Integer x - Coordinate across x-axis.
    Integer y - Coordinate across y-axis.`, () => expect(cell.length).to.equal(2));

  it('produce cell at x and y coordinates specified in parameters', () => {
    // Cells
    const c1by1 = cell(1, 1);
    const c10by11 = cell(10, 11);
    const c7by8 = cell(7, 8);
    // Mocks
    const m1by1 = {x: 1, y: 1};
    const m10by11 = {x: 10, y: 11};
    const m7by8 = {x: 7, y: 8};

    expect(c1by1).to.eql(m1by1);
    expect(c10by11).to.eql(m10by11);
    expect(c7by8).to.eql(m7by8);
  });
});

describe(`Row factory is a utility that combines cells into rows in order to create
grids in a clean fashion. Row factory should`, () => {
  it('exist', () => expect(row).to.be.a('function'));

  it(`accept two parameters:
    Integer width - Width (size) of a row.
    Integer y     - Current y position (row index).`,
    () => expect(row.length).to.equal(2)
  );

  it(
    'create row with amount amount of cells specified in withd parameter starting from zero',
    () => {
      const rowOf5 = row(5, 0);
      const rowOf15 = row(15, 0);
      const rowOf101 = row(101, 0);

      expect(rowOf5.length).to.equal(5);
      expect(rowOf15.length).to.equal(15);
      expect(rowOf101.length).to.equal(101);
    }
  );

  it(
    'create row with cells at correct x and y coordinates',
    () => {
      const rowOf2At7 = row(2, 7);
      const rowOf3At101 = row(3, 101);

      expect(rowOf2At7).to.eql([cell(0, 7), cell(1, 7)]);
      expect(rowOf3At101).to.eql([cell(0, 101), cell(1, 101), cell(2, 101)]);
    }
  );
});

describe(`Grid factory is a utility that outputs set of rows with cells.
Grid should`, () => {
  it('exist', () => expect(grid).to.be.a('function'));

  it(`accept two parameters:
    Integer width  - Indicates width of a grid.
    Integer height - Indicates height of a grid.`, () => expect(grid.length).to.equal(2)
  );

  it('create grid with cells at coorrect coordinates', () => {
    // Mocks
    const m2by2 = [
      [cell(0, 0), cell(1, 0)],
      [cell(0, 1), cell(1, 1)],
    ];
    const m3by4 = [
      [cell(0, 0), cell(1, 0), cell(2, 0)],
      [cell(0, 1), cell(1, 1), cell(2, 1)],
      [cell(0, 2), cell(1, 2), cell(2, 2)],
      [cell(0, 3), cell(1, 3), cell(2, 3)],
    ];

    expect(grid(2, 2)).to.eql(m2by2);
    expect(grid(3, 4)).to.eql(m3by4);
  });
});
