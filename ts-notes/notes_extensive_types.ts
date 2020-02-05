// Ts 泛型

// 软件工程中，不仅要创建一致的定义良好的API
// 同时要考虑可重用性。
// 组件不仅能够支持当前的数据类型，同时也能够
// 支持未来的数据类型
// 这在创建大型的系统时提供了灵活的功能

// 在像C#和Java这样的语言中，可以用泛型来创建
// 可重用组件，一个组件能够支持多种类型的数据

// 这样用户就可以用自己的数据类型来使用组件
// 通俗地讲，泛型就是为了解决类、接口方法的复用性
// 以及对不特定数据类型的支持



// 只能返回string类型数据
function getDataString (value : string) : string {
	
	return value;
}

// 同时返回string类型和number类型

function getDataNumber (value : number) : number {
	return value;
}

//  尝试使用any类型解决

function getDataAny (value : any) : any {
	return value;
}

// any不能解决的问题是限制返回和输入的类型

// 采用 泛型 解决
// 支持不特定的数据类型
// 要求传入的参数和返回的参数一致

// 用大写字母来表示泛型 <T>表示 T 类型
// 泛型函数的泛型声明放在函数名的后面
function getData <T> (value : T) : T {
	return value;
}

console.log(getData <number> (123));

console.log(getData <string> ('str12345'));


// 泛型类
// 假设有一个最小堆算法，需要同时支持
// 返回数字和字符串两种类型通过
// 泛型类来实现

class MinClass {
	public list: number[] = [];
	add (num: number) : void {
		this.list.push(num);
	}
	min () : number {
		var minNum = this.list[0];
		for (let i = 0 ; i < this.list.length ; ++i) {
			if (minNum > this.list[i]) {
				minNum = this.list[i];
			}
		}
		return minNum;
	}
}


var m = new MinClass();
m.add(1);
m.add(-1);
m.add(-3);
console.log(m.min());


class GeneralMinClass <T> {
	public list : Array<T>; 
	// 或者写作 : 
	// public list : T[] = []; 
	constructor () {
		this.list = new Array<T>();
	}
	add (element : T) : void {
		this.list.push(element)
	}
	getMin () : T;
	getMin () : null;
	getMin ()  : any {
		if (this.list.length === 0) {
			return null;
		}
		let minIndex = 0;
		for (let i = 1 ; i < this.list.length ; ++i) {
			minIndex = this.list.length[minIndex] < this.list.length[i] ? minIndex : i;
		}
		return this.list[minIndex];
	}
}

var gmc = new GeneralMinClass <string> ();

console.log(gmc.getMin());

gmc.add('zzz');
gmc.add('a');
gmc.add('bb');
gmc.add('ccc');


console.log(gmc.getMin());

var gmc1 = new GeneralMinClass <number> ();

for (let i : number = 0 ; i < 100 ; ++i) {
	gmc1.add(Math.ceil(Math.random() * 100));
}

console.log(gmc1.getMin());
