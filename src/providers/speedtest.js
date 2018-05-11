const puppeteer = require('puppeteer');

const {delay} = require('../helpers');

const URL = 'http://www.speedtest.net/';

function readSpeedFactory(page) {
  async function startTest() {
    const button = await page.$('a.js-start-test');
    await button.click();
  }

  async function waitForTest() {
    const style = await page.evaluate(() => {
      const $ = document.querySelector.bind(document); // eslint-disable-line

      return $('.result-container-meta').style.width;
    });

    if (style === '0px') {
      await delay(100);
      return waitForTest();
    }
  }

  async function getSpeedFromElement(element) {
    return page.evaluate(elem => {
      const $ = document.querySelector.bind(document); // eslint-disable-line

      return {
        speed: Number($(`.result-data > .${elem}`).textContent),
        unit: $(`.result-data > .${elem} + .result-data-unit`).textContent.trim()
      };
    }, element);
  }

  return async function readSpeed() {
    await startTest();
    await waitForTest();

    const [down, up, ping] = await Promise.all([
      getSpeedFromElement('download-speed'),
      getSpeedFromElement('upload-speed'),
      getSpeedFromElement('ping-speed')
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
