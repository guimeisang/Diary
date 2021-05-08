const createStore = (reducer) => {
  let state
  let listeners = []

  const getState = () => state

  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }

  const subscribe = (listener) => {
    listeners.push(listener)
    // 这个取消订阅的方式太绝妙的了
    return () => {
      listeners = listeners.filter(item => item !== listener)
    }
  }

  return { getState, dispatch, subscribe }
}