// Regenerate the static Brotli representations after editing any landing HTML.
// Uses only Node built-ins; no dependency installation is needed.
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');

const pages = ['index.html', ...'abcde'.split('').map(slug => `${slug}/index.html`)];
const results = {};
for (const name of pages) {
  const file = path.join(__dirname, name);
  const html = fs.readFileSync(file);
  const packed = zlib.brotliCompressSync(html, {
    params: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
      [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_GENERIC,
    },
  });
  if (!zlib.brotliDecompressSync(packed).equals(html)) throw new Error(`Brotli mismatch: ${name}`);
  fs.writeFileSync(file + '.br', packed);
  results[name] = packed.length;
}
console.log(JSON.stringify(results));
