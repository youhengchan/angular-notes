"use strict";
// testFinalDecorator.ts
// 用于测试最终的装饰器
Object.defineProperty(exports, "__esModule", { value: true });
var finalDecorator_1 = require("./modules/finalDecorator");
var t = new finalDecorator_1.TestClass();
t.method();
console.log(t.name);
//# sourceMappingURL=testFinalDecorator.js.map