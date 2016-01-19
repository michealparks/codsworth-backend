'use strict'

const http = require('http')
const getFeatPic = require('./wiki-featured-pic')

const PORT = 3000

const JsonHeader = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
}

const route = {
  '/featured-pic': (request, response) => {
    response.writeHead(200, JsonHeader)
    getFeatPic()
      .then(data => response.end(data))
      .catch(err => onError(err, response))
  },
  'default': (request, response) => {
    console.log(`Unhandled request: ${request.url}`)
  }
}

http
  .createServer((request, response) =>
    (route[request.url] || route['default'])(request, response)
  )
  .listen(PORT, () => console.log(`Server listening on port ${PORT}`))

function onError (err, response) {
  response.writeHead(500, JsonHeader)
  response.end(err)
}
