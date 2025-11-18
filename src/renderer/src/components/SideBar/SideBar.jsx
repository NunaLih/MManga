import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function SideBar() {
  const location = useLocation()

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h2>
          <i className="fas fa-bookmark"></i> Библиотека
        </h2>
        <ul>
          <li className={location.pathname === '/' ? 'active' : ''}>
            <Link to="/" className="nav-link">
              <i className="fas fa-list"></i> Вся манга
            </Link>
          </li>
          <li className={location.pathname === '/bookmarks' ? 'active' : ''}>
            <Link to="/bookmarks" className="nav-link">
              <i className="fas fa-bookmark"></i> Закладки
            </Link>
          </li>
          <li className={location.pathname === '/downloads' ? 'active' : ''}>
            <Link to="/downloads" className="nav-link">
              <i className="fas fa-download"></i> Загрузки
            </Link>
          </li>
          <li className={location.pathname === '/history' ? 'active' : ''}>
            <Link to="/history" className="nav-link">
              <i className="fas fa-history"></i> История
            </Link>
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h2>
          <i className="fas fa-folder"></i> Коллекции
        </h2>
        <ul>
          <li>
            <Link to="/" className="nav-link">
              <i className="fas fa-star"></i> Избранное
            </Link>
          </li>

          <li>
            <Link to="/" className="nav-link">
              <i className="fas fa-eye"></i> Читаю
            </Link>
          </li>
          <li>
            <Link to="/" className="nav-link">
              <i className="fas fa-check-circle"></i> Прочитано
            </Link>
          </li>
          <li>
            <Link to="/" className="nav-link">
              <i className="fas fa-clock"></i> В планах
            </Link>
          </li>
          <li>
            <Link to="/settings" className="nav-link">
              <i className="fa-solid fa-gear"></i> Настройки
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
