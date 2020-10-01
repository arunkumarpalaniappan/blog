---
title: Series - Made Easy with JavaScript - Array 
date: "2020-09-13T11:30:00+05:30"
template: "post"
draft: false
slug: "made-easy-with-javascript-array"
category: "JavaScript"
tags:
  - "JavaScript"
  - "Arrays"
  - "Made Easy with JS"
description: "Welcome to series Made easy with JavaScript. In this series we will be exploring some quick and efficient methods to do day to day operations in JavaScript. We will start with arrays. Everyday we are doing various operations like  appending, checking element, inserting, sorting, etc.., to process data in our web application. In this post we will be exploring the best ways to do these operations."
socialImage: "/media/image-2.jpg"
---
Welcome to series **Made easy with JavaScript**. In this series we will be exploring some quick and efficient methods to do day to day operations in JavaScript. We will start with arrays. Everyday we are doing various operations like  appending, checking element, inserting, sorting, etc.., to process data in our web application. In this post we will be exploring the best ways to do these operations.

You can read Part 2 of this series **Made easy with JavaScript Objects** at  [https://practice.sh](https://practice.sh/posts/2020/09/made-easy-with-javascript-objects)



### Adding new element at the beginning

There are two efficient ways to add a new element at the beginning in an array.

We can use ```unshift```. It's like ```push```, except it adds elements to the beginning of the array instead of the end.

* unshift - adds an element to the beginning of an array
* push - adds an element to the end of an array
* shift - remove and return the first element of an array
* pop - remove and return the last element of an array

```js
let array = [1, 2, 3, 4];
array.unshift(0);
console.log(array);
```

However this will mutate the original array, if we don't want to mutate the array, we can use ```concat``` or ES6 spread ```...``` operator, both offers best performance.

```js
let array = [ 1, 2, 3, 4 ];
const myFirstElement = 0;
const newArray = [myFirstElement].concat(array);
console.log(newArray);
const newArraywES6 = [myFirstElement, ...array];
console.log(newArraywES6);
```
![perf-unshift-concat-spread](https://res.cloudinary.com/practice-cdn/image/upload/v1600421968/blog/2020/09/unshif-concat-spread_hvlvuv.png)


### Empty an array 

Again, we can use various methods to empty an array in JavaScript, but the most easiest and high performing approach is assigning a empty array to the variable.

```js
// direct assignment
let array = [0,1,2,3,4];
array = [];
// using .length
let array = [0,1,2,3,4];
array.length = 0;
// using splice
let array = [0,1,2,3,4];
array.splice(0,array.length);
```
![perf-array-empty](https://res.cloudinary.com/practice-cdn/image/upload/v1600422461/blog/2020/09/assignment-length-splice_zxz6dp.png)

### Remove the duplicates from an array

Again, we can use a library like lodash or use native implementation like ```Set``` or use ```filter``` to remove duplicates, but which is the efficient way?

```js
// using Set
const array = [0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4];
const unique = [...new Set(array)];
console.log(unique);
// using filter
const array = [0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4];
const unique = array.filter(function(item, pos) {
    return array.indexOf(item) == pos;
});
console.log(unique);
// using hash table
function unique(array) {
    var seen = {};
    return array.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}
const array = [0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4];
console.log(unique(array));
```
![perf-duplicate-empty](https://res.cloudinary.com/practice-cdn/image/upload/v1600423138/blog/2020/09/duplicate-elements_yi3zaq.png)

As we can see, the naive implementation with ```filter``` is performing better than other methods.

### Removing a specific element from an array

We can remove a specific element using many ways, from my interactions with fellow developers, I found that most used methods are using ```splice```, ```slice``` and own implementation on prototype chain using ```for``` loop.

```js
// splice
const array = [1,2,3,4,5];
console.log(array);
const index = array.indexOf(5);
if (index > -1) {
  array.splice(index, 1);
}
console.log(array); 
// prototype 
Array.prototype.removeItem = function(array) {
    for (let iterator = 0; iterator < this.length; iterator++) {
        if (this[iterator] == array) {
            for (let iterator2 = iterator; iterator2 < this.length - 1; iterator2++) {
                this[iterator2] = this[iterator2 + 1];
            }
            this.length = this.length - 1;
            return;
        }
    }
};
const array = [1,2,3,4,5];
array.removeItem(5);
// slice
let array = [1, 2, 3, 4, 5];
let index = array.indexOf(5);
let newArray = arr.slice(0,index).concat(arr.slice(index+1));
console.log(newArray);
```
![perf-remove-element](https://res.cloudinary.com/practice-cdn/image/upload/v1600425656/blog/2020/09/remove-element_rm4xgb.png)

Here native implementation with for loop is faster than other two methods.

### Check if the array contains a value

Most widely used method for this is ```includes```  and using ```indexOf```, both menthod provides best performance, so we can use any of them to check for an element in an array.

```js
// includes
const array = [1,2,3,4,5];
console.log(array.includes(5));
// indexOf
const array = [1,2,3,4,5];
console.log(array.indexOf(5));
```

![perf-remove-element](https://res.cloudinary.com/practice-cdn/image/upload/v1600426212/blog/2020/09/find-element_x3jjdg.png)

That's marks the conculsion for this part of the series - Made Easy with JavaScript. Thanks for reading and will see you soon with the Part 2 on ```Objects```.
