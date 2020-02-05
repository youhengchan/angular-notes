// testFinalDecorator.ts
// 用于测试最终的装饰器

import { TestClass as T } from './modules/finalDecorator';

var t : any = new T();

t.method();

console.log(t.name);