---
title: Understanding JavaScript - Closure
date: "2020-04-14T18:00:00+05:30"
template: "post"
draft: false
slug: "understanding-javascript-closure"
category: "JavaScript"
tags:
  - "Understanding JavaScript"
  - "Closure"
  - "Intermediate"
description: "Closure in JavaScript is the combination of a function with references to its surrounding lexical scope. Closure gives access to an outer function’s scope from an inner function. In JavaScript, "
socialImage: "/media/image-2.jpg"
---

Welcome to our series **Understanding JavaScript - Closure**.

You can read the first version of the blog(to understand Closure better) using the below link

[Understanding JavaScript - Scope](/tag/scope/)

Closure in JavaScript is the combination of a function with references to its surrounding lexical scope. Closure gives access to an outer function’s scope from an inner function, without changing local scope. Closure completely depends on lexical Scoping. In JavaScript, closures are created every time a function is created.

In simpler terms, Closure is also a function which remembers its lexical scope, even when the function is executed from a different  or outside that lexical Scope.

Closure is a function, which has more than one inner functions and returns atleast one function, that can be invoked from outside.


Most of the times, we're using closures in our daily life without recognizing it as closure, If we ake a look at the following snippet, for example.

```js
function foo() {
    var bar = "baz";
    return function() {
        console.log(bar);
    };
}
function bam() {
    foo()();
}
bam();
```
If we see the function `foo`, it will print `bar`, but its invoked from a anotjer function named `bam` that function is invoked from global scope. 

In real world example, consider we're having a login function, which internally needs another function to create token, we need to expose only one function to the outer world.

```js
var authenticateUser = function() {
    var jwtKey = "s0m3-h|ghly-s3cur3-key";
    function createToken(claims) {
        var token = jwt.create(claims, jwtKey);
        token.setExpiration(new Date().getTime() + 60*1000)
        return token.compact();
    };
    function createUser(data) {
        if(dbVerify(data)) {
            var claims = { data.user, iss: 'login', 'aud': 'dashboard' };
            return {token: createToken(claims), res: 200};
        }
        return {res: 401};         
    }
    var publicAPI = {
        createUser
    };
    return publicAPI;
}
var authAPI = authenticateUser();
authAPI.createUser({user: 'user', pass: 'pass'}); // token
authAPI.createToken() // not accessible
authAPI.jwtKey // not accessible
```
Irrespective of the place or context,in which `createUser` function is called, the context or this of `createUser` doesn't change. This is one example where we can encapsulate our functions, we can use the same to encapsulte all of our function and expose only required one's.

In ES6, ECMA has standardized the module part and introduced two options, `export` and `import`. Each function is compartmentalized using files,by default. If we use `export` and we can able to import certain parts/functions or entire file using `import` module. 

```js
//foo.js
var object = {
    hello: "world"
}
function foo() {
    return object.hello;
}
function baz() {
    return object;
}
export default {
    foo,
    baz
};

//bar.js
import {foo} from "./foo.js";
import * as fooJS from "./foo.js";

foo()//using direct import
fooJS.foo() //using default import

```
So, using Closure and ES6 import/export module we can easily abstract our code and expose only important or highly necessary methods to outside API and most importantly, we can able to maintain same local lexical scope, even if the function is called from a different scope.

References:

* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
* [https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/README.md](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/README.md)
* Advanced JavaScript by Kyle Simpson