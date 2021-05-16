class MyEventEmitter {
  _events = Object.create(null)
  on(type, listener) {
    this._events[type] = this._events[type] || []
    this._events[type].push(listener)
    return this
  }
  off(type, listener) {
    this._events[type] = this._events[type].filter(current => current !== listener)
    return this
  }
  emit(type, ...args) {
    this._events[type].forEach(current => {
      Reflect.apply(current, this, args)
    })
  }
}