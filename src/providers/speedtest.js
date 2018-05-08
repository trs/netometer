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

  function getSpeedFactory(element) {
    return async function () {
      return page.evaluate(elem => {
        const $ = document.querySelector.bind(document); // eslint-disable-line

        return {
          speed: Number($(`.result-data > .${elem}`).textContent),
          unit: $(`.result-data > .${elem} + .result-data-unit`).textContent.trim()
        };
      }, element);
    };
  }

  return async function readSpeed() {
    await startTest();
    await waitForTest();

    const getDownloadSpeed = getSpeedFactory('download-speed');
    const getUploadSpeed = getSpeedFactory('upload-speed');
    const getPing = getSpeedFactory('ping-speed');

    const [down, up, ping] = await Promise.all([
      getDownloadSpeed(),
      getUploadSpeed(),
      getPing()
    ]);

    return {
      down,
      up,
      ping
    };
  };
}

async function test() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URL);

  const readSpeed = readSpeedFactory(page);
  const {down, up, ping} = await readSpeed();

  await browser.close();

  return {down, up, ping};
}

module.exports = {
  test,

  readSpeedFactory
};
