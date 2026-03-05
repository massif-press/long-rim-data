const fs = require('fs');
const path = require('path');

const libDir = './lib';
const files = fs.readdirSync(libDir).filter((f) => f.endsWith('.json'));
let valid = true;

files.forEach((filename) => {
  const filepath = path.join(libDir, filename);
  const contents = fs.readFileSync(filepath, 'utf-8');
  let data;
  try {
    data = JSON.parse(contents);
  } catch (e) {
    return; // skip invalid JSON, handled by test.js
  }

  if (!Array.isArray(data)) return;

  data.forEach((obj, i) => {
    if (typeof obj !== 'object' || obj === null) return;
    if ('license' in obj && obj.license !== '' && !('license_id' in obj)) {
      console.error(
        `${filename}: object at index ${i} (id: ${obj.id || 'unknown'}) has "license" but missing "license_id"`,
      );
      valid = false;
    }
  });
});

if (valid) {
  console.log('All objects with "license" also have "license_id".');
} else {
  throw 'One or more objects have "license" without a corresponding "license_id".';
}
