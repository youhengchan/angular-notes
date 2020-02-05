// 类型校验
// 指定ts变量指定类型

// 1. boolean

var flag : boolean = true;

// flag = 123; error

flag = true;

// 2. number

var num : number = 123;

num = 456;

console.log(num);

// num = 'str'; // error

// 3 . string

var str : string = 'this is a string';

str = 'new content';

str = 'new content1';

// 4. array

// var arr = [1, 2, '3'];

	// 4.1 the first way tio define array

var arr : number[] = [1, 2, 3];

console.log(arr);

	// 4.2. the second way to define array

var arr : Array<number> = [1, 2, 3];

// 5. tuple, define diff type in a same array

let arr : [number, string] = [123, 'this'];

console.log(arr);

// 6. enun

/*

1 for success
0 for failed

*/

enum Flag {success, error}; 

enum Flag1 {success = 1, error = 2};

let s : Flag = Flag.success;

let s1 : Flag1 = Flag.success;

console.log(s);

console.log(s1);

enum Color {blue, red=4, yellow};

var c : Color = Color.blue;

console.log(c); // index starts from 0, so here output 0


var c1 : Color = Color.yellow; // index === 5 now

// 7. any

var num : number = 123;

num = 456;

var anynum : any = '123';

anynum = 123;

console.log(anynum);

// usage of type -> any


/*
	to get the dom nodes from the document
*/

// var oBox:any = $('box');
// question : how to use jQuery in ts project ?


var oBox : any = document.getElementById('box');

oBox.style.color = 'red';

// 8.null & undefined

var num : number;

console.log(num);


var num : number;  

console.log(num);  // output: undefined error

var num : undefined;
console.log(num); // output : undefined, right


var num : number | undefined;

num = 123;

console.log(num);

var num : null;

// An element can be number type or null type or undefined

var num : number | null | undefined;

num = 1234;

console.log(num);

function run() {
	console.log('run');
}

function run () : void {
	console.log("no return type");
}

/*

Wrong : 

function run() : undefined {
	
}

*/

function run () : number {
	
	return 123;
}

run();

// 9. never type, value that will not apper

// never type value can only be assigned by never type

var a : undefined;

a = 123; // error

a = undefined;  // right

var b : null;

b = null;  // right

var a2: never;

a1 = (function() {
	
})();

a2 = (return () => {
	
	throw new Error('My own Defined Error');
})();

// we define a2 as never type because that
// there is no such error as 'My own Defined Error


// any is like es5 javascript

var arr3 : any[] = ['12345', 22, true];

console.log(arr3);


































