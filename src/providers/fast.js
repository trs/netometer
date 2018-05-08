const puppeteer = require('puppeteer');

const {delay} = require('../helpers');

const URL = 'https://fast.com';

function readSpeedFactory(page) {
  return async function readSpeed() {
    const result = await page.evaluate(() => {
      const $ = document.querySelector.bind(document); // eslint-disable-line

      return {
        speed: Number($('#speed-value').textContent),
        unit: $('#speed-units').textContent.trim(),
        isDone: Boolean($('#speed-value.succeeded'))
      };
    });

    if (!result.isDone) {
      await delay(100);
      return readSpeed(page);
    }
    return result;
  };
}

async function test() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URL);

  const readSpeed = readSpeedFactory(page);
  const {speed, unit} = await readSpeed();

  await browser.close();

  return {
    down: {speed, unit}
  };
}

module.exports = {
  test,

  readSpeedFactory
};
