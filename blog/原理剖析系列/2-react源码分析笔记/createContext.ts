export function createContext<T>(
  defaultValue: T,
  calculateChangedBits: ?(a: T, b: T) => Number,
): ReactContext<T> {
  if(calculateChangedBits === undefined) {
    calculateChangedBits = null
  }

  const context: ReactContext<T> = {
    $$typeof: REACT_CONTEXT_TYPE,
    _calculateChangeBits: calculateChangedBits,
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    Provider: (null: any),
    Consumer: (null: any),
  }

  context.Provider = {
    $$typeof: REACT_CONTEXT_TYPE,
    _context: context,
  }

  context.Consumer = context

  return context
}