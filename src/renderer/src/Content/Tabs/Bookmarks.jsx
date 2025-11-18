import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getBookmarks } from '../../Services/BookmarkService'
import MangaCard from '../../components/MangaCard/MangaCard'

export default function Bookmarks() {
  const navigate = useNavigate()
  const [bookmarks, setBookmarks] = useState([])

  useEffect(() => {
    setBookmarks(getBookmarks())
  }, [])

  return (
    <div className="tab-content">
      <h3>
        <i className="fas fa-bookmark"></i> Закладки
      </h3>
      <div className="manga-grid" id="bookmarks-grid"></div>
      {bookmarks.length === 0 ? (
        <div className="empty-state" id="bookmarks-empty">
          <i className="fas fa-bookmark"></i>
          <p>У вас пока нет закладок</p>
          <Link to="/">Найти мангу</Link>
        </div>
      ) : (
        <div className="content-bookmarks">
          <div className="bookmarks-manga">
            <div className="manga-grid">
              {bookmarks.map((manga) => (
                <MangaCard
                  key={manga.id}
                  manga={manga}
                  onClick={() => navigate(`/manga/${manga.id}`)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
