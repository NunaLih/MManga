import { Outlet, Link, useLocation } from 'react-router-dom'
import SideBar from './components/SideBar/SideBar'
import './App.css'

export default function Layout() {
  const location = useLocation()

  return (
    <div className="main-container">
      <Outlet />
      <SideBar />
    </div>
  )
}
