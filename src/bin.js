#!/usr/bin/env node

const yargs = require('yargs');
const ora = require('ora');
const providers = require('./providers');
const netometer = require('./index');

const args = yargs
  .option('provider', {
    alias: 'p',
    type: 'array',
    choices: Object.keys(providers),
    default: Object.keys(providers),
    description: 'Only these providers will be tested'
  })
  .option('unit', {
    alias: 'u',
    choices: ['bps', 'kbps', 'mbps', 'gbps', 'tbps'],
    description: 'Convert values to the given unit'
  })
  .option('format', {
    alias: 'f',
    type: 'boolean',
    default: false,
    description: 'Format numbers'
  })
  .option('out', {
    alias: 'o',
    type: 'string',
    normalize: true,
    description: 'Output to given file'
  })
  .parse();

(async function () {
  for (const providerName of args.provider) {
    const spinner = ora({
      color: 'cyan',
      spinner: 'dots'
    });

    try {
      spinner.start(`[${providerName}] Testing speed...`);

      const result = await netometer.testSpeed(providerName, args);

      const formatResult = result => result ? `${result.value} ${result.unit}` : 'N/A';

      const down = formatResult(result.down);
      const up = formatResult(result.up);
      const ping = formatResult(result.ping);

      spinner.succeed(`[${providerName}] Down: ${down} | Up: ${up} | Ping: ${ping}`);

      if (args.out) {
        await netometer.appendToJSONFile(args.out, {
          time: Date.now(),
          provider: providerName,
          down: result.down,
          up: result.up,
          ping: result.ping
        });
      }
    } catch (err) {
      spinner.fail(`[${providerName}] ${err.message}`);
    } finally {
      spinner.clear();
    }
  }
})();
