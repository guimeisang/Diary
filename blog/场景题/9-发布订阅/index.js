function Pubsub() {
  this.handles = {}
}

Pubsub.prototype = {
  on: function(type, handle) {
    if(!this.handles[type]) this.handles[type] = []
    this.handles[type].push(handle)
  },
  emit: function() {
    var type = Array.prototype.shift.call(arguments)
    if(!this.handles[type]) {
      return false
    }
    this.handles[type].forEach(handle => {
      handle.apply(this, arguments)
    })
  },
  off: function(type, handle) {
    handles = this.handles[type]
    if(handles) {
      !handle && (handles.length = 0)
      handles = handles.filter(item => item !== handle)
    }
  }
}

// 先来一波测试用例
let pb = new Pubsub()
pb.on('1', () => console.log(1))
pb.on('2', () => console.log(2))
pb.on('1', () => console.log(1.1))
pb.emit('1')
// pb.off('1')
pb.emit('1')