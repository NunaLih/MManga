import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { fetchChapterInfo, fetchChapterPage } from './MangaDex/MangaDex'

async function getBlob(url) {
  let res = await fetch(url)

  if (!res.ok) throw new Error('Fail' + res.status)

  return await res.blob()
}

function getExt(url) {
  try {
    const clean = url.split('?')[0].split('#')[0]
    const i = clean.lastIndexOf('.')
    if (i === -1) return 'jpg'
    return clean.slice(i + 1)
  } catch {
    return 'jpg'
  }
}

export async function downloadChapterZip(chapterId, onProgress) {
  const pages = await fetchChapterPage(chapterId)
  const info = await fetchChapterInfo(chapterId)

  if (!pages || pages.length === 0) {
    alert('Страницы не найдены')
    return
  }

  let zip = new JSZip()
  const folder = zip.folder('pages')

  let current = 0
  let total = pages.length

  for (let i = 0; i < pages.length; i++) {
    const url = pages[i]
    try {
      const blob = await getBlob(url)
      const ext = getExt(url)

      const name = String(i + 1).padStart(3, '0') + '.' + ext
      folder.file(name, blob)
    } catch (e) {
      console.error('Не скачалось', url, e)
    }

    current++
    if (onProgress) onProgress({ current, total })
  }

  const vol = info?.volume ? 'v' + String(info.volume).padStart(2, '0') : 'v--'
  const ch = info?.chapter ? 'c' + String(info.chapter).padStart(3, '0') : 'c---'
  const filename = `${vol}_${ch}_${chapterId}.zip`

  const out = await zip.generateAsync({ type: 'blob' })
  saveAs(out, filename)

  return {
    id: chapterId,
    vol,
    ch,
    filename,
    pages: total,
    ts: new Date().toISOString()
  }
}
