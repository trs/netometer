const {promisify} = require('util');
const fs = require('fs');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const providers = require('./providers');
const errors = require('./errors');

async function testSpeed(providerName, {unit, format = false} = {}) {
  const provider = providers[providerName];
  if (!provider || !provider.test || typeof provider.test !== 'function') {
    throw new errors.InvalidProvider(providerName);
  }

  const {up, down, ping} = await provider.test();

  if (up) {
    up.value = convertSpeed(up.value, up.unit, unit);
  }
  if (down) {
    down.value = convertSpeed(down.value, down.unit, unit);
  }

  // TODO: convert ping
  // if (ping) {
  //   ping.value = ping.value;
  // }

  const formatResult = result => {
    if (!result) return null;
    const value = format ? getReadableNumber(result.value) : parseFloat(result.value);
    const displayUnit = unit || result.unit;
    return {value, unit: displayUnit};
  };

  return {
    up: formatResult(up),
    down: formatResult(down),
    ping: formatResult(ping)
  };
}

function getReadableNumber(value) {
  let parts = value.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

function convertSpeed(value, fromUnit, toUnit) {
  if (!toUnit) return value;

  const prefixArray = [null, '', 'k', 'm', 'g', 't', 'p'];

  const getUnitPrefix = unit => unit.toLowerCase().replace(/bps$/, '');
  const getPrefixIndex = prefix => ~prefixArray.indexOf(prefix);

  const fromPrefix = getUnitPrefix(fromUnit);
  const toPrefix = getUnitPrefix(toUnit);

  const fromIndex = getPrefixIndex(fromPrefix);
  const toIndex = getPrefixIndex(toPrefix);

  if (!fromIndex || !toIndex) throw new errors.ConversionError(fromUnit, toUnit);

  const difference = toIndex - fromIndex;

  if (difference > 0) {
    return value * 1000 ** difference;
  } else if (difference < 0) {
    return value / 1000 ** Math.abs(difference);
  } else {
    return value;
  }
}

async function appendToJSONFile(path, data) {
  data = Array.isArray(data) ? data : [data];
  if (fs.existsSync(path)) {
    const existingData = JSON.parse(await readFile(path));
    data = [...existingData, ...data];
  }

  await writeFile(path, JSON.stringify(data, null, 2));
}

module.exports = {
  testSpeed,

  convertSpeed,
  getReadableNumber,
  appendToJSONFile
};
