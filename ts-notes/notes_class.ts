function Person (name, age) {
	this.name = name;
	this.age = age;
	this.run = function () {
		console.log(this.name + ' is running');
	}
}

var zhangsan = new Person('john', 20);

Person.prototype.sex = 'male';

Person.prototype.work = function () {
	alert(this.name + 'is working');
}

p.work();

// static function
Person.getInfo = function () {
	alert('I am static function');
}

Person.getInfo();

// Es5, inheritage
// Web Person, 原型链 + 对象冒充的组合继承方式


// 对象冒充继承
// In English: bind, call, apply
// Now I fully understand that bind, apply and call are just changing the obj that 'this' points to

// Here we use call
var Web = function (name, age) {
	Person.apply(this, [name, age]);  
}

var w = new Web('w_name', 'w_age');

w.run(); // right

// w.work();  // Error : can not inherited from the prototype chain


// 原型链实现继承
// 可以实现构造函数和原型链中的属性和方法的继承
Web.prototype = new Person();

w = new Web('ww_name', 'ww_age');

w.work();  // right
// output : ww_name is working

// 原型链继承的问题：

function Person (name, age) {
	this.name = name;
	this.age = age;
	this.run = function () { /* instance method (not static)*/
		alert(this.name + ' is running');		
	}
}

Person.prototype.sex = 'man';
Person.prototype.work = function () {
	alert(this.name + ' is working');
}

var p = new Person('youheng', 21);

function Web (name, age) {
	
}

Web.prototype = new Person();

var w = new Web('youheng1', 22);

var w1 = new Web ('youheng2', 23);

w.run();  // wrong output : indefined is running

// 原型链继承没有办法给子类传参

// 采用原型链 + 构造函数的组合继承

function Web (name, age, ownProper) {
	Person.call(this, name, age);
	this.ownProperty = ownProper;
}

Web.prototype = new Person();


// 原型链+call的另一种写法
Web.prototype = Person.prototype;

// 这样就没有继承父类本身的方法，因为已经通过call / apply 实现了

// ***********TypeScript**********
// *******Class  Definition*******

/* Es 5 
function Person (name) {
	
	this.name = name;
	this.run = function () {
		console.log(this.name);
	}
}

var p = new Person('name');

*/

// Ts class

class Person {
	name : string;  // property 
	constructor (n : string) { 
		this.name = n;
	}
	run () : void {
		alert(this.name);
	}
}
var p : Person = new Person('youheng');

p.run(); 


class Person {
	name : string;

	constructor(name : string) {
		 this.name = name;
	} 

	run() : string {
		return `${this.name} is running`;
	}
}

// var p = new Person('youhengchan');

// alert(p.run());


class Web extends Person {
	constructor (name : string) {
		super(name);
	}

	run() : string {
		return `${this.name} is running on Web`;
	}

	runfather() : string {
		return '1' + super.run();
	}

}

var w = new Web('youhengWeb');

console.log(w.run());
console.log(w.runfather());

// ts中继承的方法重载
// 首先在子类中找，找不到再去父类

// super.function() 调用父类方法

/*
public : 再类中，子类中，类外都可以访问
protected : 类中，子类中可以访问
private : 类中可以访问
*/

// 属性如果不加修饰符，默认为public
// 即 public name : string 
// 与 name : string 的效果是相同的


// static method and property

/* es5
Person.run2 = function () {
	console.log('run2');
}

var p = new Person();
*/

// Ts: static function
class Person {
	public name : string;
	constructor (name) {
		this.name = name;
	}
	run () : void {
		alert(`${this.name} is running`);
	}
	work() : void {
		alert(`${this.name} is working`);
	}
	static print() : void {
		alert('print()');
	}
}


var p = new Person('youheng');

p.run();

Person.print();
