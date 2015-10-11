const fetch = require('../')
const co = require('co')

co(run)
  .then(results => {
    console.log(results)
  })
  .catch(err => {
    // seems throw in main process no longer allowed
    // if (err) throw err
    if (err) console.error(err)
  })

function *run() {
  const url = 'https://github.com/fritx'
  const rules = {
    *stats($) {
      const $stats = $('.vcard-stat')
      const stats = {}
      $stats.each((i, el) => {
        const $el = $(el)
        const key = $el.find('.text-muted').text()
        const val = Number($el.find('.vcard-stat-count').text())
        stats[key] = val
      })
      return stats
    },
    *repos($) {
      // `:first` not supported in cheerio
      // const $repos = $('ul.mini-repo-list:first > li')
      const $repos = $('ul.mini-repo-list').first().find('li')
      const repos = []
      $repos.each((i, el) => {
        const $repo = $(el)
        repos.push({
          title: $repo.find('.repo').text(),
          desc: $repo.find('.repo-description').text(),
          stars: Number($repo.find('.stars').text())
        })
      }).get()
      return repos
    }
  }
  return yield fetch(url, rules)
}
