import React from 'react'
import './notification.css'

const Notification = ({ notificationMessage, errorMessage }) => {

  if (notificationMessage === null && errorMessage === null) {
    return null
  }

  return (
    <div className='notifications'>
      {notificationMessage !== null
        ? <div className='positive'>{notificationMessage}</div>
        : <div className='error'>{errorMessage}</div>
      }
    </div>
  )
}

export default Notification