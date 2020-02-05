"use strict";
// finalDecorator.ts
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
// 装饰器总结
// 类、属性、方法、参数： 四种装饰器的执行顺序
// 通过代码来说明：
// 类装饰器1
function finalClassDecorator1() {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    params = params.map(function (e) {
        return String(e);
    });
    // log
    console.log('[ClassDecorator1] [layer 1]');
    return function (target) {
        // log
        console.log('[ClassDecorator1] [layer 2]');
        // Add new Property
        target.prototype.ClassDecorator1Property = 'ClassDecorator1Property';
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            // log
            // console.log('[ClassDecorator1] [layer 3]');
            // Error : can not log here ...
            // 对原有构造函数进行修改，使用super继承
            function class_1() {
                var _this = _super.call(this) || this;
                console.log('[ClassDecorator1] [layer3] [constructor] modification');
                return _this;
            }
            // 保存原有的方法
            // currentMethod = target.method;
            // 没有意义，因为这里（类装饰器）修改不了
            // 需要借助方法装饰器实现
            // 重载当前的方法
            class_1.prototype.method = function () {
                console.log('[ClassDecorator1] [layer3] [method] modification');
                console.log('[ClassDecorator1] [layer3] [method] this.name : ', this.name);
            };
            return class_1;
        }(target));
    };
}
// 类装饰器2
function finalClassDecorator2() {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    params = params.map(function (e) {
        return String(e);
    });
    // log
    console.log('[ClassDecorator2] [layer 1]');
    return function (target) {
        // log
        console.log('[ClassDecorator2] [layer 2]');
        // Add new Property
        target.prototype.ClassDecorator2Property = 'ClassDecorator2Property';
        return /** @class */ (function (_super) {
            __extends(class_2, _super);
            // 对原有构造函数进行修改，使用super继承
            function class_2() {
                var _this = _super.call(this) || this;
                console.log('[ClassDecorator2] [layer3] [constructor] modification');
                return _this;
            }
            // 重载当前的方法
            class_2.prototype.method = function () {
                console.log('[ClassDecorator2] [layer3] [method] modification');
                console.log('[ClassDecorator2] [layer3] [method] this.name : ', this.name);
            };
            return class_2;
        }(target));
    };
}
// 属性装饰器
function finalPropertyDecorator() {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    // 参数类型转换
    params = params.map(function (e) {
        return String(e);
    });
    console.log('[finalPropertyDecorator] [layer1]');
    return function (target, propertyName) {
        console.log('[finalPropertyDecorator] [layer2] before rename this.name');
        if (params[0]) {
            target[propertyName] = params[0];
        }
        console.log('[finalPropertyDecorator] [layer2] after rename this.name');
    };
}
// 方法装饰器
function finalMethodDecorator() {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    params = params.map(function (e) {
        return String(e);
    });
    console.log('[finalMethodDecorator] [layer1]');
    return function (target, methodName, methodDesc) {
        var originMethod = methodDesc.value;
        methodDesc.value = function () {
            console.log('[finalMethodDecorator] [method] : Modification');
        };
        console.log('[finalMethodDecorator] [layer2] [method] before call orignal');
        originMethod.call(this);
        console.log('[finalMethodDecorator] [layer2] [method] after call orignal');
    };
}
// 参数装饰器
function finalParamsDecorator() {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    params = params.map(function (e) { return String(e); });
    console.log('[finalParamsDecorator] [layer1]');
    return function (target, methodName, paraIndex) {
        // 装饰器参数
        // console.log('params : ', params);
        // 原型对象或者构造函数
        // console.log('target : ', target);
        // 方法名称
        // console.log('methodName : ', methodName);
        // 参数索引
        // console.log('paramsIndex : ', paramsIndex);
        console.log('[finalParamsDecorator] [layer2]');
    };
}
// 类装饰器
var TestClass = /** @class */ (function () {
    function TestClass() {
        // 属性装饰器
        this.name = 'chx'; //  测试结论：如果这里有默认值，属性装饰器会失效
        this.name = 'youheng';
        console.log('[TestClass] [constructor] : origin');
    }
    // 方法装饰器 & 参数装饰器
    TestClass.prototype.method = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        console.log('[TestClass] [method] : original method');
        // console.log('[TestClass] [method] : this.name : ', this.name); 
        // Error : this.name  is undefined
    };
    __decorate([
        finalPropertyDecorator('you', 'heng', 'chan')
    ], TestClass.prototype, "name", void 0);
    __decorate([
        finalMethodDecorator('A', 'B', 'Z'),
        __param(0, finalParamsDecorator('params'))
    ], TestClass.prototype, "method", null);
    TestClass = __decorate([
        finalClassDecorator1(4, 5, 6),
        finalClassDecorator2(1, 2, 3)
    ], TestClass);
    return TestClass;
}());
exports.TestClass = TestClass;
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
[ClassDecorator] [layer 1]
[ClassDecorator] [layer 2]
[TestClass] [constructor] : origin
[ClassDecorator] [layer3] [constructor] modification
[ClassDecorator] [layer3] [method] modification
[ClassDecorator] [layer3] [method] this.name :  youheng
youheng
*/
//# sourceMappingURL=finalDecorator.js.map