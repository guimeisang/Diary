// 实现redux中的combineReducers函数
// 输入：{ statePart1: reducer1, statePart2: reducer2 }
// 返回：返回一个合并state的函数

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    retrun Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](
        state[key],
        action
      )
    }, {})
  }
}