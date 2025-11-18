import React, { useState } from 'react'

export default function MangaCard({ manga, onClick }) {
  return (
    <div className="manga-card" onClick={onClick}>
      <img
        src={manga.coverUrl || 'https://placehold.co/150x200/2a2a2a/FFFFFF?text=No+Cover'}
        alt={manga.title}
        className="manga-cover"
      />
      <div className="manga-info">
        <div className="manga-title">
          <p>{manga.allTitle.find((t) => t.en)?.en || manga.title}</p>
        </div>
        <div className="manga-chapters">
          <i className="fas fa-list" /> {manga.lastChapter}
        </div>
        <div className="manga-tags">
          <i className="fas fa-tag" />{' '}
          {manga.tags.map((tag) => (
            <span key={tag.id} className="tag-chip">
              {tag.tag + ' '}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
