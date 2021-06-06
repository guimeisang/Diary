import { useState, useEffect } from 'react'

function useFriendStatus(friendID: string) {
  const [isOnline, setInOnline] = useState(null)

  useEffect(() => {
    function handleStatusChange(status: any) {
      setInOnline(status.isOnline)
    }
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange)
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange)
    }
  })

  return isOnline
}

export default useFriendStatus
