import {expect} from 'chai';
import {unfold} from './unfold';

describe(`Unfold utility behaves like opposite of fold or reduce it takes initial
seed and a function and returns a list out of it. Hence it should`, () => {
  it('exist', () => expect(unfold).to.be.a('function'));

  it(`unfold a seed into a list of items`, () => {
    const nToZero = (n) => (n < 0 ? undefined: [n - 1, n]);

    expect(unfold(nToZero, 10)).to.eql([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
    expect(unfold(nToZero, 7)).to.eql([7, 6, 5, 4, 3, 2, 1, 0]);
    expect(unfold(nToZero, 5)).to.eql([5, 4, 3, 2, 1, 0]);
    expect(unfold(nToZero, 4)).to.eql([4, 3, 2, 1, 0]);
  });
});
