import React, { useEffect, useState } from 'react'
import { fetchChapterPage } from '../../Services/MangaDex/MangaDex'
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner'

export default function Reader({ chapter, onClose, pages = [], readingDirection }) {
  const [currentPage, setCurrentPage] = useState(0)

  function nextPage() {
    if (currentPage < pages.length - 1) {
      setCurrentPage((next) => next + 1)
    }
  }

  function prevPage() {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  return (
    <div className="reader-overlay">
      {readingDirection !== 'vertical' && (
        <div className="reader-nav-controls">
          <button className="nav-btn prev" onClick={prevPage} disabled={currentPage === 0}>
            &lt;
          </button>

          <div className="reader-slider">
            <input
              type="range"
              min={0}
              max={pages.length - 1}
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
            />
          </div>

          <button
            className="nav-btn next"
            onClick={nextPage}
            disabled={currentPage === pages.length - 1}
          >
            &gt;
          </button>
        </div>
      )}

      <div className="reader-content" onClick={(e) => e.stopPropagation()}>

        <div className={`reader-layout ${readingDirection}`}>
          {pages.length === 0 ? (
            <LoaderSpinner />
          ) : readingDirection === 'vertical' ? (
            pages.map((url, idx) => (
              <img key={idx} src={url} alt={`Страница ${idx + 1}`} className="reader-page-image" />
            ))
          ) : (
            <div className="reader-pages">
              <img
                loading="lazy"
                src={pages[currentPage]}
                alt={`Страница ${currentPage + 1}`}
                className="reader-page-image"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
