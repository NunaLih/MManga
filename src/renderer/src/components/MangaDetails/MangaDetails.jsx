import React, { useEffect, useState } from 'react'
import { FetchChapter, fetchRaiting, fetchMangaById } from '../../Services/MangaDex/MangaDex'
import Reader from '../Reader/Reader'
import { useNavigate, useParams } from 'react-router-dom'
import { isBookmared, removeBookmarks, addBookmarks } from '../../Services/BookmarkService.js'
import { downloadChapterZip } from '../../Services/DownloadService.js'
import { addDownloadHistory } from '../../Services/DownloadHistoryService.js'

export default function MangaDetails() {
  const { mangaId } = useParams()
  const navigate = useNavigate()

  const [chapters, setChapters] = useState([])
  const [loading, setLoading] = useState(false)
  const [rating, setRating] = useState({})

  const [manga, setManga] = useState(null)
  const [bookmarked, setBookmarked] = useState(false)

  const [language, setLanguage] = useState('en')

  const [downloadingId, setDownloadingId] = useState(null)
  const [progress, setProgress] = useState(null)

  useEffect(() => {
    if (!mangaId) return

    async function loadManga() {
      try {
        setLoading(true)
        const data = await fetchMangaById(mangaId)
        setManga(data)
        setBookmarked(isBookmared(mangaId))
        const ch = await FetchChapter(mangaId, language)
        setChapters(ch)
        const rt = await fetchRaiting(mangaId)
        setRating(rt)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    loadManga()
  }, [mangaId, language])

  useEffect(() => {
    if (manga?.id) {
      setBookmarked(isBookmared(manga.id))
    }
  }, [manga])

  const toggleBookmark = () => {
    if (bookmarked) {
      removeBookmarks(manga.id)
      setBookmarked(false)
    } else {
      addBookmarks(manga)
      setBookmarked(true)
    }
  }

  async function handleDownload(chId) {
    try {
      setDownloadingId(chId)
      setProgress({ current: 0, total: 1 })
      const meta = await downloadChapterZip(chId, setProgress)
      addDownloadHistory({
        ...meta,
        coverUrl: manga.coverUrl,
        mangaId: manga?.id,
        title: manga?.allTitle?.find((t) => t.en)?.en || manga?.title
      })
    } catch (e) {
      console.error(e)
      alert('Ошибка скачивания')
    } finally {
      setDownloadingId(null)
      setProgress(null)
    }
  }
  if (loading || !manga) {
    return (
      <div className="content">
        <div className="loader">
          <div className="loader-circle"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="manga-details">
      <div className="details-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Назад
        </button>
      </div>

      <div className="details-main">
        <img src={manga.coverUrl} alt={manga.title} className="cover" />

        <div className="info">
          <h1>{manga.allTitle.find((t) => t.en)?.en || manga.title}</h1>
          <p className="authors">Author(s): {manga.authors?.join(', ')}</p>
          <p>
            Status: <strong>{manga.status}</strong>
          </p>
          <p>
            Original Language: <strong>{manga.originalLanguage}</strong>
          </p>
          <p>Rating: {rating?.rating?.toFixed(2) || '—'}</p>

          <div className="tags">
            {manga.tags.map((tag) => (
              <span key={tag.id} className="tag">
                {tag.tag}
              </span>
            ))}
          </div>

          <p className="description">{manga.description}</p>

          <button onClick={toggleBookmark} className="bookmark-btn">
            {bookmarked ? 'Убрать из закладок' : 'Добавить в закладки'}
          </button>
        </div>
        <div className="chapters">
          <div className="chapters-header">
            <h2>Chapters</h2>
            <div className="filters">
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="all">All language</option>
                <option value="ru">Russian</option>
                <option value="en">English</option>
                <option value="pt-br">Portuguese</option>
                <option value="vi">Vietnamese</option>
                <option value="zh-hk">Chinese</option>
                <option value="ja">Japanese</option>
                <option value="fa">Persian</option>
                <option value="he">Hebrew</option>
                <option value="es">Spanish</option>
                <option value="ar">Arabic</option>
                <option value="tl">Tagalog</option>
                {/* pt-br */}
              </select>
              <select>
                <option>All groups</option>
              </select>
            </div>
          </div>

          <table className="chapters-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Vol</th>
                <th>Ch</th>
                <th>Group</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {chapters.length > 0 ? (
                chapters.map((ch) => (
                  <tr key={ch.id} onClick={() => navigate(`/pages/${ch.id}`)}>
                    <td>{ch.title || `Глава ${ch.chapter}`}</td>
                    <td>{ch.volume}</td>
                    <td>{ch.chapter}</td>
                    <td>{ch.group || '—'}</td>
                    <td>
                      <button
                        className="dwnl-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDownload(ch.id)
                        }}
                        disabled={downloadingId === ch.id}
                      >
                        {downloadingId === ch.id ? 'Скачиваю…' : '⬇ Скачать'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">Глав пока нет</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
