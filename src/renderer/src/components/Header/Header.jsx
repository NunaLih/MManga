import React from 'react'
import SearchHeader from '../SearchHeader/SearchHeader'

export default function Header({ onSearch }) {
  return (
    <header>
      <div className="logo">
        <i className="fas fa-book-open"></i>
        <span>
          <a href="/">MManga</a>
        </span>
      </div>
      <SearchHeader onSearch={onSearch} />
    </header>
  )
}
