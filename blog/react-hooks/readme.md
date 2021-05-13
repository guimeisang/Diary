参考： https://zhuanlan.zhihu.com/p/92211533

1.1 React 组件：
1. UI = F(DATA); 其中F需要负责对输入的数据进行加工，并对数据变更做出响应
2. F抽象成组件，React是以（component-based）为粒度编排应用，组件是代码复用的最小单元
3. 在设计上，props是用来接收外部的数据，state用来管理组件自身的状态
4. React认为组件是有生命周期的

另外我们最为熟悉的就是class设计组件

1.2  Class Component 的问题

1.2.1 组件复用困局

- 数据共享问题，React官方采用flux来解决（其实对flux没怎么了解）
- 组件复用
  - 最早，使用CreatClass + Mixins，然后再使用Class Component（带来了Render Props，Higher Order Component），直到后来的Function Component+Hooks设计

好，也谈谈难受的点：
HOC：
- 嵌套地狱，每一次HOC调用都会产生一个组件实例
- 可以使用类装饰器缓解组件嵌套带来的可维护性问题，但是装饰器本质还是HOC
- 包裹太多层级之后，可能带来Props属性覆盖问题

Render Props：

- 数据流向更直观了，子孙组件可以很明确的看到数据来源
- 但是本质上Render Props是基于闭包实现的。大量用于组件复用将不可避免引入callback hell问题
- 丢失了组件的上下文，因此没有this.props属性，不能像HOC那样访问this.props.children

1.2.2 JS Class 的缺陷

1. this的指向（render jsx中出现this指向问题）
2. 编译size（Class最终还是会编译成function，并且相对于函数式编程代码量大多了，function对js引擎是友好的）

1.3 Function Component缺失的功能
设计之初，函数式组件只能依托class组件，接收props和methods；在首次render之后，没有re-render的能力；
但是Hooks就有：组件自身能够通过某种机制再触发状态的变更并且引起re-render;

这Function组件就有取代Class组件的可能

1.4 Function 组件 和 Hooks 组合

