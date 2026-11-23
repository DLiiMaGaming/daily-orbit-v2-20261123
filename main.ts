// The Full Orbit — news-image-20261123 entry program.
//
// The repository holds the finished front page in entry.png (a JPEG file,
// which the competition accepts under the entry.png name). This program's
// only job is to place those exact bytes at the output location the grader
// asks for, so both grading runs produce the identical image.
//
// Local check:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const srcPath = join(here, 'entry.png');
const outPath = join(outDir, 'entry.png');

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');

// Size gate: the competition caps the entry image at 1 MiB.
const srcSize = readFileSync(srcPath).length;
if (srcSize > 1_048_576) {
  throw new Error(`entry.png too large: ${srcSize} bytes exceeds the 1 MiB (1048576 bytes) limit`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(srcPath, outPath);

// Integrity check: the copied bytes must hash identically to the source,
// otherwise the grader would see a different image than the one submitted.
const srcHash = sha256(readFileSync(srcPath));
const outHash = sha256(readFileSync(outPath));
if (srcHash !== outHash) {
  throw new Error(`integrity check failed: source sha256 ${srcHash} != output sha256 ${outHash}`);
}

console.log(`wrote ${outPath} — source ${srcSize} bytes, sha256 ${srcHash}`);
