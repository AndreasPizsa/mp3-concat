#! /usr/bin/env node

const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(require('@ffmpeg-installer/ffmpeg').path)
ffmpeg.setFfprobePath(require('@ffprobe-installer/ffprobe').path)

function concat(files, output) {
  return new Promise((resolve, reject) => {
    files = Array.isArray(files) ? files : [files]
    files
      .reduce((ffmpeg, file) => ffmpeg.addInput(file), ffmpeg())
      .audioCodec('libmp3lame')
      .on('error', reject)
      .on('end', resolve)
      .mergeToFile(output, require('os').tmpdir())
  })
}

module.exports = concat
