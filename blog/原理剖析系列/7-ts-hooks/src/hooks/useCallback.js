import { useCallback } from "react";

const memoizedCallback = useCallback(
  () => {
    doSomething(a, b)
  },
  [a, b]
)

// useCallback(fn, deps) is equivalent to useMemo(() => fn, deps)