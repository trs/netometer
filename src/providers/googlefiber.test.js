const googlefiber = require('./googlefiber');

describe('#providers // googlefiber', function () {
  it('test', async function () {
    jest.setTimeout(60000);

    const result = await googlefiber.test();
    console.log(result);

    expect(result).toHaveProperty('down');
    expect(result.down).toHaveProperty('speed');
    expect(result.down).toHaveProperty('unit');

    expect(result).toHaveProperty('up');
    expect(result.up).toHaveProperty('speed');
    expect(result.up).toHaveProperty('unit');

    expect(result).toHaveProperty('ping');
  });
});
