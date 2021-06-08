import { useCallback } from 'react'

const memoizedCallback = useCallback(() => {
  //
}, [])

// useCallback(fn, deps) is equivalent to useMemo(() => fn, deps)
