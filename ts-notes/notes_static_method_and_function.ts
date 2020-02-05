
// Ts:
class Person {
	public name : string;
	public age : number = 20;
	static sex = 'male';
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
		 alert('print()' + this.sex); // error. static method can not access to none staic properties
	}
}


var p = new Person('youheng');

p.run();

Person.print();

console.log(Person.sex);


// 多态
// 父类定义一个方法不去实现，让其子类去实现
// 每一个子类有不同的表现
// 多态属于继承

class Animal {
	public name : string;
	constructor (name : string) {
		this.name = name;
	}

	eat () : void {
		console.log(`${this.name} is eating`);
	}


}


class Dog extends Animal {
	constructor (name : string) {
		super(name);
	}

	eat () : string {
		return this.name + 'eat meat';
	}
}


class Cat extends Animal {
	constructor (name : string) {
		super(name);
	}

	eat () : string {
		return this.name + 'eat fish';
	}
}

// 抽象类和抽象方法
// 用abstract关键字定义抽象类和抽象方法
// 抽象类中的抽象方法不包含具体的实现且必须在
// 派生类中实现

// abstract抽象方法只能放在抽象类中
// 抽象类和抽象方法用于定义标准
// 继承抽象类的子类必须实现抽象类中的所有方法

// 下面构造抽象类Animal来定义一个子类，这个
// 子类中必须包含抽象类中的eat方法
// 抽象方法只能出现在抽象类中
// 抽象类中至少有一个抽象方法


var a = new Animal();

abstract class Animal {
	name : string;
	constructor (name) {
		this.name = name;
	}
	abstract eat () : any;
}

class Cat extends Animal { 
	constructor (name) {
		super(name);
	}
	eat () : void {
		console.log(`${this.name} is eating fish`);
	}
}

var cat : Cat = new Cat('kitty');

cat.eat(); 

// output : kitty is eating fish
