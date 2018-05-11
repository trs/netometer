const providers = require('./providers');
const errors = require('./errors');

async function testSpeed(providerName, {unit, format = false} = {}) {
  const provider = providers[providerName];
  if (!provider || !provider.test || typeof provider.test !== 'function') {
    throw new errors.InvalidProvider(providerName);
  }

  const {up, down, ping} = await provider.test();

  if (up) {
    up.speed = convertSpeed(up.speed, up.unit, unit);
  }
  if (down) {
    down.speed = convertSpeed(down.speed, down.unit, unit);
  }

  const formatResult = value => {
    if (!value) return null;
    const speed = format ? getReadableNumber(value.speed) : value.speed;
    const displayUnit = unit || value.unit;
    return {speed, unit: displayUnit};
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

module.exports = {
  testSpeed,

  convertSpeed,
  getReadableNumber
};
