import React from "react"
import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (notification === null) {
    return null
  }
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    color: "green",
  }
  const errorStyle = {
    ...style,
    color: "red",
  }

  return (
    <>
      {notification.message && (
        <div style={notification.type === "success" ? style : errorStyle}>
          {notification.message}
        </div>
      )}
    </>
  )
}

export default Notification
