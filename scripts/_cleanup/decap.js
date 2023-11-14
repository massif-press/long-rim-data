#!/usr/bin/node

const fs = require('fs');
const path = require('path');

const folderPath = './lib';
const ignore = ['manufacturers.json', 'lcp_manifest.json'];

const ignoreWords = ['{VAL}', '({VAL})', '{VAL}+', 'HP', 'GRIT', 'SP', 'AP', '(AP)'];

function _decap(string) {
  const words = string.split(' ');
  const capitalizedWords = words.map((word) => {
    if (ignoreWords.some((x) => x === word)) return word;
    else if (word === word.toUpperCase()) {
      return word.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
    } else {
      return word;
    }
  });
  const capitalizedString = capitalizedWords.join(' ');
  return capitalizedString;
}

const decap = (commit) => {
  let fixed = 0;
  const files = fs.readdirSync(folderPath);

  files.forEach((file) => {
    if (ignore.some((x) => x === file)) return;
    const filePath = path.join(folderPath, file);

    const data = fs.readFileSync(filePath, 'utf8');

    const jsonObject = JSON.parse(data);
    if (Array.isArray(jsonObject)) {
      jsonObject.forEach((e) => {
        if (e.name) {
          if (e.name.includes('ERR:')) return;
          if (e.name === e.name.toUpperCase()) {
            const decapped = _decap(e.name);
            if (e.name !== decapped) {
              if (!commit) {
                console.log('decap needed:', e.name, ' => ', decapped);
              } else {
                e.name = decapped;
                fixed++;
              }
            }
          }
        }
      });
      if (commit) {
        fs.writeFileSync(filePath, JSON.stringify(jsonObject, null, 2));
      }
    }
  });
  if (commit) console.log(`fixed: ${fixed} entries in ${files.length} files`);
};

module.exports = decap;
