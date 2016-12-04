export const unfold = (fun, seed) => {
  // s stands for seed. a stands for accumulator.
  const go = (s, accumulator) => {
    const result = fun(s);

    // Undefined result indicates end of unfolding.
    if (result === undefined) return accumulator;

    const [nextSeed, product] = result;

    return go(nextSeed, accumulator.concat([product]));
  };

  return go(seed, []);
};
