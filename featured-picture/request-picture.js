'use strict'

const Wiki = require('wikijs')
const cheerio = require('cheerio')
const wiki = new Wiki()

module.exports = function requestPicture () {
  return wiki.page('Main Page')
    .then(page => page.html())
    .then(content => {
      const $ = cheerio.load(content)
      const section = $('#mp-lower')
      const rawUrl = section.find('img').attr('src').split('/')
      const size = rawUrl.pop().replace(/^[0-9]{3,4}\px/, '2000px')
      const url = `https:${rawUrl.join('/')}/${size}`
      const description = section.find('p').first()

      description.find('a').each((i, el) => {
        const $this = $(this)
        $this.attr('href', `https://wikipedia.org${$this.attr('href')}`)
        $this.attr('target', '_blank')
      })

      return {
        time: Date.now(),
        url: url,
        size: 2000,
        description: description.html()
      }
    })
}
