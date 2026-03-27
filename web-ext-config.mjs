// untyped chaos because of course
// https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/#use-the-configuration-file
// web-ext doesn't work very well with deno so I can't import @std/dotenv

import { readFileSync } from 'node:fs';
import { env } from 'node:process';

/** @type {Record<string,string>} */
const dotEnv = Object.fromEntries(
  readFileSync('.env', { encoding: 'utf-8' })
    .split('\n')
    .map((line) => line.trim().split('=', 2)),
);

/**
 * @param {string} key
 * @returns {string}
 */
function envOrThrow(key) {
  if (key in dotEnv) return dotEnv[key];
  if (key in env) return env[key];
  throw new Error(`env var ${key} is undefined`);
}

export default {
  verbose: false,
  build: {
    overwriteDest: true,
  },
  sourceDir: 'src/',
  sign: {
    amoMetadata: 'src/metadata.json',
    apiKey: envOrThrow('WEB_EXT_API_KEY'),
    apiSecret: envOrThrow('WEB_EXT_API_SECRET'),
    channel: 'unlisted',
  },
};
