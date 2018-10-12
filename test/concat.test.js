const util = require('util')
const fs = require('fs')
const tempy = require('tempy')

const test = require('ava')
const concat = require('../concat.js')

test(
  'multiple files',
  testCompareFiles,
  [1, 2].map(x => r(`./fixtures/file-${x}.mp3`)),
  'fixtures/concat.mp3'
)

async function testCompareFiles(t, input, expectedFilename) {
  const outputFilename = tempy.file({extension: 'mp3'})
  await concat(input, outputFilename)

  const readFile = util.promisify(fs.readFile)
  const [created, expected] = await Promise.all([
    readFile(outputFilename),
    readFile(r(expectedFilename))
  ])
  t.true(created.equals(expected))
}

function r(name) {
  const {resolve} = require('path')
  return resolve(__dirname, name)
}
