
/*
// Es5 function definition

// function definition
function run () {
	
	return 'run';
}

// function expression
var run2 = function () {
	
	return 'run2';
}

// ts function definition
function run() : string {
	return 'run';
}

/* error
function run () : string {
	
	return 123;
}
*/

// anoymous function

var func2 = function() : number {
	
	return 123;
}

func2();

// ts function passing arguments
function getInfo (name : string, age : number) : string {
	
	return `${name} --- ${age}`;
} 

alert(getInfo('zhangsan', 20));

var getInfo = function (name : string, age : number) : string {
	return `${name} --- $(age)`;
}

var getInfo = function(name : string, age : number) : string {
	return `${name} --- ${age}`;
}

// no return value function
function run() : void {
	console.log('run');
}

// es5 , parameters can be different from arguments

// In ts, the parameters and arguments 
// should be 100% the same, or u should set 
// the optional parameters

function getInfo(name : string, age ?: number) : string  {
	if (age) {
		return `${name} && ${age}`;
	} else {
		return `${name} && secret `;
	}
}

// ?: means optional

alert(getInfo('zhangsan', 20));

// default parameters

// es5 can not set default parameters, 
// however in es6 and ts , u can use default
// parameters

// optional arguments should be setted at 
// last of all parameters

function getInfo(name : string, age : number = 20) : string {
	return `${name} && $ {age}`;
}

alert(getInfo('zhangsan', 30));

function sum (a : number, b : number, c : number, d : number) : number {
	return a + b + c + d
}

alert(sum(1, 2, 3, 4));

// python *args VS es6 ... (changeable arguments list)

function sum (...result : number[]) : number {
	var sum : number = 0;
	for (var i : number = 0 ; i < result.length ; ++i ) {
		sum += result[i];
	}
	return sum;
}

function sum (a:number, b:number, ...result:number[]) : number {
	var sum : number = a;
	for (var i : number = 0 ; i < result.length ; ++i ) {
		sum += result[i];
	}
	return sum;
}

// ts : function override
/*
function css (config ) {
	
}

function css (config, value ) : any {
	
}

In es5, the later function will override the former one.
*/
*/

function getInfo (name : string) : string;
function getInfo (age : number) : number;
function getInfo (age : any) : any;
function getInfo (str : any) : any {
	
	if (typeof str === 'string') {
		return 'I am : ' + str;
	} else {
		return 'My age : ' + str;
	}
}

alert(getInfo('youheng'));  // right
alert(getInfo(21));  // right
alert(getInfo(true)); // error or right ? 


function getInfo (name : string, age : num) : string;
function getInfo (name : string, age : number) : string;
function getInfo (name : any, age ?: any) : any {
	if (age) {
		return 'Name :' + name + ', Age : ' + age;
	} else {
		return 'My name is ' + name;
	}
	
}

alert(getInfo('zhangsan'));

alert(getInfo('zhangsan', 20));

// Arrow function

/* ES5
setTimeout(function() {
	alert('run');
}, 1000);
*/

/* ES6
the 'this' in the '=>' function
always point to the host that it lives in
setTimeout(() => {
	alert('run');
}, 1000);

*/










