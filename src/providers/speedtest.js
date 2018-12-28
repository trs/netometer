const puppeteer = require('puppeteer');
const {delay} = require('../helpers');

const URL = 'http://www.speedtest.net/';

function readSpeedFactory(page) {
  async function startTest() {
    const button = await page.$('a.js-start-test');
    await button.click();
  }

  async function waitForTest() {
    const success = await page.evaluate(() => {
      // eslint-disable-next-line no-undef
      const $ = document.querySelector.bind(document);

      return $('.result-item-id').style.display !== 'none';
    });

    if (!success) {
      await delay(100);
      return waitForTest();
    }
  }

  async function getSpeedFromElement(element) {
    return page.evaluate(elem => {
      // eslint-disable-next-line no-undef
      const $ = document.querySelector.bind(document);

      return {
        value: Number($(`.result-item.result-item-${elem} > .result-data > .number`).textContent),
        unit: $(`.result-item.result-item-${elem} > .result-label > .result-data-unit`).textContent.trim()
      };
    }, element);
  }

  return async function readSpeed() {
    await startTest();
    await waitForTest();

    const [down, up, ping] = await Promise.all([
      getSpeedFromElement('download'),
      getSpeedFromElement('upload'),
      getSpeedFromElement('ping')
    ]);

    return {down, up, ping};
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
