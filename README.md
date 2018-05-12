# Netometer

> Run speed tests from your command line.

## CLI

```bash
$ netometer [options]
```

```bash
$ netometer -p fast -p speedtest -u mbps
```

### Options

#### `--help`

Show instructions on how to use the CLI.

#### `--provider` / `-p`

One or more providers to test.

Defaults to [all](#providers).

#### `--unit` / `-u`

Convert speeds to the given unit. Does no conversion if not passed.

Accepts: `bps`, `kbps`, `mbps`, `gbps`, `tbps`, `pbps`

#### `--format` / `-f`

If true, will parse numbers into a more readable format (eg. 1000000 -> 1,000,000).

Defaults to `false`.

## Providers

- https://fast.com
- http://speedtest.net
- http://speedtest.googlefiber.net