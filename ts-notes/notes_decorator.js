// Ts : decorator
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/*

装饰器：装饰器是一种特殊类型的声明
它能够附加到类声明，方法，属性或者参数上
可以修改类的行为

常见的装饰器有：类装饰器、属性装饰器、
方法装饰器、参数装饰器

装饰器的写法：普通装饰器（无法传参），
装饰器工厂（可以传参）

装饰器是过去几年js最大的进步之一，已经是
ES7的标准之一

*/
// 之前学python的时候也有函数装饰器
// 和类装饰器，似乎js中的装饰器应用
// 更加广泛
// 1. 装饰器类：
// 装饰器在类声明之前紧挨着类声明
// 类装饰器用于类构造函数，可以用来监视
// 修改、替换类定义，传入一个参数
// 装饰器
function logClass(params) {
    console.log(params);
    params.prototype.apiUrl = '127.0.0.1:8080';
    params.prototype.run = function () {
        console.log('running');
    };
}
let HttpClient = class HttpClient {
    constructor() {
    }
    getData() {
    }
};
HttpClient = __decorate([
    logClass
], HttpClient);
var http = new HttpClient();
console.log(http.apiUrl);
http.run();
let arr = [1, 2, 3];
let param1 = {
    property: 'param1\'s property',
    method(arr) {
        return true;
    },
};
function factoryDecorator(outerParam) {
    return function (innerParam) {
        innerParam.prototype.property = outerParam.property;
        innerParam.prototype.method = outerParam.method;
        // 这里的关键字必须是class + extends
        return class extends innerParam {
            getData() {
                console.log('getData : override version');
            }
        };
    };
}
let HttpClientFac = class HttpClientFac {
    constructor() {
    }
    getData() {
        console.log('getData : not modified version');
    }
};
HttpClientFac = __decorate([
    factoryDecorator(param1)
], HttpClientFac);
var httpFac = new HttpClientFac();
console.log(httpFac.property);
console.log(httpFac.method());
httpFac.getData();
// 类装饰器重载构造函数的例子
/*

重载类的构造函数：

    类装饰器的例子
    
    类装饰器表达式会在运行时当作函数调用，类的构造函数作为其唯一的参数。
    
    如果类装饰器返回一个值，它会使用提供的构造函数
    来替换类的声明。

*/
function logClassConstructor(target) {
    console.log(target);
    return class extends target {
        constructor() {
            super();
            this.apiUrl = 'I am the modified version Of apiUrl';
            console.log('Added : I am the constructor in the overriden version');
        }
        getData() {
            console.log(this.apiUrl);
        }
    };
}
let HttpClientConstructorOverride = class HttpClientConstructorOverride {
    constructor() {
        this.apiUrl = '127.0.0.1:8080';
    }
    getData() {
        console.log(this.apiUrl);
    }
};
HttpClientConstructorOverride = __decorate([
    logClassConstructor
], HttpClientConstructorOverride);
var httpOveridden = new HttpClientConstructorOverride();
console.log(httpOveridden.apiUrl);
// 属性装饰器
/*
    属性装饰器表达式会在运行时当作函数被调用，传入下列两个参数：
        1.对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
        2.成员的名字
*/
function propertyDecorator(params) {
    console.log('[propertyDecorator] calling');
    console.log('[propertyDecorator] [params] ' + params);
    return function (target, attr) {
        console.log(target, attr);
        target[attr] = params;
        // 因为这里的attr是一个string
        // 所以需要通过数组引用方式访问
    };
}
class HttpClientPropertyDecorated {
    constructor() {
        // this.apiUrl = '[HttpClientPropertyDecorated] 127.0.0.1';
    }
    getData() {
        console.log('[HttpClientPropertyDecorated] ' + this.apiUrl);
    }
}
__decorate([
    propertyDecorator('115.157.200.135')
], HttpClientPropertyDecorated.prototype, "apiUrl", void 0);
let hcpd = new HttpClientPropertyDecorated();
hcpd.getData();
// 方法装饰器
/*
方法装饰器
    方法装饰器会被应用到方法的属性描述
    符上，可以用来监视，修改或者替换方法的定义

    方法修饰会在运行时传入下列3个参数：
        1. 对静态成员来说为类的构造函数
            对实例成员是类的原型对象
        2. 方法的名字
        (是一个字符串，但是不能通过target[methodName]修改；
        需要使用methodDesc.value进行修改，可以结合call和apply
        来‘继承’之前的方法，下面用代码说明)
        3. 成员属性的描述符

*/
// 个人感觉方法装饰器和属性装饰器没有
// 很大区别
// 而且方法装饰器，可以顺便当作属性装饰
// 器使用，属性装饰器也可以顺便当作方法
// 装饰器使用
function methodDecorator(params) {
    console.log(params);
    return function (target, methodName, methodDesc) {
        console.log('\n target : \n', target, "\n methodName : \n", methodName, '\nmethodDesc ： \n', methodDesc);
        // 在方法装饰器中顺便修改属性
        target.url = params;
        // 在方法装饰器中添加新方法
        // Modify the method
        target.run = function () {
            console.log('run');
        };
        // 在方法装饰器中修改原有方法
        /*
        无效修改方法
        target[methodName] = function () {
            console.log(`New version of ${methodName}`);
        }
        */
        // 正确的修改方法
        // 1. 首先保存当前的变量（为了下面能够再次调用）
        var currgetDataMethod = methodDesc.value;
        // 2. 然后修改这个类中的方法
        methodDesc.value =
            function (...args) {
                args = args.map((ele) => {
                    return String(ele);
                });
                console.log(`New version of ${methodName} with parameters : ${args}`);
                // ‘继承’ 之前的方法，即调用之前的方法
                currgetDataMethod.apply(this, args);
                console.log('this = ', this);
            };
    };
}
class HttpClientMethodDecorated {
    constructor() {
    }
    getData(...args) {
        console.log("Original getData Method : ", this.url, ' args : ', args);
    }
}
__decorate([
    methodDecorator('idiospace.com')
], HttpClientMethodDecorated.prototype, "getData", null);
var hcmd = new HttpClientMethodDecorated();
console.log(hcmd.url);
hcmd.run();
hcmd.getData(1, 2, 'a', 'b', 'c');
// 方法参数装饰器
/*
    参数装饰器表达式会在运行的时候当作
    函数使用，可以使用参数为类的原型增加一些元素数据，传入下列三个参数：
    1. 对于静态成员来说是类的构造函数
    对于实例成员是类的成员对象
    2. 参数的名字
    3. 参数在函数列表的索引
*/
function paramsDecorator(params) {
    return function (target, methodName, paramsIndex) {
        // 参数
        console.log('params : ', params);
        // 原型对象或者构造函数
        console.log('target : ', target);
        // 方法名称
        console.log('methodName : ', methodName);
        // 参数索引
        console.log('paramsIndex : ', paramsIndex);
    };
}
class HttpClientParamsDecorated {
    constructor() {
    }
    getData(uuid) {
        console.log(uuid);
    }
}
__decorate([
    __param(0, paramsDecorator('uuid'))
], HttpClientParamsDecorated.prototype, "getData", null);
var hcpad = new HttpClientParamsDecorated();
hcpad.getData(123456);
// 装饰器总结
// 类、属性、方法、参数： 四种装饰器的执行顺序
// 通过代码来说明：
// 类装饰器
function finalFunctionDecorator(...pramas) {
    // log
    console.log('[functionDecorator] [layer 1]');
    return function (target) {
        // log
        console.log('[functionDecorator] [layer 2]');
        // Add new Property
        target.prototype.functionDecoratorProperty = 'functionDecoratorProperty';
        return class extends target {
            // log
            // console.log('[functionDecorator] [layer 3]');
            // Error : can not log here ...
            // 不对原有构造函数进行修改，仅继承
            constructor() {
                super();
                // 保存原有的方法
                this.currentMethod = target.method;
            }
            // 重载当前的方法
            method() {
                console.log('[functionDecorator] [method] modification');
            }
        };
    };
}
// 属性装饰器
function finalPropertyDecorator() {
}
// 方法装饰器
// 参数装饰器
let TestClass = class TestClass {
    constructor() {
        this.name = 'youheng';
    }
    method() {
        console.log('[TestClass] : original method');
    }
};
TestClass = __decorate([
    finalFunctionDecorator(1, 2, 3)
], TestClass);
var test = new TestClass();
export { test };
//# sourceMappingURL=notes_decorator.js.map