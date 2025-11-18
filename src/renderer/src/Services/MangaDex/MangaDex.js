import axios from 'axios'

function normalizeTags(tag) {
  return {
    id: tag.id,
    type: tag.type,
    group: tag.attributes.group,
    tag: tag.attributes.name?.en || 'тегов нет'
  }
}

function normalizeTitle(title) {
  return {
    ...title
  }
}

function normalizeManga(manga) {
  let attributes = manga.attributes

  let allTitle = attributes.altTitles.map(normalizeTitle)

  let tags = attributes.tags.map(normalizeTags)

  let coverArt = manga.relationships.find((r) => r.type == 'cover_art')
  let coverUrl = `https://uploads.mangadex.org/covers/${manga.id}/${coverArt.attributes.fileName}.256.jpg`

  return {
    id: manga.id,
    lastChapter: attributes.lastChapter || 'Неизвестно',
    year: attributes.year,
    status: attributes.status,
    description: attributes.description.en || 'Нет описания на англ',
    title: attributes.title.en || attributes.title.ja || attributes.title.ru,
    coverUrl: coverUrl,
    originalLanguage: attributes.originalLanguage,
    allTitle,
    tags
  }
}

function normalizeChapter(chapter) {
  const attr = chapter.attributes
  return {
    id: chapter.id,
    volume: attr.volume || '—',
    chapter: attr.chapter || '—',
    title: attr.title || '',
    translatedLanguage: attr.translatedLanguage,
    publishAt: attr.publishAt,
    readableAt: attr.readableAt
  }
}

export async function fetchManga(limit = 100, offset = 0) {
  const baseUrl = 'https://api.mangadex.org'

  const resp = await axios({
    method: 'GET',
    url: `${baseUrl}/manga/?limit=${limit}&offset=${offset}&includes[]=cover_art`
  })
  let result
  console.log(resp)
  result = resp.data.data.map(normalizeManga)
  console.log(result)
  return result
}

function normalizeRaiting(statistics, id) {
  let stat = statistics[id]
  return {
    follows: stat.follows,
    rating: stat.rating ? stat.rating.average : 0
  }
}

export async function fetchRaiting(id) {
  const baseUrl = 'https://api.mangadex.org'

  const resp = await axios({
    method: 'GET',
    url: `${baseUrl}/statistics/manga/${id}`
  })
  let result
  result = normalizeRaiting(resp.data.statistics, id)
  return result
}

export async function FetchChapter(id, lang) {
  const baseUrl = 'https://api.mangadex.org'

  const params = {
    includeFuturePublishAt: 0,
    limit: 500,
    order: { chapter: 'desc' }
  }

  if (lang && lang !== 'all') {
    params['translatedLanguage[]'] = lang
  }

  const resp = await axios.get(`${baseUrl}/manga/${id}/feed`, { params })

  let result = resp.data.data
  const chapters = result.map(normalizeChapter)

  chapters.sort(compareChapters)
  chapters.reverse()

  return chapters
}

export async function fetchChapterPage(id, lang) {
  let baseUrl = 'https://api.mangadex.org'

  const resp = await axios({
    method: 'GET',
    url: `${baseUrl}/at-home/server/${id}`
  })

  let base = resp.data.baseUrl
  let hash = resp.data.chapter.hash
  let data = resp.data.chapter.data
  return data.map((filename) => `${base}/data/${hash}/${filename}`)
}

export async function searchManga(query, limit = 50, offset = 0) {
  const baseUrl = 'https://api.mangadex.org'
  const resp = await axios({
    method: 'GET',
    url: `${baseUrl}/manga/`,
    params: {
      title: query,
      limit,
      offset,
      includes: ['cover_art']
    }
  })
  return resp.data.data.map(normalizeManga)
}

export async function fetchChapterInfo(chapterId) {
  const baseUrl = 'https://api.mangadex.org'
  const resp = await axios({
    method: 'GET',
    url: `${baseUrl}/chapter/${chapterId}`
  })
  return normalizeChapter(resp.data.data)
}

export async function fetchMangaById(id) {
  const baseUrl = 'https://api.mangadex.org'

  const resp = await axios({
    method: 'GET',
    url: `${baseUrl}/manga/${id}`,
    params: {
      includes: ['cover_art']
    }
  })

  return normalizeManga(resp.data.data)
}

//ДОДЕЛАТЬ!
function getSortValue(value) {
  if (value === null || value === undefined || value === '—') {
    return { num: 0, str: '' }
  }
  const num = parseFloat(value)
  if (isNaN(num)) {
    return { num: Infinity, str: value }
  }
  return { num: num, str: value }
}

function compareChapters(a, b) {
  const volA = getSortValue(a.volume)
  const volB = getSortValue(b.volume)

  if (volA.num !== volB.num) {
    return volA.num - volB.num
  }

  const chA = getSortValue(a.chapter)
  const chB = getSortValue(b.chapter)

  if (chA.num !== chB.num) {
    return chA.num - chB.num
  }

  if (volA.str !== volB.str) {
    return volA.str.localeCompare(volB.str)
  }

  return chA.str.localeCompare(chB.str)
}
