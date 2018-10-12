#! /usr/bin/env node

const fs = require('fs');

[1, 2]
  .map(num => `./file-${num}.mp3.js`)
  .map(require)
  .forEach((data, index) => {
    fs.writeFile(`file-${1 + index}.mp3`, data, {encoding: null})
  })

