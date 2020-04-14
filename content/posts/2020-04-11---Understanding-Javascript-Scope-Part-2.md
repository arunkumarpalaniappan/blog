---
title: Understanding JavaScript - Scope - Part 2
date: "2020-04-11T16:45:00+05:30"
template: "post"
draft: false
slug: "understanding-javascript-scope-part-2"
category: "JavaScript"
tags:
  - "JavaScript"
  - "Scope"
  - "Basics"
description: "There are different ways which we can use to cheat lexical scoping in JavaScript, we can use let, eval, with, even try-catch block that will work differently that normal scoping in JavaScript"
socialImage: "/media/image-2.jpg"
---
This is the second part of **Understanding JavaScript - Scope** Series.

You can read the first and third part using the below link

Part 1 of this blog available at - [Understanding JavaScript - Scope - Part 1](understanding-javascript-scope-part-1)

Part 3 of this blog available at - [Understanding JavaScript - Scope - Part 3](understanding-javascript-scope-part-3)

As we already knew that the JavaScript follows **lexical scoping** like most of the programming languages. Meaning lexical scoping is compile-time scope. At the time we wrote our code and the time our code got compiled, the scope got into stone, there is no more addition after the code is compiled or beyond the lexical phase. We explored about this in our [previous post (Understanding JavaScript - Scope - Part 1)](understanding-javascript-scope-part-1), about how scope is defined at a global level, how it will change at the function level, nested scope and so on.

We will consider each nested scope as a nested bubble, one function scope inside a big bubble where it is defined and so on till global scope.

```js
function bar() { //line 1
  var foo = "baz"; //line 2

  function baz(foo) { //line 4
    console.log(foo); //line 5
  }
  baz(); //line 7
}
bar(); //line 9
```
If you consider bubble `baz` wrapped inside the bubble `bar` which is wrapped inside `global` scope. If a variable is not found in the current scope, it will go back level higher in scope(till global scope) to find it and if not in strict mode, it will create a variable in the global scope or throw an error. The nesting that occurs here is the same way how lexical scoping works, it can't change at run time because that how we wrote the code, this is how we defined our function and how we called it.

But this is not how *always* JavaScript works, we have some exceptions too.

### Exceptions in Lexical Scoping

#### eval

```js
var foo = "bar"; //line 1

function bar(str) { //line 3
  eval(str); //line 4
  console.log(foo) //line 6
}

bar("var foo = 'baz'");
```
Most of the developers will call `eval` keyword as evil, because it completely changes the definition of lexical scoping. If we consider the above snippet of code, in compile time we will not able to predict the value of `foo` at line 6, the same applies for JavaScript compiler. So if there is an `eval` keyword in a function, the compiler will not do any default optimizations so it will be a bit slower than a code without `eval`.

So, In line 6, we don't have a reference for variable `foo` in the function scope `bar`, Ideally the value should be `bar` from `global` scope, but we have an `eval` statement at line 5,which is accepting a string with  the variable declaration. 

Here what `eval` says is, I'll create a variable for you in the middle of your current scope, So in line 6, the value of `foo` will be `baz` instead of `bar`.

So, we should not use eval unless there is no other alternative to your use-case, this not only defies lexcial scope but also JS compiler de-activates the default optimizations.

If we use strict mode, technically JavaScript will create a new scope only for that eval, which enables the JavaScript engine to do optimizations, but it will defy our assumptions about how things work in lexical scope, so by using strict mode, we will able  to write more optimized code. 

#### with

```js
var object = {
    a: 1,
    b: 2,
    c: 3
};

object.a = object.a - object.b;
object.c = object.a + object.b;
```
This is a sample code, where we have an `object` with 3 properties and after declaring, we are performing some operations to the `object.a` and `object.c`, but as you can see there are lot of references to `object` in the code. This will work but our code will not look clean, we can solve this by introducing `with` keyword.

```js
var object = {
    a: 1,
    b: 2,
    c: 3
};

object.a = object.a - object.b;
object.c = object.a + object.b;

with(object) {
    a = a-b;
    c = a+b;
    d = a*b; //line 13
}
```
As you can see, the code looks much cleaner right?

But we have an issue with `with` keyword, as you can see in line 13, we're assigning new value to the variable `d`, as per with keyword, we expect JavaScript engine to create a new property inside `object`, but as per lexical scoping, it will be created in global scope.

```js
var object = {
    a: 1,
    b: 2,
    c: 3
};

object.a = object.a - object.b;
object.c = object.a + object.b;

with(object) {
    a = a-b;
    c = a+b;
    d = a*b; //line 13
}
console.log(object.d) //undefined
console.log(d) // -6
```

With `eval` keyword is modifying existing scope at runtime, whereas `with` keyword is creating a whole new lexical scope, which is even more scarier than `eval` and we can't do any assumptions during development. Same as `eval`, when a JavaScript compiler sees a `with` keyword, it disables default optimizations.

So, as the same way that we should avoid eval, we should also avoid with unless it is ultimately necessary.

#### IIFE

**I**mmediately **I**nvoked **F**unction **E**xpression is a way to execute functions immediately, as soon as they are created. This is a good way to protect the scope of your function and the variables within it. But this also not follows any lexical bubble around it, meaning all IIFE has only one scope which at a function level and not able to access any scope outside the function, not even global one.

Why IIFE is so Useful?
 
IIFE is the most better way to avoid, 

* Polluting global variables.
* Overwrite global scope.

```js
var foo = 'bar';

(function (){
    console.log(foo); //undefined
    var foo = "baz";
    console.log(foo); //baz
})();
console.log(foo); //bar
```

IIFE is very much useful, if you want your entire file should not to use/have access to `global` scope or if you want to encapsulate your functions from `global` scope then just wrapping your file with IIFE will allow you to achieve this.

#### Block Scope in ES6

```js
function foo() {
 for (let i=0;i<5;i++) {
     console.log(i);
 }
 console.log(i); //undefined
}
foo();
```

If you see the above block if code, we know that let is having only block scope and  will not be accessed from outside the block.

But the actual problem with let keyword is that, its available in the block but only after its  declaration.

```js
function foo() {
 if(true) {
     console.log(i); //undefined
     var i = 2;
     console.log(i); //2
 }
 if(true) {
     console.log(i); //Uncaught ReferenceError: Cannot access 'i' before initialization
     let i = 2;
     console.log(i); //2
 }
}
foo();
```
As you can see, the difference between first and second if statement is the let keyword. If we're using let to declare a variable, we should always declare at the start of the scope.

We can use let, but have to be careful on where to declare it, alternatively we can use curly braces to create a new scope, so that the variable is accessible only inside the scope.
```js
function foo() {
 {
     let i = 1;
     console.log(i); //1
 }
 console.log(i); //undefined
}
foo();
```

#### try-catch

One other way to restrict the scope to a block is using try/catch block. Error argument in the catch block is accessible only inside the block<sup>*</sup>.

```js
try { 
    throw 'blockScope'
} catch(scope) {
    console.log(scope); //blockScope
}
console.log(scope); //undefined
```

<sup>*</sup>Scope is not accessible in all browsers except Internet Explorer 6 because of a bug which attaches the catch variable to a global scope. Apart from IE6, this try-catch will work in all major browsers.

Continue reading about *this*  keyword at [Part 3](understanding-javascript-scope-part-3) of this series.



References:

* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Variable_scope](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Variable_scope)
* Advanced JavaScript by Kyle Simpson
* [https://en.wikipedia.org/wiki/Scope_(computer_science)](https://en.wikipedia.org/wiki/Scope_(computer_science))