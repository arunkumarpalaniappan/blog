---
title: Understanding JavaScript - Object Oriented JavaScript
date: "2020-04-17T18:00:00+05:30"
template: "post"
draft: false
slug: "understanding-javascript-object-oriented-js"
category: "JavaScript"
tags:
  - "Understanding JavaScript"
  - "Object-Oriented"
  - "Advanced"
description: "Object Orientend JavaScript is becaming more popular buzz world inside JS community and as we already know JavaScript have classes and constructors but those are completely different from normal Object Orient languages like Java, C++, etc.., Prototypal inheritance "
socialImage: "/media/image-2.jpg"
---

Welcome to our series **Understanding JavaScript**, In this post we're going to demystify **Object Oriented JavaScript**.

We will start with truth, JavaScript **doesn't have classes** and inhertitance in JavaScript is also different from other Object oriented languages, So If you coming from any other Class based languages like Java/C++,brace yourself. This might be little diffcult than your current understanding about Object Oriented Programming, So lets start.


There are four important concepts which makes a languages Object Oriented and you heard about all of them.

* Object
* Classes
* Encapsulation
* Inheritance

#### Object

So in Java, if you want to create a Object, you will call a class, which will have a constructor and using that, we will create an Object, but in JavaScript we **don't have class and constructor**, we have class keyword, super keyword, Those are **just syntactic sugar** over normal function keyword in JavaScript.

If we don't have an actual class or an actual constructor, then how will we create an object in JavaScript?

That's the beauty in JavaScript. You already know that the JavaScript is dynamically typed, meaning we don't have statically  typed variables. You can re-assign an integer to string variable, re-assign array variable with object value, So basically JS has two types of values, Primitive and Non-primitive Values.

Primitive types contains datatypes except functions and objects, i.e, string, number, bigint, boolean, undefined(Yes!! undefined is a type in JavaScript), and symbol. Others are Non-primitive values.

If you have used array anywhere in JavaScript, then you have already created and used objects in JavaScript. Yes, array is also an object in JavaScript.

```js
typeof [] //object
```

We can create objects in JavaScript without requiring class or a constrctor, just have to assign a object to a variable.

```js
const typicalPersonObject = {
    firstName: 'Lexical',
    greet: function() {
        return `Welcome ${this.firstName}`;
    }
};
typeof typicalPersonObject // object
typicalPersonObject.greet(); // Welcome Lexical
```
You can read more about `this` keyword in my previous post [understanding-javascript-scope-part-1](understanding-javascript-scope-part-1).


Second method is to use `Object.create()`, it's a native method,supported in most of the browsers.


```js
const typicalPersonObject = {
    firstName: this.firstName,
    greet: function() {
        return `Welcome ${this.firstName}`;
    }
};
const greetUser = Object.create(typicalPersonObject);
greetUser.firstName = 'Lexical';
greetUser.greet()
```
To understand the working of `Object.create()` method, we have to take a look at its polyfill.

```js
 if (typeof Object.create !== "function") {
    Object.create = function (proto) {
        function F() {}
        F.prototype = proto;
        return new F();
    };
}
```
Internally JavaScript is using `new` keyword to create an object,detailed explanation for `new` keyword is available at [understanding-javascript-scope-part-3](understanding-javascript-scope-part-3).

So last and final way to create Object is using the `new` keyword.

```js
function typicalPersonObject(firstName) {
    this.firstName = firstName,
    this.greet = function() {
        return `Welcome ${this.firstName}`;
    }
}
const greetUser = new typicalPersonObject('Lexical');
greetUser.greet()
```
So that's various ways we can use to create an Object in JavaScript.

#### Classes

We **don't have classes** in JavaScript, Unlike other OOP languages there is no classes in JavaScript, we have only Object. JavaScript is just a prototype based object oriented language.

Note: Even the classes provided by ECMA2015 are objects.

*JavaScript classes, introduced in ECMAScript 2015, are primarily syntactical sugar over JavaScript’s existing prototype-based inheritance. The class syntax is not introducing a new object-oriented inheritance model to JavaScript. JavaScript classes provide a much simpler and clearer syntax to create objects and deal with inheritance.
–Mozilla Developer Network*

Below snippet is an exmplae using `class` keyword from ES6.

```js
class Person { 
  constructor(name) { 
    this.name = name;
  } 
  greet(){ 
      return (`Welcome ${this.name}.`) 
  } 
}
const lexical = new Person('Lexical'); 
const grammar = new Person('Grammar'); 

console.log(lexical.greet()); 
console.log(grammar.greet()); 
```

Same code without using ES6.

```js
function Person(name){ 
    this.name = name;
    this.greet = function(){ 
    return (`Welcome ${this.name}.`);
} 
}; 
  
const lexical = new Person('Lexical'); 
const grammar = new Person('Grammar'); 

console.log(lexical.greet()); 
console.log(grammar.greet()); 
```

If you see, the `class` keyword in ES6 is just syntactic sugar around existing function, so there is no classes in JavaScript,we have only Objects.(May be, JS is the true Object Oriented Language!)

#### Encapsulation

Basically encapuslation is the process of wrapping class or function within a single unit.

If we consider the following snippet

```js
function Person(name){ 
    this.name = name;
    this.greet = function(){ 
    return (`Welcome ${this.name}.`);
} 
}; 
  
const lexical = new Person('Lexical'); 

console.log(lexical.greet()); 
```

We're already encapsulating a method called `greet` inside the class `Person`, but most of the encapuslation also in abstraction. 

We can also do abstraction inside classes by not assigning a method to `this` keyword.

```js
function Person(name){ 
    this.name = name;
    this.greet = function(){ 
    return (`Welcome ${this.name}.`);
    }
    const newGreeting = () => {
        console.log(this.name);
    };
}; 
  
const lexical = new Person('Lexical'); 

console.log(lexical.greet()); 
console.log(lexical.newGreeting()); //undefined
```
Classic example of abstraction in JavaScript is [Closure](understanding-javascript-closure).

#### Inheritance

Inheritance in JavaScript is called prototypal inheritance, its completely different from normal inheritance in Object Oriented Programming Languages. In Java, for example, if a class extends another class, the inhertied properties are local to the new class.

But in JavaScript, its just a Linkage, Inheritance in JavaScript works in the same way as lexical scoping. If we create a object in JavaScript, we may see some default methods attached to it by default.

For example, if we create a array, it has may methods like `sort`, `map`, `slice`, etc.., These are inherited from prototypal chain. All objects in JavaScript has a property called `__proto__` or called dunder proto.

This refers to the parent of current object and it automatically inherits the methods from parent to child, but remember this is just a linkage, if you chage method in parent class, Functionality inside the child class will also updated.

We can access these inherited methods using `.methodName`.

```js
const data = [1,2,3,4,5];
console.log(data.join('')) // 12345
```

Same inhertitance applies for our custom classes, If we have a class, which is basically an object, which is inherited from JavaScript native Object method. Extending custom class to a child class will have all properties of parent class inside dunder proto (`__proto__`) reference. 

If we see the following example.

```js
class Person { 
    constructor(name){ 
        this.name = name; 
    } 
    greetWithName(){ 
        return (`Welcome ${this.name}`); 
    } 
    greetWOName() {
        return (`Welcome`); 
    }
} 
class Student extends Person { 
    constructor(name, school){
        super(name); // calling Person constructor using super keyword
        this.school = school; 
    } 
    greetWOName(){ 
        return (`School: ${this.school}`); 
    } 
} 
const student1 = new Student('Lexical','Grammar'); 
console.log(student1.greetWOName()); // School Grammar
console.log(student1.greetWithName()); // Welcome Lexical
console.log(student1.hasOwnProperty('name')); //true
```
If you see student1 inherits method called `greetWOName` from class `Student`. Then we're trying to access a method called `greetWithName`, which is not available in the class `Student`, So it looks inside `__proto__` property, which points to the class `Person`. `Person` class has a method called `greetWithName`,So it returns the function. 

Next line we have a method invocation for `hasOwnProperty`, which is not defined in `Student` and `Person`, But In JavaScript, while creating a method it passes a prototypal inheritance to the object and since every class is technically an object in JavaScript, it has `__proto__` reference to default implementation.

In short, class `Student.__proto = Person`, `Person.__proto = Object`, So `Student.__proto__.Person.__proto__ = Object`. So we can able invoke the method `hasOwnProperty` from student1.

We're over-writing a method called `greetWOName` in the class `Student`, which is generally known as **Method Overloading** in Object Oriented Programming.

Hopefully this gives you a better understanding about Object Oriented JavaScript, to get more understanding you can read the links in references.


References:

* [https://johnresig.com/blog/simple-class-instantiation/](https://johnresig.com/blog/simple-class-instantiation/)
* [https://www.liip.ch/en/blog/why-i-dont-use-the-javascript-new-keyword](https://www.liip.ch/en/blog/why-i-dont-use-the-javascript-new-keyword)
* Advanced JavaScript by Kyle Simpson
* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
* [https://www.freecodecamp.org/news/how-javascript-implements-oop/](https://www.freecodecamp.org/news/how-javascript-implements-oop/)
* [https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS)
* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)