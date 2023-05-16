import zl from 'zip-lib';

import info from '../package.json' assert { type: 'json' };

const name = info.name.split('/').pop();

const filepath = `./dist/${name}-${info.version}.lcp`;

zl.archiveFolder('./lib', filepath).then(
  function () {
    console.log('done');
  },
  function (err) {
    console.log(err);
  }
);
