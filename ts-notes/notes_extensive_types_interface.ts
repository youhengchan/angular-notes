// 泛型接口

// 普通接口
interface ConfigFn {
	(value1 :string , value2 : string) : string;
}

var setData : ConfigFn = function (value1 : string, value2 : string) : string {
	return value1 + value2;
}

// 泛型接口
// 规则是泛型在括号前指定，无论是定义接口
// 还是泛型函数还是泛型类（为大括号）都适用
interface ConfigFn {  // Fn is abbr of function
	<T> (value : T) : T;
}

var getData : ConfigFn = function <T> (value : T) : T {
	return value;
}

var m = getData <number> (123);

console.log(m);


// 另外一种实现泛型接口的方法
// 首先定义一个通用泛型接口
interface ConfigFn <T> {  // Fn is abbr of function
	(value : T) : T;
}



// 另外一种使用泛型函数接口的方法 
// 接着定义一个普通泛型函数，此时不使用接口

function getData <T> (value : T) : T {
	return value;
}

// 然后给这个普通泛型函数添加接口约束

var myGetData : ConfigFn <number> = getData;

console.log(myGetData(1234));

// 上面两种情况，第一种是函数通用，接口不通用
// 第二种是接口通用，函数不通用







