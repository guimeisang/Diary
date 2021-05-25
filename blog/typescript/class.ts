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