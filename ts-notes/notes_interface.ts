// interface in typescripts

// 接口的作用：在面向对象编程中，接口定义了行
// 为和动作的规范
// 在程序设计中，接口起到一种限制和规范的作用
// 接口定义了其某一批类所需要遵守的规范
// 接口不关心这些类的内部状态数据，也不关心
// 这些类里方法的实现细节
// 接口只规定这些类必须提供某些方法，提供这些
// 方法的类就可以满足实际需要，typescript中
// 的接口类类似于java，同时还增加了更灵活的
// 接口类型，包括属性、函数、可索引（？）和类等

// 类似于抽象类

/*
// ts average function
function printLabel() : void {
	console.log('Print Label');
}

printLabel();
*/

// ts 中定义方法传入参数

// 函数参数约束必须是一个string类型的参数
function printLabel (label : string) : void {
	console.log('printLabel : '+label);
}

printLabel('mylabel');

// 对json对象进行约束
function printLabelObj (labelInfo : {label : string, value ?: string}) : void {
	console.log('printLabel : '+ labelInfo.label);
}

var obj1 = {
	label : 'my_label_obj1',
	value : 'my_value_obj2'		
};

var obj2 = {
	label : 'my_label_obj2'	
};

var labels : Array <{label : string, value ?: string}> = [obj1, obj2];

for (let i = 0 ; i < labels.length ; ++i) {
	printLabelObj(labels[i]);
}


/*
Output:

printLabel : mylabel
test.js:9 printLabel : my_label_obj1
test.js:9 printLabel : my_label_obj2

*/

// 对批量方法传入参数进行约束
// 接口： 行为和动作的规范，对批量方法进行约束

// 注意interface中使用';'结束行尾
interface FullName {
	firstName : string;
	secondName : string;
}

function printName (name : FullName) {
	console.log(name.firstName, name.secondName);
}

var validName = {
	age : 20,
	firstName : 'youheng',
	secondName : 'chan'
};


// 传入的参数必须包含firstName和secondName
printName(validName);

function printInfo (info : FullName) {
	
	// 必须传入对象 firstName，secondName
	console.log('info : ' + info.firstName + info.secondName /*+ info.age*/);
	// Error: Property 'age' does not exist on type 'FullName'.

}

printInfo(validName);

// Ts 中的接口类型一共有5个
// 上面是第一种接口： 属性类接口

// 剩下的四种为：
// 1. 函数类型接口
// 2. 可索引接口
// 3. 类类型接口
// 4. 接口扩展

// 接口，可选属性, 使用 ?: 表示可以省略的属性

interface FullName {
	firstName : string;
	secondName ?: string;
}

function getName (name : FullName) {
	console.log(name);
}


var valid_name = {
	secondName : 'chan',
	firstName : 'youheng',	
};

getName({firstName : valid_name.firstName});

// 案例，使用Ts封装Ajax

/* 
	$.ajax({
		type : 'GET',
		url : 'test.json',
		data : {
			username : $(#username).val(),
			content : $("#content").val()
		},
		dataType : 'json'
	});

*/

interface Config {
	type : string;
	url : string;
	data ?: string;
	dataType : string;
}

function ajax (config : Config) {
	var xhr = new XMLHttpRequest();
	xhr.open(config.type, config.url, true);  // true:默认为异步
	xhr.send(config.data);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			console.log('success');
			// 获取后台返回的数据
			if (config.dataType === 'json') {
				console.log(JSON.parse(xhr.responseText));
			} else {
				console.log(xhr.responseText);
			}
		}
	}
}

ajax({
	type:'get',
	data: 'name=zhangsan',
	url: 'http://a.itying.com/api/productlist', 
	dataType: 'json'
});


// 函数类型接口：对方法传入的参数，以及返回值
// 进行约束

// 加密的函数类型接口
// 定义传入的参数key为string类型
// value为string类型
// 返回值为string类型
interface encrypt {
	(key:string, value:string):string;
}


var md5:encrypt = function(key:string, value:string):string {
	return key+value;
}

console.log(md5('youheng', '123456'));

var sha1:encrypt=function(key:string, value:string): string {
	return key+value+'sha1';
} 

console.log(sha1('youheng', '654321'));

// 可索引接口，类类型接口
// 对数组和对象的约束


// ts中正常定义数组的方式
var arr : number[] = [1234, 2345];

var arr1 : Array<string> = ['1', '2'];


// 可索引接口对数组的约束
interface UserArray {
	[index:number] : string
	// 表示索引值必须是number
	// value值必须是string
}

var arr:UserArr = ['aaa', 'bbb'];

console.log(arr[0]);


// number 数组类型可索引接口实例：

interface arrayInter {
	[index : number] : number
}

var arr : arrayInter = new Array(1, 2, 3);

console.log(arr[1], arr[2], arr[0]);

// 对象可索引接口约束
interface UserObj {
	[index:string] : string
}

var arr : UserObj = {name : '20', age : '20'};


// 类类型接口
// 对类的约束，和抽象类有点类似

interface Animal {
	name : string;
	eat (str : string) : void;
}

class Dog implements Animal {
	name : string;
	constructor(name) {
		this.name = name;
	}
	eat (str : string) : void {
		console.log(`${this.name} eats ${str}`);
	}
}

var d = new Dog('small dog');

d.eat('bones');

class Cat implements Animal {
	name : string;
	constructor (name : string) {
		this.name = name;
	}
	eat (food : string) {
		console.log(`${this.name} eats ${food}`);
	}
}

var cat = new Cat('small cat');
cat.eat('fish');


// 接口扩展
interface Animal {
	name : string;
	eat () : void;
}

interface Person extends Animal {
	work () : void;
}

class Programmer {
	public name : string;
	constructor (name : string) {
		this.name = name;
	}
	coding () : void {
		console.log(this.name + ' is writing code');
	}
	
}

class Web extends Programmer implements Person {
	public name : string;
	constructor (name) {
		super(name);
	}
	eat () : void {
		console.log(`${this.name} is eating`);
	}
	work () : void {
		console.log(`${this.name} is working`);
	}
	coding () : void {
		console.log(`${this.name} is coding`)
	}
}

var w = new Web('youheng');

w.eat();

w.work();

w.coding();