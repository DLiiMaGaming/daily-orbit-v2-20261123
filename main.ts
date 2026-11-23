// The Full Orbit — news-image-20261123 entry program.
//
// The repository holds the finished front page in entry.png (a JPEG file,
// which the competition accepts under the entry.png name). This program's
// only job is to place those exact bytes at the output location the grader
// asks for, so both grading runs produce the identical image.
//
// Local check:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });
copyFileSync(join(here, 'entry.png'), join(outDir, 'entry.png'));

console.log('wrote', join(outDir, 'entry.png'));
