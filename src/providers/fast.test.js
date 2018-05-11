const fast = require('./fast');

describe('#providers // fast', function () {
  it('test', async function () {
    jest.setTimeout(20000);

    const result = await fast.test();

    expect(result).toHaveProperty('down');
    expect(result.down).toHaveProperty('speed');
    expect(result.down).toHaveProperty('unit');
  });
});
