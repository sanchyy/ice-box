var icebox = require('../')()
var fs = require('fs')
var path = require('path')
var tar = require('tar-fs')
var concat = require('concat-stream')

process.stdin.pipe(concat(function (buf) {
  var src = buf.toString().trim()

  icebox(function (dst, done) {
    tar
      .pack(src)
      .pipe(fs.createWriteStream(path.join(dst, 'my-tarball.tar')))
      .on('finish', done)
  }, function (err, finalDir) {
    if (err) {
      console.error(err)
      process.exit(1)
    }

    console.log(finalDir)
  })
}))

