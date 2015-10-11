'use strict'
const request = require('request')
const cheerio = require('cheerio')
const _ = require('lodash')

module.exports = fetch
exports.fetch = fetch

function *fetch(url, rules) {
  const html = yield getHTML(url)
  const $ = cheerio.load(html)

  const tasks = {}
  _.each(rules, (rule, key) => {
    tasks[key] = createTask($, rule)
  })
  // parallel
  return yield tasks
}

function createTask($, rule) {
  return function *task() {
    return yield rule($)
  }
}

function *getHTML(url) {
  return yield function (done) {
    request(url, (err, res, html) => {
      // ignore `res`
      done(err, html)
    })
  }
}
