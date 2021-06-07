import { useMemo } from "react";

const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])