import useFriendStatus from '../hooks/friendStatus'

function FriendStatus(props: any) {
  const isOnline = useFriendStatus(props.friend.id as string)

  if (isOnline === null) return 'Loading...'

  return isOnline ? 'Online' : 'Offline'
}
