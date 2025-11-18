import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchChapterPage, fetchChapterInfo } from '../../Services/MangaDex/MangaDex'
import Reader from '../Reader/Reader'
import '../../ReaderPage.css'

export default function ReaderPage() {
  const { chapterId } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [pages, setPages] = useState([])
  const [chapterInfo, setChapterInfo] = useState(null)
  const [readingDirection, setReadingDirection] = useState('ltr')

  useEffect(() => {
    if (!chapterId) {
      console.error('Такой глвы нет')
      setIsLoading(false)
      return
    }

    const loadChapter = async () => {
      try {
        const [pageData, chapterData] = await Promise.all([
          fetchChapterPage(chapterId),
          fetchChapterInfo(chapterId)
        ])

        setPages(pageData || [])
        setChapterInfo(chapterData)
      } catch (error) {
        console.error(`Ошибка при загрузке главы${error}`)
      } finally {
        setIsLoading(false)
      }
    }
    loadChapter()
  }, [chapterId])

  function handleClose() {
    navigate(-1)
  }

  function changeDirection(direction) {
    setReadingDirection(direction)
  }

  if (isLoading) {
    return (
      <div className="reader-loading">
        <p>Загрузка главы...</p>
      </div>
    )
  }

  return (
    <div className={`reader-page ${readingDirection}`}>
      <aside className="sidebar-layout">
        <h2 className="chapter-and-pages">
          Том {chapterInfo?.volume || '-'} - {chapterInfo?.chapter || '-'}
        </h2>
        <button className="close-btn" onClick={handleClose}>
          ✕ Закрыть
        </button>

        <div className="direction-menu">
          <span>Режим чтения:</span>
          <div className="readingR">
            <button
              className={readingDirection === 'ltr' ? 'active' : ''}
              onClick={() => changeDirection('ltr')}
            >
              Обычный
            </button>
            <button
              className={readingDirection === 'rtl' ? 'active' : ''}
              onClick={() => changeDirection('rtl')}
            >
              Книжный режим
            </button>
            <button
              className={readingDirection === 'vertical' ? 'active' : ''}
              onClick={() => changeDirection('vertical')}
            >
              Вертикальный
            </button>
          </div>
        </div>
      </aside>

      <main className="reader-content">
        <Reader
          chapter={chapterInfo}
          pages={pages}
          onClose={handleClose}
          readingDirection={readingDirection}
        />
      </main>
    </div>
  )
}
