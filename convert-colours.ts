#!/usr/bin/env -S deno --allow-all

import Color from 'color';
import { join, sep } from 'node:path';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const SOURCE = 'manifest-base.json';
const DEST = 'src/manifest.json';

if (DEST.split(sep).length > 1) {
  const parts = DEST.split(sep);
  parts.pop();
  const path = join(...parts);
  await mkdir(path, { recursive: true });
}

interface ThemeManifest {
  dark_theme?: {
    colors?: Record<string, string>;
  };
  theme?: {
    colors?: Record<string, string>;
  };
}

function replaceColours(record: Record<string, string>) {
  for (const [name, orig] of Object.entries(record)) record[name] = Color(orig).hsl().round().string();
}

const contents = await readFile(SOURCE, { encoding: 'utf-8' });
const parsed: ThemeManifest = JSON.parse(contents);
if (parsed.dark_theme?.colors) replaceColours(parsed.dark_theme.colors);
if (parsed.theme?.colors) replaceColours(parsed.theme.colors);
await writeFile(DEST, JSON.stringify(parsed, null, 2));
