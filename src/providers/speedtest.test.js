const speedtest = require('./speedtest');

describe.only('#providers // speedtest', function () {
  it('test', async function () {
    jest.setTimeout(60000);

    const result = await speedtest.test();

    expect(result).toHaveProperty('down');
    expect(result.down).toHaveProperty('speed');
    expect(result.down).toHaveProperty('unit');

    expect(result).toHaveProperty('up');
    expect(result.up).toHaveProperty('speed');
    expect(result.up).toHaveProperty('unit');

    expect(result).toHaveProperty('ping');
  });
});
