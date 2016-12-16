module.exports = function benchmark(name, fn, setup) {
  if (typeof setup === 'function') {
    setup();
  }

  const tick = new Date();

  fn();

  const took = (new Date()) - tick;

  console.log(`${name} | ${took}ms`);
}
