---
title: Understanding JavaScript Scope - Part 1
date: "2020-04-10T16:45:00+05:30"
template: "post"
draft: false
slug: "understanding-javascript-scope-part-1"
category: "JavaScript"
tags:
  - "JavaScript"
  - "Scope"
  - "Basics"
description: "Scope in JavaScipt? How this keyword is working, how function scope behaves in JS compiler? Interestingly JavaScript is compiled like most of the language with static types like C++, Java, etc"
socialImage: "/media/image-2.jpg"
---

This is the first part of **Understanding JavaScript Scope** Series.

You can read the second and third part using link provided at end of this blog.


Scope in JavaScipt? Most of the time, it's just the basics that we get wrong. Even the most experienced JavaScript developers will say that JS is interpreted language not compiled. Unfortunately,it's not true. JavaScript is compiled like most of the language with static types like C++, Java, etc.. Every line in JavaScript will be complied before being executed, In statically typed languages like Java, we distribute class files or in C++ where we distribute binary files to the end-user, whereas in JavaScript we distribute Source Javascript file directly and its compiled and then executed each time it was triggered.

For the first time it will compile all variables and function declarations.Meaning, store variable declarations(it may be in micro seconds, but it compiles) and then each lines will be executed/interpreted one by one.

You may now wonder, what is the relation between Javascript compilation and Scope in JavaScript?

To understand the Scope in JavaScript completely, we need to understand how JavaScript compiler works.

Let's start with Variables, It's safe to define functionality of a variable in JavaScript is to say the compiler, where it is declared, how is it defined or is it in the same lexical scope? and so. Then Scope means where to look for things in the JavaScript environment.

And the scope of JavaScript is at the atomic level or say at a function level, to understand `this` better lets look at the following snippet of code.

```js
var foo = "bar"; //line 1

function bar() { //line 3
  var foo = "baz"; //line 4

  function baz(foo) { //line 6
    foo = "bam"; //line 7
    bam = "yay"; //line 8
  }
}
```
Looks like a normal function, But!!!


Yes,as we seen already, first JS will compile and the interpreted. If you look closer there is two function scope and one global or bubble scope. We will consider those as `globalScope`, `functionBarScope`, `functionBazScope`. `functionBazScope` is local to `functionBarScope` and it is defined/local to `this` or `globalScope`.

At Line 1 `globalScope` will define a new variable called `foo`.

At Line 3 is have a new function called `bar`, which will be added to the `globalScope`.Since this is a function, it will recursively enter and do the same for each declarations.

At Line 4 we have a new variable called `foo` declared inside `functionBarScope`

At Line 6 we have a new function called `baz` declared inside `functionBarScope`


Next declaration is also at Line 6, function `baz` has a named parameter(argument) called `foo`, which is same as defining a local variable inside function  `baz`, so again at Line 6, variable declaration `foo` added to the function scope `functionBazScope`.

And there is no more variable or function declarations, so JavaScript compilation comes to end.

If we see, all Left Hand Side(LHS) assignments are compiled.

Let's now run the execute the code, meaning we will now see all RHS(Right Hand Side) part of the code and how it is interpreted by JavaScript engine.

```js
var foo = "bar"; //line 1

function bar() { //line 3
  var foo = "baz"; //line 4

  function baz(foo) { //line 6
    foo = "bam"; //line 7
    bam = "yay"; //line 8
  }
  baz(); //line10
}
bar(); //line12
console.log(foo);//line13
console.log(bam);//line14
baz();//line15
```
At Line 1, we have a variable assignment. JS Engine will ask the current atomic scope, which is now `globalScope` has a variable `foo` defined, so we can assign the value to that variable.

Line 3 will be skipped, as it is a method/function and it is not being called/triggered.

Next will be at line 12, which is calling the method `bar` in current scope and we have a method called `bar` available in `globalScope`.

Next execution will be at line 4, inside the function. As JS has atomic scope, now scope of exceution is set at `functionBarScope`.

At line 4, there is a variable assignment for  `foo` and it is available in `functionBarScope`.

Line 6 will be skipped for now.

At line 10, we will call method `baz`

Now at line 7, again a variable assignment for `foo`, which is available in `functionBazScope` as a named parameter.

Line 8, variable assignment for `bam`, which is a LHS operation. Here the variable is not available in scope called `functionBazScope`.

It will **not throw, not defined error**, wondering why? because the file doesn't have `use strict`.

Now, JS engine will see next nested scope, which is `functionBarScope` for the variable declaration for  `bam`, even this scope doesn't have the variable defined.

Again, next atomic scope, here it will look in global scope / window for the variable declaration `bam`, which is not present.

Again, It will **not throw, not defined error**  because global scope without strict mode will work differently, now global scope will create a variable called `bam` for us in global scope and say *I have a declaration for that variable*. Now assignment will happen at global scope.

So all the executions are done for line 12.

Now line 13, will print `bar`, because in the current scope the value is not changed.

Now at line 14, this will print `yay` , as it defined in global scope while executing the function `baz`.

Now at line 15, what do you think it will happen?

Will is create a function in the global scope, as this is not in strict mode? *No*

Will it throw an error saying, *not defined*? *Yes*, but why?

This is not an LHS operation, wondering how to differentiate LHS and RHS operation, the operation, apart from variable/method definition without equal to(=) operator is considered as RHS Operation.

So, JavaScript engine will look for a method definition `baz` in current scope i.e, global scope and it is not available in the global scope, So it throws **Uncaught ReferenceError: baz is not defined** error.

We can visualize each scopes that is `globalScope`, `functionBarScope`, `functionBazScope` as following.

```js
globalScope = {
  foo, //globalScope
  bar : {
    foo, //functionBarScope
    baz: {
      foo //functionBazScope
    }
  },
  bam //globalScope
}
```
Hope this helps you to understand the basics of Scope in JS and gives you some understanding on how JavaScript behaves with/without strict mode. Still there are some different behaviour if we use `eval` and there is a lot more ground to be covered in *lexical scoping*.

Part 2 of this blog available at - [Understanding JavaScript Scope - Part 2](understanding-javascript-scope-part-2)

Part 3 of this blog available at - [Understanding JavaScript Scope - Part 3](understanding-javascript-scope-part-3)



References:

* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Variable_scope](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Variable_scope)
* Advanced JavaScript by Kyle Simpson
* [https://en.wikipedia.org/wiki/Scope_(computer_science)](https://en.wikipedia.org/wiki/Scope_(computer_science))