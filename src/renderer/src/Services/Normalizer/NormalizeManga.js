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

function normalizeManga(manga) {
  // let attributes = manga.attributes

  // let allTitle = attributes.altTitles.map(normalizeTitle)

  // let tags = attributes.tags.map(normalizeTags)

  // let coverArt = manga.relationships.find((r) => r.type == 'cover_art')
  // let coverUrl = `https://uploads.mangadex.org/covers/${manga.id}/${coverArt.attributes.fileName}.256.jpg`

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

function normalizeRaiting(statistics, id) {
  let stat = statistics[id]
  return {
    follows: stat.follows,
    rating: stat.rating ? stat.rating.average : 0
  }
}
