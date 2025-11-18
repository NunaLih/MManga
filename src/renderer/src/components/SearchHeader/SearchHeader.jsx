import React, { useEffect, useState } from 'react'

export default function SearchHeader({ onSearch }) {
  let [query, setQuery] = useState('')

  useEffect(() => {
    if (!query.trim()) {
      onSearch('')
      return
    }
    const t = setTimeout(() => onSearch(query), 700)
    return () => clearTimeout(t)
  }, [query])

  return (
    <div>
      <input
        type="text"
        placeholder="Поиск манги..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}
