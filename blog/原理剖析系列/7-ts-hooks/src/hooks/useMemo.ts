import { useMemo } from 'react'

let a: string = '1',
  b: string = 'b'
const memoizedValue = useMemo(() => computeExpensiveValue('a', 'b'), [a, b])

function computeExpensiveValue(a: string, b: string) {}
