'use strict'

const fetch = require('isomorphic-fetch')

module.exports = function determineSize (data) {
  console.log(data)
  return fetch(data.url)
    .then(response => response.ok ? data : determineSize(reduceSize(data)))
    .catch(() => determineSize(reduceSize(data)))
}

function reduceSize (data) {
  data.size -= 100
  data.url = data.url.replace(/[0-9]{1,4}\px/, `${data.size}px`)
  return data
}
