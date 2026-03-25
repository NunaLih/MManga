import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import MangaDetails from './components/MangaDetails/MangaDetails'
import Reader from './components/Reader/Reader'
import SideBar from './components/SideBar/SideBar'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ReaderPage from './components/ReaderPage/ReaderPage'
import Bookmarks from './content/Tabs/Bookmarks'
import Downloads from './Content/Tabs/Downloads'
import History from './content/Tabs/History'
import AllManga from './content/Tabs/AllManga'
import Layout from './Layout'
import Settings from './Content/Tabs/Settings'
// import './themes.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AllManga />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="downloads" element={<Downloads />} />
          <Route path="history" element={<History />} />
          <Route path="manga/:mangaId" element={<MangaDetails />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="pages/:chapterId" element={<ReaderPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
