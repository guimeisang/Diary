/**
 * 1. 判断类型： null，Date，Array，object
 * 2. 并且将值也用deepCopy处理一次
 * @param target 
 */
const deepCopy = <T>(target: T): T => {
  if(target === null) {
    return target
  }
  if(target instanceof Date) {
    return new Date(target.getTime()) as any
  }
  if(target instanceof Array) {
    const cp = [] as any[]
    (target as any[]).forEach(v => cp.push(v))
    return cp.map((n: any) => deepCopy<any>(n)) as any
  }
  if(typeof target === 'object' && target !== {}) {
    const cp = {...(target as {[key: string]: any})} as { [key: string]: any }
    Object.keys(cp).forEach(k => {
      cp[k] = deepCopy<any>(cp[k])
    })
    return cp as T
  }
  return target
}

// Test
// var obj_item = {d: 2}
// var obj = {a: obj_item, b: {c: 1}}
// var cpObj = deepCopy()
// obj_item.d = 3
// console.log(cpObj)