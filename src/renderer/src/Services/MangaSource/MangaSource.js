import getSource from '../MangaSource/index'

export async function fetchRaiting(source, id) {
  const api = getSource(source)
  return api.fetchRaiting(id)
}

export async function FetchChapter(id, lang) {
  const api = getSource(source)
  return api.FetchChapter(id, lang)
}

export async function fetchChapterPage(id, lang) {
  const api = getSource(source)
  return api.fetchChapterPage(id, lang)
}

export async function searchManga(query, limit = 50, offset = 0) {
  const api = getSource(source)
  return api.searchManga(query, limit, offset)
}

export async function fetchChapterInfo(chapterId) {
  const api = getSource(source)
  return api.fetchChapterInfo(chapterId)
}

export async function fetchMangaById(id) {
  const api = getSource(source)
  return api.fetchChapterInfo(id)
}
