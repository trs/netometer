const puppeteer = require('puppeteer');

const {delay} = require('../helpers');

const URL = 'https://fast.com';

function readSpeedFactory(page) {
  return async function readSpeed() {
    const down = await page.evaluate(() => {
      const $ = document.querySelector.bind(document); // eslint-disable-line

      return {
        speed: Number($('#speed-value').textContent),
        unit: $('#speed-units').textContent.trim(),
        isDone: Boolean($('#speed-value.succeeded'))
      };
    });

    if (!down.isDone) {
      await delay(100);
      return readSpeed(page);
    }
    return {down};
  };
}

async function test() {
  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();
    await page.goto(URL);

    const readSpeed = readSpeedFactory(page);
    const result = await readSpeed();
    return result;
  } catch (err) {
    throw err;
  } finally {
    await browser.close();
  }
}

module.exports = {
  test,

  readSpeedFactory
};
