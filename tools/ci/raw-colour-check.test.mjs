import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { findColours, run } from './raw-colour-check.mjs';

test('finds hex colours of every length', () => {
  const hits = findColours('a { color: #fff; b: #F2F5EE; c: #4E7A25cc; d: #abcd; }');
  assert.deepEqual(hits.map((h) => h.match), ['#fff', '#F2F5EE', '#4E7A25cc', '#abcd']);
});

test('finds rgb, rgba, hsl and hsla calls', () => {
  const hits = findColours('rgba(0,0,0,0.38) rgb( 1 2 3) hsl(90 20% 50%) hsla(1, 2%, 3%, .5)');
  assert.equal(hits.length, 4);
});

test('reports line and column', () => {
  const [hit] = findColours('ok\n  color: #C87A3A;');
  assert.deepEqual({ line: hit.line, column: hit.column }, { line: 2, column: 10 });
});

test('ignores tokens, ids and non-colour hashes', () => {
  const text = 'color: var(--color-accent); #root {} url(#gradient) "#1234567" currentColor';
  assert.deepEqual(findColours(text), []);
});

test('scans a folder, honours --allow, skips other file types', () => {
  const dir = mkdtempSync(join(tmpdir(), 'raw-colour-'));
  mkdirSync(join(dir, 'styles'));
  writeFileSync(join(dir, 'styles', 'tokens.css'), ':root { --color-accent: #4E7A25; }');
  writeFileSync(join(dir, 'Card.module.css'), '.card { border: 1px solid #C8DDB0; }');
  writeFileSync(join(dir, 'notes.md'), '#ffffff');
  const { findings, errors } = run([dir, '--allow', join(dir, 'styles', 'tokens.css')]);
  assert.deepEqual(errors, []);
  assert.equal(findings.length, 1);
  assert.match(findings[0], /Card\.module\.css:1:\d+ {2}#C8DDB0$/);
});

test('a missing path is an error, not a pass', () => {
  const { errors } = run(['does-not-exist']);
  assert.deepEqual(errors, ['Path not found: does-not-exist']);
});
