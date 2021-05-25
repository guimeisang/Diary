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

#### 12 类与接口的关系

#### 13 泛型（1）：泛型函数与泛型接口

#### 14 泛型（2）：泛型类与泛型约束

#### 15 类型检查机制（1）：类型推断

#### 16 类型检查机制（2）：类型兼容性

#### 17 类型检查机制（3）：类型保护

#### 18 高级类型（1）： 交叉类型与联合类型

#### 19 高级类型（2）：索引类型

#### 20 高级类型（3）：映射类型

#### 21 高级类型（4）：条件类型

 