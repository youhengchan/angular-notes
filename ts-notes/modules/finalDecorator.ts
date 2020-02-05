// finalDecorator.ts

// 装饰器总结

// 类、属性、方法、参数： 四种装饰器的执行顺序
// 通过代码来说明：

// 类装饰器1
function finalClassDecorator1 (...params : any[]) : any {
	params = params.map((e) => {
		return String(e);
	});
	// log
	console.log('[ClassDecorator1] [layer 1]');
	

	return function (target : any) : any {

		// log
		console.log('[ClassDecorator1] [layer 2]');
		
		// Add new Property
		target.prototype.ClassDecorator1Property = 'ClassDecorator1Property';

		return class extends target {
	
			// log
			// console.log('[ClassDecorator1] [layer 3]');
			// Error : can not log here ...

			// 对原有构造函数进行修改，使用super继承
			constructor () {
				super();
				console.log('[ClassDecorator1] [layer3] [constructor] modification');
			}
			
			// 保存原有的方法
			// currentMethod = target.method;
			// 没有意义，因为这里（类装饰器）修改不了
			// 需要借助方法装饰器实现

			// 重载当前的方法
			method() : void {
				console.log('[ClassDecorator1] [layer3] [method] modification');
				console.log('[ClassDecorator1] [layer3] [method] this.name : ', this.name);
			}

			// 调用原有的方法
			// currentMethod.call(this);
			// Error : can not call old method here ...

			// Add new Property
			// target.prototype.ClassDecorator1Property = 'ClassDecorator1Property';
			// Error : can not edit prototype chain here ...

			// log
			// console.log('[ClassDecorator1] [end] param : ', params);
			// Error : can not console.log here ...
		}
	}
}

// 类装饰器2
function finalClassDecorator2 (...params : any[]) : any {
	params = params.map((e) => {
		return String(e);
	});
	// log
	console.log('[ClassDecorator2] [layer 1]');
	

	return function (target : any) : any {

		// log
		console.log('[ClassDecorator2] [layer 2]');
		
		// Add new Property
		target.prototype.ClassDecorator2Property = 'ClassDecorator2Property';

		return class extends target {

			// 对原有构造函数进行修改，使用super继承
			constructor () {
				super();
				console.log('[ClassDecorator2] [layer3] [constructor] modification');
			}
			
			// 重载当前的方法
			method() : void {
				console.log('[ClassDecorator2] [layer3] [method] modification');
				console.log('[ClassDecorator2] [layer3] [method] this.name : ', this.name);
			}
		}
	}
}

// 属性装饰器
function finalPropertyDecorator (...params : any[]) : any {
	// 参数类型转换
	params = params.map((e) => {
		return String(e);
	});
	console.log('[finalPropertyDecorator] [layer1]');
	return function (target : any, propertyName : any) : any {
		console.log('[finalPropertyDecorator] [layer2] before rename this.name');
		if (params[0]) {
			target[propertyName] = params[0]; 
		}
		console.log('[finalPropertyDecorator] [layer2] after rename this.name');
	}
}

// 方法装饰器
function finalMethodDecorator (...params : any[]) : any {
	params = params.map((e) => {
		return String(e);
	});
	console.log('[finalMethodDecorator] [layer1]');
	return function (target : any, methodName : any, methodDesc : any) {
		var originMethod : any = methodDesc.value;
		methodDesc.value = function () {
			console.log('[finalMethodDecorator] [method] : Modification');
		}
		console.log('[finalMethodDecorator] [layer2] [method] before call orignal');
		originMethod.call(this);
		console.log('[finalMethodDecorator] [layer2] [method] after call orignal');
	}
}

// 参数装饰器
function finalParamsDecorator (...params : any[]) : any {
	params = params.map((e) => { return String(e); });
	console.log('[finalParamsDecorator] [layer1]');
	return function (target : any, methodName : any, paraIndex : any) {
		// 装饰器参数
		// console.log('params : ', params);
		// 原型对象或者构造函数
		// console.log('target : ', target);
		// 方法名称
		// console.log('methodName : ', methodName);
		// 参数索引
		// console.log('paramsIndex : ', paramsIndex);
		console.log('[finalParamsDecorator] [layer2]');
	}
}

// 类装饰器
@finalClassDecorator1(4, 5, 6)
@finalClassDecorator2(1, 2, 3)
class TestClass {
	
	// 属性装饰器
	@finalPropertyDecorator('you', 'heng', 'chan')
	public name : string | undefined = 'chx';   //  测试结论：如果这里有默认值，属性装饰器会失效

	constructor () {
		this.name = 'youheng';
		console.log('[TestClass] [constructor] : origin');
	}

	// 方法装饰器 & 参数装饰器
	@finalMethodDecorator('A', 'B', 'Z')
	method (@finalParamsDecorator('params') ...params : any[]) {
		console.log('[TestClass] [method] : original method');
		// console.log('[TestClass] [method] : this.name : ', this.name); 
		// Error : this.name  is undefined
	}
}


export { TestClass };


// 经过测试得出的结论：
/*

C:\Users\lenovo\Desktop\ts>node testFinalDecorator.js
[finalPropertyDecorator] [layer1]
[finalPropertyDecorator] [layer2] before rename this.name
[finalPropertyDecorator] [layer2] after rename this.name
[finalMethodDecorator] [layer1]
[finalParamsDecorator] [layer1]
[finalParamsDecorator] [layer2]
[finalMethodDecorator] [layer2] [method] before call orignal
[TestClass] [method] : original method
[finalMethodDecorator] [layer2] [method] after call orignal
[ClassDecorator1] [layer 1]
[ClassDecorator2] [layer 1]
[ClassDecorator2] [layer 2]
[ClassDecorator1] [layer 2]
[TestClass] [constructor] : origin
[ClassDecorator2] [layer3] [constructor] modification
[ClassDecorator1] [layer3] [constructor] modification
[ClassDecorator1] [layer3] [method] modification
[ClassDecorator1] [layer3] [method] this.name :  youheng
youheng

*/

// 大致的顺序是 属性-》方法-》参数-》类
// 但是其中是有包含关系的