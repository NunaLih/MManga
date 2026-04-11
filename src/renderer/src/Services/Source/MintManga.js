const axios = require('axios')
const cheerio = require('cheerio')
const normalizeManga = require('../Normalizer/NormalizeManga')

async function searchManga() {
  const { data } = await axios.get('https://a.zazaza.me/list', {
    headers: {
      'User-Agent': 'Mozilla/5.0'
    }
  })

  const $ = cheerio.load(data)
  const results = []

  $('.tile, .manga-item').each((i, el) => {
    const title = $(el).find('.desc h3, .title').text().trim()

    const href = $(el).find('.desc h3 a, .title').attr('href')
    const link = 'https://a.zazaza.me' + href

    const img = $(el).find('img').attr('data-original') || $(el).find('img').attr('src')

    const genre = $(el).find('.badge-light').text()

    results.push({ title, img, link, genre })
  })
  return console.log(results)
}

searchManga()
