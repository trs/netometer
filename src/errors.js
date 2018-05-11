class InvalidProvider extends Error {
  constructor(providerName) {
    super('Invalid provider');
    this.provider_name = providerName;
  }
}

class ConversionError extends Error {
  constructor(from, to) {
    super('Error converting units');
    this.from = from;
    this.to = to;
  }
}

module.exports = {
  InvalidProvider,
  ConversionError
};
