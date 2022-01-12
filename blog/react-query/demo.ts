import { useQuery } from 'react-query'

function Todos() {
  const {isLoading, isError, data, error} = useQuery("todos", fetchTodoList)

  if(isLoading) {
    return <span>Loading...</span>
  }

  if(isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <ul>
      {data.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
    </ul>
  )
}