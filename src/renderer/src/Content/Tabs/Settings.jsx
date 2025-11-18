import React, { useEffect, useState } from 'react'

export default function Settings() {
  // const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  // useEffect(() => {
  //   document.documentElement.setAttribute('data-theme', theme)
  //   localStorage.setItem('theme', theme)
  // }, [theme])

  return (
    <div className="settings-options">
      <div className="theme-options">
        <label>
          <input
            type="radio"
            // name="theme"
            // value="dark"
            // checked={theme === 'dark'}
            // onChange={() => setTheme('dark')}
          />
          Dark theme fauux
        </label>
        <label>
          <input
            type="radio"
            // name="theme"
            // value="dark-white"
            // checked={theme === 'dark-white'}
            // onChange={() => setTheme('dark-white')}
          />
          Dark White
        </label>
        <label>
          <input
            type="radio"
            // name="theme"
            // value="light"
            // checked={theme === 'light'}
            // onChange={() => setTheme('light')}
          />
          Light Theme
        </label>
        <label>
          <input
            type="radio"
            // name="theme"
            // value="dark-white-border"
            // checked={theme === 'dark-white-border'}
            // onChange={() => setTheme('dark-white-border')}
          />
          Dark White Border
        </label>
      </div>
    </div>
  )
}
