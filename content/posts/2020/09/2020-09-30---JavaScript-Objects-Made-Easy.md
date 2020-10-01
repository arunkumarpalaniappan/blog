---
title: Series - Made Easy with JavaScript - Objects 
date: "2020-09-30T11:30:00+05:30"
template: "post"
draft: false
slug: "made-easy-with-javascript-objects"
category: "JavaScript"
tags:
  - "JavaScript"
  - "Objects"
  - "Made Easy with JS"
description: "Welcome to series Made easy with JavaScript. In this series we will be exploring some quick and efficient methods to do day to day operations in JavaScript. This post will explore on the most used operations/actions on objects and how efficient it can be in real-world."
socialImage: "/media/image-2.jpg"
---
Welcome to series **Made easy with JavaScript**. In this series we will be exploring some quick and efficient methods to do day to day operations in JavaScript. This post will explore on the most used operations/actions. Let’s get started.


You can read Part 1 of this series **Made easy with JavaScript Arrays** at  [https://practice.sh](https://practice.sh/posts/2020/09/made-easy-with-javascript-array)


###  Checking for a key exists in object

Checking for an key in object by value by validating it with ```undefined```, but is not an accurate way of testing whether a key exists because undefined itself can be a value of an key.

```js
const obj = { key: undefined };
if(obj["key"] !== undefined) {
    // key exists
}
```
So, we can use ```in``` operator to check for an key.
```js
if("key" in obj){
    // key exists
}
```
We can also check if a key doesn't exist using negate condition with a parenthesis.
```js
!("key" in obj) //  key does not exist
!"key" in obj   // ERROR!  Equivalent to "false in obj"
```
If we want to particularly check for properties of the object instance (and not inherited properties), we can use ```hasOwnProperty```
```js
obj.hasOwnProperty("key") //  key exists
```
In terms of performance, ```in``` offers better performance that ```hasOwnProperty```.
![perf-check-object-key](https://res.cloudinary.com/practice-cdn/image/upload/v1601532234/blog/2020/09/checkobjectkey.png)


### Iterating through all keys in an object

We can use various methods to iterate through an object in JavaScript, but the most easiest and high performing approach is using a plain ```for``` loop or ```Object.keys``` method.

```js
// for loop
const myObject = {
    "key1": "value",
    "key2": "value"
};
for (let key in myObject) {
   console.log(key);    
   console.log(myObject[key]);
}
// Object.entries
Object.entries(myObject).forEach(([key, val]) => {
  console.log(key); 
  console.log(val); 
});
// Object.keys
Object.keys(myObject).forEach(key => {
  console.log(key);       
  console.log(myObject[key]);
});
```
Plain for loop and ```Object.keys``` is providing better performance that using ```Object.entries```.

![perf-iterate-object](https://res.cloudinary.com/practice-cdn/image/upload/v1601533786/blog/2020/09/iterateobject.png)

### Merging two objects

We can able to merge two JavaScript objects using different methods like using  ```Object.assign``` or even a plain ```for``` loop.

```Object.assign``` provides better performance than a traditional for loop.

```js
// using for loop
const obj1 = { "location": "delhi", "country": "us" };
const obj2 = { "pet": "dog" };

const merge = (obj1,obj2) => {
    let obj3 = {};
    for (let key in obj1) { obj3[key] = obj1[key]; }
    for (ley key in obj2) { obj3[key] = obj2[key]; }
    return obj3;
}
console.log(merge(obj1,obj2));

// using object.assign
console.log(Object.assign(obj1, obj2));

```
![perf-combine-object](https://res.cloudinary.com/practice-cdn/image/upload/v1601543154/blog/2020/09/combineobject.png)


### Checking if the Object is empty

We can check if the object is empty by using a traditional ```for``` loop or checking the length of object using ```Object.keys``` method and as you expect both provides a similar performance.

```js
// Object.keys
var obj = {};

console.log(Object.keys(obj).length === 0 && obj.constructor === Object);
// for loop 
var obj = {};
const isEmpty = (obj) => {
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
console.log(isEmpty(obj));
```
![perf-check-obj](https://res.cloudinary.com/practice-cdn/image/upload/v1601543849/blog/2020/09/checkobj.png)


### Deep cloning an Object

Most widely used method for this is by using the combination if ```JSON.parse```  and  ```JSON.stringify```, we can also we ```Object.assign``` to deep clone the object.

Using ```JSON.parse```  and  ```JSON.stringify``` is affecting the performance in big time, so its better to use ```Object.assign``` whenever possible to get a better performance.  

```js
// JSON.parse and JSON.strigify
const myObj = {
  string: 'string',
  number: 123,
  bool: false
}
console.log(myObj);
const clonedObj = JSON.parse(JSON.stringify(myObj));
console.log(clonedObj);
// Object.assign
const newClonedObj = Obj.assign({},myObj);
console.log(newClonedObj);
```

![perf-deep-clone](https://res.cloudinary.com/practice-cdn/image/upload/v1601545696/blog/2020/09/deepclone.png)

That's marks the conculsion for this part of the series - Made Easy with JavaScript. Thanks for reading and will see you soon with the Part 3 on **Strings**.
