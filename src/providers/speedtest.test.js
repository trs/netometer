const speedtest = require('./speedtest');

describe('#providers // speedtest', function () {
  it('test', async function () {
    jest.setTimeout(60000);

    const result = await speedtest.test();

    expect(result).toHaveProperty('down');
    expect(result.down).toHaveProperty('value');
    expect(result.down).toHaveProperty('unit');

    expect(result).toHaveProperty('up');
    expect(result.up).toHaveProperty('value');
    expect(result.up).toHaveProperty('unit');

    expect(result).toHaveProperty('ping');
    expect(result.ping).toHaveProperty('value');
    expect(result.ping).toHaveProperty('unit');
  });
});
