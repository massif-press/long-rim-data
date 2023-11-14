#!/usr/bin/node
const readline = require('readline');
const decap = require('./_cleanup/decap.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function ask(q) {
  return new Promise((resolve, reject) => {
    rl.question(q, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  decap();
  const userInput = await ask(`Are you sure you want to commit these renames? (y/n)`);
  if (userInput === 'y') {
    decap(true);
  } else {
    console.log('aborting decap/rename');
  }
  rl.close();
}

main().catch((error) => {
  console.error('An error occurred:', error);
});
