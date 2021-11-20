/* eslint-disable strict */
"use strict";
const { readFileSync, writeFileSync } = require("fs");

const relativePathToLogFile = `${__dirname}/../dce.log`;

const lines = readFileSync(relativePathToLogFile).toString().split("\n");

const filteredLines = lines
  .filter((line) => {
    return !line.includes(`(used in module)`);
  })
  .filter((line) => {
    return !line.includes(`default`);
  })
  .join("\n");

writeFileSync(relativePathToLogFile, filteredLines);
