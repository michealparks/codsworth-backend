'use strict'

const http = require('http')
const getPictureData = require('./featured-picture/featured-picture')

const PORT = 3000

const jsonHeader = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
}

const htmlHeader = {
  'Content-Type': 'text/html'
}

const route = {
  '/featured-pic': (request, response) => {
    const data = getPictureData()

    if (data) {
      return onSuccess(data, response)
    } else {
      return onError('No Picture', response)
    }
  },
  'default': (request, response) => {
    console.log(`Unhandled request: ${request.url}`)
    response.writeHead(404, htmlHeader)
    response.write(`<h1>404</h1>`)
    response.end()
  }
}

http
  .createServer((request, response) =>
    (route[request.url] || route['default'])(request, response)
  )
  .listen(PORT, console.log.bind(console, `Server listening on port ${PORT}`))

function onError (err, response) {
  response.writeHead(500, jsonHeader)
  response.end(err)
}

function onSuccess (data, response) {
  response.writeHead(200, jsonHeader)
  response.end(data)
}
