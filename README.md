# cracker

- Based on [request][1] & [cheerio][2]
- [Xo][3] Coding Style
- ES6 Generator Style

## Usage

<img width="563" height="185" src="https://raw.githubusercontent.com/fritx/cracker/dev/pic/Snip20151011_1.png">

```js
// examples/github-profile.js
const fetch = require('cracker')

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
```

## Todo

- [ ] CLI Usage
- [ ] AJAX Support

[1]: https://github.com/request/request
[2]: https://github.com/cheeriojs/cheerio
[3]: https://github.com/sindresorhus/xo
