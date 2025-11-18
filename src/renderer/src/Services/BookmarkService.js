const STORAGE_KEY = 'bookmarks'

export function getBookmarks() {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved ? JSON.parse(saved) : []
}

export function addBookmarks(manga) {
  let bookmarks = getBookmarks()

  if (!bookmarks.find((m) => m.id === manga.id)) {
    bookmarks.push(manga)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
  }
}

export function removeBookmarks(id) {
  const bookmarks = getBookmarks().filter((m) => m.id !== id)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
}

export function isBookmared(id) {
  return getBookmarks().some((m) => m.id === id)
}
