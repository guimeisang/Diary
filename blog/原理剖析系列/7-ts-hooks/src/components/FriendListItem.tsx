import useFriendStatus from '../hooks/friendStatus'

interface friend {
  id: string
  name: string
}

function FriendListItem(props: { friend: friend }) {
  const isOnline = useFriendStatus(props.friend.id)

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>{props.friend.name}</li>
  )
}
