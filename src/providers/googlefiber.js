const puppeteer = require('puppeteer');

const {delay} = require('../helpers');

const URL = 'http://speedtest.googlefiber.net';

function readSpeedFactory(page) {
  async function startTest() {
    const button = await page.$('#run-test');
    const disabledProperty = await button.getProperty('disabled');
    const isDisabled = await disabledProperty.jsonValue();
    if (isDisabled) {
      await delay(100);
      return startTest();
    }
    await button.click();
  }

  async function confirmStart() {
    const hasPopup = await page.$('.confirm-speedtest-popup');
    if (!hasPopup) return;

    const button = await hasPopup.$('.actionButton-confirmSpeedtest');
    await button.click();
  }

  async function waitForTest() {
    const success = await page.evaluate(() => {
      const $ = document.querySelector.bind(document); // eslint-disable-line

      return $('#speedometer .current-speed span[name=\'data\']').textContent === 'Done';
    });

    if (!success) {
      await delay(100);
      return waitForTest();
    }
  }

  async function getSpeedFromElement(element) {
    const result = await page.evaluate(elem => {
      const $ = document.querySelector.bind(document); // eslint-disable-line

      return {
        value: Number($(`#speeds .${elem} > .transfer-speed`).textContent),
        unit: $(`#speeds .${elem} > .transfer-units`).textContent
      };
    }, element);

    return result;
  }

  async function getPingFromElement() {
    const result = await page.evaluate(() => {
      const $ = document.querySelector.bind(document); // eslint-disable-line

      return {
        value: Number($('#ping .speed-value > span[name=\'ping\']').textContent),
        unit: $('#ping .speed-value > span[name=\'pingUnits\']').textContent
      };
    });

    return result;
  }

  return async function readSpeed() {
    await startTest();
    await delay(1000);
    await confirmStart();
    await delay(100);

    await waitForTest();

    const [down, up, ping] = await Promise.all([
      getSpeedFromElement('upload-speed'), // Yes, upload-speed is download
      getSpeedFromElement('download-speed'), // Yes, download-speed is upload
      getPingFromElement()
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
