import React from 'react'

export default function History() {
  return (
    <div className="tab-content">
      <h3>
        <i className="fas fa-history"></i> История чтения
      </h3>
      <div id="history-content">
        <div className="empty-state">
          <i className="fas fa-history"></i>
          <p>Здесь будет отображаться ваша история чтения</p>
        </div>
      </div>
    </div>
  )
}
