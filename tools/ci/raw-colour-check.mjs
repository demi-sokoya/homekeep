#!/usr/bin/env node
/**
 * raw-colour-check — fails when a colour literal appears outside the design tokens (ST-002).
 *
 * Usage: node tools/ci/raw-colour-check.mjs <path>... [--allow <file>]...
 * Scans .ts .tsx .js .jsx .mjs .css files under each path for hex colours (#rgb, #rgba, #rrggbb,
 * #rrggbbaa) and rgb()/rgba()/hsl()/hsla() calls. Prints "file:line:column  match" for each one and
 * exits 1 if any are found. A path that does not exist is an error, so the check cannot pass on nothing.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, resolve, extname } from 'node:path';
import { pathToFileURL } from 'node:url';

const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.css']);
const SKIP_DIRS = new Set(['node_modules', 'dist', 'coverage', '.git']);
const COLOUR =
  /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![0-9a-zA-Z_-])|\b(?:rgba?|hsla?)\(\s*[\d.]/g;

/** @param {string} text @returns {{line:number,column:number,match:string}[]} */
export function findColours(text) {
  const hits = [];
  text.split('\n').forEach((lineText, i) => {
    for (const m of lineText.matchAll(COLOUR)) {
      hits.push({ line: i + 1, column: m.index + 1, match: m[0] });
    }
  });
  return hits;
}

/** @param {string} dir @returns {string[]} */
function listFiles(dir) {
  if (statSync(dir).isFile()) return [dir];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory()) return SKIP_DIRS.has(entry.name) ? [] : listFiles(join(dir, entry.name));
    return EXTENSIONS.has(extname(entry.name)) ? [join(dir, entry.name)] : [];
  });
}

/** @param {string[]} argv @returns {{findings:string[], errors:string[]}} */
export function run(argv) {
  const paths = [];
  const allow = new Set();
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--allow') allow.add(resolve(argv[++i] ?? ''));
    else paths.push(argv[i]);
  }
  const errors = [];
  if (paths.length === 0) errors.push('No paths given');
  const findings = [];
  for (const p of paths) {
    if (!existsSync(p)) {
      errors.push(`Path not found: ${p}`);
      continue;
    }
    for (const file of listFiles(p)) {
      if (allow.has(resolve(file))) continue;
      for (const hit of findColours(readFileSync(file, 'utf8'))) {
        findings.push(`${relative(process.cwd(), file)}:${hit.line}:${hit.column}  ${hit.match}`);
      }
    }
  }
  return { findings, errors };
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const { findings, errors } = run(process.argv.slice(2));
  for (const e of errors) console.error(e);
  if (findings.length) {
    console.error(`Raw colours found (use a token from src/styles/colors_and_type.css instead):`);
    for (const f of findings) console.error(`  ${f}`);
  }
  process.exit(errors.length || findings.length ? 1 : 0);
}
