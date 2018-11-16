## 面向对象的程序设计
- 理解对象属性
- 理解并创建对象
- 理解继承

- 理解对象

> 创建自定义对象的最简单的方法就是创建一个object的实例，然后再为他添加属性和方法：
```
var person = new object();
person.name = "kevin";
person.age = "18";
person.job = "Software Engineer";
person.sayName = function(){
	alert(this.name);
}
```

> 但是对象字面量成为了创建这种对象的首选模式
```
var person ={
	name:"kevin",
	age:"18",
	job:"Sofeware Engineer".
	sayName:function(){
	 	alert('this.name')
	}
}
```

