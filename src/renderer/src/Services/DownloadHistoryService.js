const KEY = 'downloadHistory_ls'

export function getDownloadHistory() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function addDownloadHistory(entry) {
  const list = getDownloadHistory()

  list.unshift(entry)

  const trimmed = list.slice(0, 200)
  localStorage.setItem(KEY, JSON.stringify(trimmed))
}

export function clearDownloadHistory() {
  localStorage.removeItem(KEY)
}
