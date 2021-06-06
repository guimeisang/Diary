### 基础篇

#### ts的入门和作用就不记录了

#### 基本类型

- es6的基本类型：Boolean, Number, String, Array, Function, Object, Symbol, undefined, null
- ts数据类型：除了上面那些，还有6个新增的数据类型：viod, any, never, 元组，枚举，高级类型

ts的推断功能会自动推断变量的类型
一些特例：
void: 指没有返回值
any: 任何类型

#### 枚举类型

枚举：一组有名字的常量的集合
实现原理：用数组实现
场景：将一些代码中硬编码定义成枚举

#### 接口1：对象类型接口
interface的使用，

```ts
interface Name {
  [x: string]: string
}
```
#### 接口2：函数类型接口

基础定义法：
```ts
interface Add {
  (x: number): number
}

type Add = (x: number) => number

let add: Add = (a) => a
```

复杂型定义：
```ts
interface Lib {
  (): void;
  version: string;
  doSomething: void;
}

let lib: Lib = (() => {}) as Lib; // 这里一定要用断言，告诉ts，我知道它是Lib类型了
lib.version = '1.0'
lib.doSomething = () => {}
```

#### 函数知识点梳理

- 剩余参数

ts语法中剩余参数定义成数组

```ts
function add7(x: number, ...rest: number[]) {
  return x + rest.reduce((pre, cur) => pre + cur)
}
```

- 重载

```ts
function add8(...rest: number[]): number;
function add8(...rest: string[]): string;
function add8(...rest: any[]): any {
  let first = rest[0]
  if(typeof first === 'string') {
    return rest.join('')
  }else {
    return rest.reduce((pre, cur) => pre + cur)
  }
}
```
ts 编译器会去先匹配number类型，然后在匹配下面的


#### 10 类（1）
ts的类，继承了es6类，并且有另外一个特效和方法

#### 11 类（2）
```ts
class Dog {
  constructor(name: string) {
    this.name = name
  }
  public name: string // 如果constructor中已经使用public 定义了属性，其实就没必要声明类的属性了
  run() {}
  private pri() {}
  protected pro() {}
  static food: string = 'foo' // 只能使用类名去访问属性，不能通过示例去访问，当然子类也是可以访问的
}

class Husky extends Dog {
  constructor(name: string, public color: string) {
    super(name)
    this.pro()
  }
}
```
#### 11 类（2）抽象类

- 抽象类只能被继承，不能被实例化

```ts
abstract class Animal {
  eat() {}
  abstract sleep() {}
}

class Dog extends Animal {
  sleep() {
    
  }
}
```

- 多态

```ts

class Cat extends Animal {
  sleep() {

  }
}

```

可以看到ts将es6中的类缺失的功能补全了

#### 12 类与接口的关系

- 都可以各自继承
- 可转换

#### 13 泛型（1）：泛型函数与泛型接口


#### 14 泛型（2）：泛型类与泛型约束

- 泛型约束

```ts
interface Length {
  length: number
}

function log<T extends Length>(value: T): T {
  console.log(value, value.length)
  return value
}
```
#### 15 类型检查机制（1）：类型推断

- 由值推断变量
- 类型断言：你比ts更了解代码类型，改造旧代码的时候很有用，但是慎用

#### 16 类型检查机制（2）：类型兼容性

> 为了语言的灵活性，才有这种类型兼容性

x 兼容 y : x (目标类型) = y (源类型)

口诀：
结构之间兼容：成员少的兼容成员多的
函数之间兼容：参数多的兼容参数少的

基础类型，枚举，类，接口，泛型自己看着办，差不多相等才能兼容

#### 17 类型检查机制（3）：类型保护

> ts能够在特定的区块中保证变量属于某种确定的类型，可以在此区块中放心的引用此类型的属性，或者调用次类型的方法；当我们用条件或者函数判断了变量的类型，则该区域就被保护成

```ts
enum Type { Strong, Week }

class Java {
  helloJava() {
    console.log('hello java')
  }
}

class JavaScript {
  helloJavaScript() {
    console.log('hello javascript')
  }
}

// 用这个函数判断区域，就是被保护
function isJava(lang: Java | JavaScript): lang is Java {
  return (lang as Java).helloJava !== undefined
}

function getLanguage(type: Type) {
  let lang = type === Type.Strong ? new Java() : new JavaScript()
  // if((lang as Java).helloJava) {
  //   (lang as Java).helloJava() // 这里一定要加类型断言才能生效，因为lang有两种可能
  // }else {
  //   (lang as JavaScript).helloJavaScript()
  // }
  // 可以看到断言方式还是有点繁琐，每个都需要断言，用类型保护区域还是会方便点

  // 类型保护方法
  // instanceof
  if(lang instanceof Java) {
    lang.helloJava()
  }else {
    lang.helloJavaScript()
  }
}
```

#### 18 高级类型（1）： 交叉类型与联合类型
交叉类型： &  （类型并集）
联合类型： ｜  （增加类型灵活性）


#### 19 高级类型（2）：索引类型

- 有时候我们想用ts去约束传参的

```ts
let obj = {
  a: 1,
  b: 2,
  c: 3
}

function getValues<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map(key => obj[key])
}
console.log(getValues(obj, ['a', 'b']))
console.log(getValues(obj, ['e', 'f'])) // e, f不属于obj的属性，ts就帮助报错

// keyof T
interface Obj {
  a: number,
  b: string
}

let key: keyof Obj

// T[K]
let value: Obj['a'] // 有没有感觉ts其实就是一种语言，只是用来做类型约束的语言

// T extends U

```


#### 20 高级类型（3）：映射类型

> 类似于函数，传入类型变量，返回加强后的新类型

 
```ts
interface Obj {
  a: string;
  b: number;
  c: boolean;
}

type ReadonlyObj = Readonly<Obj> // 将所有的属性变成可读

type PartialObj = Partial<Obj> // 将所有的属性变成可选

type PickObj = Pick<Obj, 'a' | 'b'>

type RecordObj = Record<'x' | 'y', Obj>

```

- ts的Readonly的封装

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[p] // in 和 for in 一样，keyof和 Object.keys 一样
}
```

#### 21 高级类型（4）：条件类型
> 由条件表达式决定的类型 T extends U ? X : Y

```ts
type Diff<T, U> = T extends U ? never : T

type T4 = Diff<"a" | "b" | "c", "a" | "e"> // 为 "b" | "c"

type NotNull<T> = Diff<T, undefined | null> // 有没有觉得有点像高阶函数一样

type T7 = ReturnType<() => string>
```

### 工程篇

#### ES6与CommonJS的模块系统

就是ts已经支持ES6和CommonJS了，并且可以通过修改tsconfig来修改
1. 支持输出的js格式：es6, es5, 默认是es3
2. 支持输出模块形式：commonJS，还是es6，默认是commonJS

#### 使用命名空间

和全局变量类似，在现在的模块化时代，其实没有必要使用命名空间
#### 理解声明合并

命名空间和类，函数进行合并；如果有多处的同名类型声明，ts会进行合并

#### 如何编写声明文件

#### 配置tsconfig.json1：文件选项

#### 配置tsconfig.json2：编译选项

#### 配置tsconfig.json3：工程引用

#### 编译工具：从ts-loader到Babel

#### 代码检查工具：从TSLint到ESLint

#### 使用Jest进行单元测试




 