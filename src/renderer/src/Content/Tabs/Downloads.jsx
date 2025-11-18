import React, { useEffect, useState } from 'react'
import { getDownloadHistory, clearDownloadHistory } from '../../Services/DownloadHistoryService'
import { downloadChapterZip } from '../../Services/DownloadService'

export default function Downloads() {
  const [items, setItems] = useState([])
  const [busyId, setBusyId] = useState(null)

  useEffect(() => {
    setItems(getDownloadHistory())
  }, [])

  function refresh() {
    setItems(getDownloadHistory())
  }

  function onClear() {
    if (confirm('Очистить историю скачиваний?')) {
      clearDownloadHistory()
      refresh()
    }
  }

  async function redownload(chapterId) {
    try {
      setBusyId(chapterId)
      await downloadChapterZip(chapterId)
    } catch (e) {
      console.error(e)
      alert('Не удалось повторно загрузить мангу')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="tab-content">
      <h3>
        <i className="fas fa-download"></i> Загрузки
      </h3>

      <div className="download-pages-content">
        <button className="download-pages-button" onClick={refresh}>
          Обновить
        </button>
        <button className="download-pages-button" onClick={onClear}>
          Очистить
        </button>
      </div>
      {items.length === 0 ? (
        <div id="downloads-content">
          <div className="empty-state">
            <i className="fas fa-download"></i>
            <p>Здесь будут отображаться ваши загрузки</p>
          </div>
        </div>
      ) : (
        <ul className="download-history-list">
          {items.map((it, idx) => (
            <li key={idx} className="download-row">
              <div className="download-row-main">
                <div className="download-manga-cover">
                  <img src={it.coverUrl} alt={it.coverUrl} />
                </div>
                <div className="download-title">
                  {it.title || 'Без названия'} — {it.vol}/{it.ch}
                </div>
                <div className="download-sub">
                  Файл: {it.filename} · Страниц: {it.pages} · ID главы: {it.id}
                </div>
                <div className="download-sub">{new Date(it.ts).toLocaleString()}</div>
              </div>
              <div className="download-actions">
                <button
                  onClick={() => redownload(it.id)}
                  disabled={busyId === it.id}
                  title="Скачать заново"
                >
                  {busyId === it.id ? '...' : 'Перекачать'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
