'use strict'

const requestPicture = require('./request-picture')
const findFace = require('./find-face')
const determineSize = require('./determine-size')

let picture

processPicture()

function processPicture () {
  return requestPicture()
    .then(determineSize)
    .then(findFace)
    .then(data => {
      picture = JSON.stringify(data)
      setTimeout(processPicture, 1000 * 60 * 60 * 24)
    })
}

module.exports = function getPictureData () {
  return picture
}
