import { useReducer } from "react"

function init(initialState) {
  return {count: initialState}
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment': 
      return {count: state.count + 1}
    case 'decrement':
      return {count: state.count - 1}
    case 'reset':
      return init(action.payload)
    default: 
      throw new Error()
  }
}

export default function Counter(initialState) {
  const [state, dispatch] = useReducer(reducer, initialState, init)
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'reset', payload: initialState})}>reset</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  )
}