import React, { useEffect, useState } from 'react'
import { fetchManga, searchManga } from '../../Services/Source/MangaDex.js'
import MangaCard from '../../components/MangaCard/MangaCard.jsx'
import LoaderSpinner from '../../components/LoaderSpinner/LoaderSpinner.jsx'
import MangaDetails from '../../components/MangaDetails/MangaDetails.jsx'
import Header from '../../components/Header/Header.jsx'
import SearchHeader from '../../components/SearchHeader/SearchHeader.jsx'
import { useNavigate } from 'react-router-dom'

export default function AllManga() {
  const navigate = useNavigate()
  let [mangaList, setMangaList] = useState([])
  let [isLoading, setIsLoading] = useState(false)

  let [offset, setOffset] = useState(0)
  let [hasMore, setHasMore] = useState(true)

  const LIMIT = 50

  const loadData = async () => {
    if (isLoading || !hasMore) return
    setIsLoading(true)
    try {
      let data = await fetchManga(LIMIT, offset)

      if (data.length === 0) {
        setHasMore(false)
      } else {
        setMangaList((prev) => {
          const ids = new Set(prev.map((m) => m.id))
          const newItems = data.filter((m) => !ids.has(m.id))
          return [...prev, ...newItems]
        })
        setOffset((prev) => prev + LIMIT)
      }
    } catch (error) {
      console.error(`Ошибка при загрузке JSON : ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        loadData()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [offset, hasMore, isLoading])

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setIsLoading(true)
      try {
        const firstPage = await fetchManga(LIMIT, 0)
        setMangaList(firstPage)
        setOffset(firstPage.length)
        setHasMore(firstPage.length === LIMIT)
      } catch (err) {
        console.error('Ошибка при загрузке исходной страницы', err)
      } finally {
        setIsLoading(false)
      }
      return
    }
    setIsLoading(true)
    try {
      const res = await searchManga(query, 50, 0)
      setMangaList(res)
      setHasMore(false)
    } catch (err) {
      console.log('Ошибка при поиске манги', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="content">
      <Header onSearch={handleSearch} />
      <div id="all-manga" className="tab-content active">
        <h2>Вся манга</h2>
        <div className="manga-grid" id="manga-grid">
          {mangaList.map((manga) => (
            <MangaCard
              key={manga.id}
              manga={manga}
              onClick={() => navigate(`/manga/${manga.id}`)}
            />
          ))}
        </div>
      </div>

      {isLoading && <LoaderSpinner />}
    </div>
  )
}
