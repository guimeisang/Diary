// 模拟实现react-hooks
let isMount = true
let workInProgressHook = null

const fiber = {
  stateNode: App,
  memoizedState: null // 链表
}

function useState(initialState) {
  let hook

  if(isMount) {
    hook = {
      memoizedState: initialState
      next: null,
      queue: {
        pending: null
      }
    }
    if(!fiber.memoizedState) {
      fiber.memoizedState = hook
    } else {
      workInProgressHook.next = hook
    }
    workInProgressHook = hook
  }else {
    hook = workInProgressHook
    workInProgressHook = workInProgressHook.next
  } 

  // todo

}

function dispatchAction(queue, action) {

}

function schedule() {
  workInProgressHook = fiber.memoizedState
  const app = fiber.stateNode()
  isMount = false
  return app
}

function App() {
  const [num, updateNum] = useState(0)

  return {
    onClick() {
      updateNum(num + 1)
    }
  }
}

window.app = schedule()