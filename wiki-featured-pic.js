'use strict'

const Wiki = require('wikijs')
const cheerio = require('cheerio')

const wiki = new Wiki()
let featPicJSON

setInterval(() =>
  getFeatPic(true).then(data => featPicJSON = data),
  1000 * 60 * 60 * 24
)

getFeatPic(true)

function getFeatPic (update) {
  return new Promise((resolve, reject) => {
    if (!update && featPicJSON) return resolve(featPicJSON)

    wiki.page('Main Page').then(page => {
      page.html().then(content => {
        const $ = cheerio.load(content)
        const section = $('#mp-lower')
        const rawUrl = section.find('img').attr('src').split('/')
        const size = rawUrl.pop().replace(/^[0-9]{3,4}\px/, '2000px')
        const url = `https:${rawUrl.join('/')}/${size}`
        const description = section.find('p').first()

        description.find('a').each(function (i, el) {
          $(this).attr('href', `https://wikipedia.org${$(this).attr('href')}`)
        })

        resolve(JSON.stringify({
          time: Date.now(),
          url: url,
          description: description.html()
        }))
      })
      .catch(err => reject(err))
    })
    .catch(err => reject(err))
  })
}

module.exports = getFeatPic
