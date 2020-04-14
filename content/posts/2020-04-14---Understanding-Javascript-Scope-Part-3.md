---
title: Understanding JavaScript Scope - Part 3
date: "2020-04-14T13:15:00+05:30"
template: "post"
draft: false
slug: "understanding-javascript-scope-part-3"
category: "JavaScript"
tags:
  - "JavaScript"
  - "Scope"
  - "Basics"
description: "The most important part of a scope is the JavaScript execution context. So what is exceution context? Its the context depends on 2 questions, How the function is called? From where the function is called?"
socialImage: "/media/image-2.jpg"
---

This is the final part of **Understanding JavaScript Scope** Series.

You can read the first two parts of the blog using the below link

Part 1 of this blog available at - [Understanding JavaScript Scope - Part 1](understanding-javascript-scope-part-1)

Part 2 of this blog available at - [Understanding JavaScript Scope - Part 2](understanding-javascript-scope-part-2)

`this` keyword in JavaScript?

So, if we talk about the JavaScript Scope, the most important keyword will be *this* . We can define this keyword as, for each and every function, while executing, has a reference to its current execution context, which is called *this*.

Value of *this* depends on two important factors, 

* Where the function is being called/executed? 
* How the function is being executed?

There are four different ways that can determine the value of *this*.

* is `new` keyword used while calling the function?
* is the function called using `bind` or `apply` or `call` keyword?
* is the function called via a existing/owning context?
* default context(global) if the mode is not-strict.
##### using *new* keyword

```js
function bar() { 
  console.log(this);
  this.foo = "baz";
  console.log(this); //line 4
}
console.log(new bar());
```
We can use `new` keyword to call any function, irrespective of a class or function.(Fun Fact: There is nothing actually called *class* in JavaScript).

If we use `new` to reference a function, it will automatically create a new,empty object, which is passed as `this` to the respective function, this will work in the same way as calling the constructor. 

In addition to this, if the function doesn't have a return it will automatically add a return at the end of the function and return the value of `this`. 

In the above snippet, `return` statement will be added at end of line 4. So if we use `new` keyword, the value of this will be a new,empty object.


##### using **bind**, **call** or **apply** keyword to invoke a function

```js
function foo() {
    console.log(this.bar);
}
var bar = "bar1";
var obj = {bar: "bar2"};

foo();//bar1
foo.call(obj);//bar2
```

As we can see that by using `call` we can able to control the execution context explicitly, we can use `apply` to set the execution context.


 `apply()`, `call()` and `bind()` all take a this argument as a context to execute a function in, but `call()` and `apply()` invoke the function immediately where `bind()` returns a function that we can pass around or store as needed. When invoked, the bound function will always execute in the context provided as the this argument.


```js
function bind(func, object) {
    return function() {
        func.call(object);
    }
}
function foo() {
    console.log(this.bar);
}

function foo1() {
    console.log(this.bar);
}
var obj = {
    bar: "bar"
};
var obj1 = {
    bar: "bar1"
};

foo = bind(foo, obj);
foo1 = bind(foo1, obj1);

foo() // bar
foo.call(obj1) //bar
foo1() // bar1
foo1.call(obj) //bar1
```
If we use bind, apply or call to trigger a function, we can able to explicitly call a function and set the value of this if we use any of these methods.

**Function.prototype.bind** is available in ES6 and available in most of the browsers, The best polyfill for `bind` is available in MDN - [Polyfill for bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Polyfill)

##### function called via containing/owning object(context)

```js
function foo() {
    console.log(this.bar);
}
var bar = "bar1";
var object1 = { bar: "bar2" , foo: foo }; //line 5
var object2 = { bar: "bar3" , foo: foo }; //line 6

foo(); // bar1 - line 8
object1.foo(); // bar2 - line 9
object2.foo(); // bar3 - line 10
```
As you can see, if we call the function `foo` from line 8, which is at `global` scope, so the value of this is set at global scope, hnce the value of bar will be bar1.

In line 9 & 10, we're having different objects and at line 5 and 6 and using the same way we're referencing the function `foo` inside the objects.

And in line 9 and 10, we're invoking function from object, hence the value will be from the place it called, so it will print bar2 and bar3 respectively.

##### global context or strict mode
```js
function foo() {
    console.log(this);
}
foo(); // Window or global
```
If we see in the above snippet, the value of `this` inside the function `foo`, because it is not in strict mode, so the context passed is the global or window object.
```js
'use strict'
function foo() {
    console.log(this);
}
foo(); // undefined
```
If we use the same in strict mode, then it will be `undefined`. 

We don't have to use these methods to set the context of the function, we can simply take advantage of JavaScript Scope, as in our previous blogs and get the same results in a better optimized way and more easily.

The ultimate goal of this series is to understand `this` and JavaScript Scope in a better way and effectively write the JavaScript code for the better web.

In the next post we will be exploring more about Closure in JavaScript.


References:

* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Variable_scope](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Variable_scope)
* [https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/README.md](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/README.md)
* Advanced JavaScript by Kyle Simpson
* [https://en.wikipedia.org/wiki/Scope_(computer_science)](https://en.wikipedia.org/wiki/Scope_(computer_science))