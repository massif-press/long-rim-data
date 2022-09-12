const fs = require('fs');

const file = fs.readFileSync("./package.json", {
  encoding: "utf-8",
});

const json = JSON.parse(file);

// Set package's name to scoped variant for publishing to GPR
// @scope/pkgname ( '@scope' must be passed in as an argument vector)
// ex: node gpr-publishing.js @myscope --> "name": "@myscope/pkgname"
let newName = process.argv[2] + "/" + json.name;

json.name = newName.toLowerCase();

fs.writeFileSync("./package.json", JSON.stringify(json, undefined, 2));
