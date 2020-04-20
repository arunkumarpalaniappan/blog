---
title: Understanding JavaScript - Asynchronous JavaScript
date: "2020-04-20T10:00:00+05:30"
template: "post"
draft: false
slug: "understanding-javascript-asynchronous-js"
category: "JavaScript"
tags:
  - "Understanding JavaScript"
  - "Asynchronous"
  - "Advanced"
description: "Most of Real-world JavaScript applications uses async to handle the data, In this module will be seeing more about about aync and various ways like callbacks, promises, async/await through which we can do async in"
socialImage: "/media/image-2.jpg"
---

Welcome to our series **Understanding JavaScript**, In this post we will be exploring more on **Asynchronous JavaScript**

In JavaScript,most of the real-world applications uses asynchronous way to fetch data from the server, which might be confusing for some of us who only have experience only with synchronous architecture. In this module we will see what asynchronous programming in JavaScript is, some of the difficulties of using asynchronous code and different ways that we are using to overcome these difficulties.

#### Synchronous
In synchronous code, if we have two lines of code (L1 followed by L2), then L2 cannot begin running until L1 has finished executing.

We can imagine this as if we are standing in a line of people waiting to buy a bus ticket. We can't begin to buy a ticket until all the people in front of us have finished buying theirs. Similarly, the people behind us can't start buying their tickets until we bought ours.


#### Asynchronous 
In asynchronous method, we can have two lines of code (L1 followed by L2), where L1 schedules some task to be run in the future, but L2 runs before that task completes.

We can imagine as if you are eating at a restaurant. Other people order their food. We can also order food. We don't have to wait for them to receive their food and finish eating before our order.Everybody will get their order as soon as it is ready.

The sequence in which people receive their food is often correlated with the sequence in which they ordered food, but these sequences do not always have to be identical. Asynchronous does not mean the same thing as concurrent or multi-threaded. JavaScript can have asynchronous code, but it is generally single-threaded. 


The classical example for asynchronous method in JavaScript is `setTimeout` function

```js
console.log("Start");
setTimeout(function() {
  console.log("Wait for 2 secs!");
}, 2000);
console.log("End");
```

If we run this code in synchronous way, we can expect following output:

```js
//Say "Start".
//Do nothing for two seconds.
//Say "Wait for 2 secs!!"
//Say "End"
```

But `setTimeout` does not pause the execution of the code. It only schedules something to happen in the future, here for 2 seconds and then immediately continues to the next line.

```js
//Say "Start".
//Say "End"
//Do nothing for two seconds.
//Say "Wait for 2 secs!!"
```

There are different ways we can use to do this in JavaScript.They're

* Callbacks
* Promises

#### Callbacks

In JavaScript, we know that the functions are objects([understanding-javascript-object-oriented-js](understanding-javascript-object-oriented-js)) and we can pass named parameters or arguments to functions.
In addition to variables, we can also pass functions as parameters to other functions and call them inside the outer functions. If you consider the below snippet
```js
function calculate(callback) {  
    //do some calculation
    callback(result);
}
```
The `calculate( )` function takes another function as a parameter and calls it inside. This is valid in JavaScript and we call it a “callback”. Function that is passed to another function as a parameter is a callback function, which will be invoked from that function whenever needed.
JavaScript runs code sequentially in top-down order. However, there are some cases that code runs (or must run) after something else happens and also not sequentially. This is called asynchronous programming.

Callbacks make sure that a function is not going to run before a task is completed or only after it is invoked instead of waiting for a previous function to execute.

If we consider the following snippet,we're passing a call back to `setTimeout` function.
```js
const log = function() {  
    console.log("This is shown after 3 seconds");
}
setTimeout(log, 3000);
```

But there is a problem with callback and it is popularly known as callback hell

```js
getData(function(a){
    getMoreData(a, function(b){
        getSomeMoreData(b, function(c){ 
            getAdditionalMoreData(c, function(d){ 
                .d(data);
            });
        });
    });
});
```

The cause of callback hell is when we try to write JavaScript in a way where execution happens.In other languages like C there is the expectation that whatever happens on line 1 will finish before the code on line 2 starts running and so on down the file. JavaScript is different. It will keep waiting until the function is successfully executed and traverse all the way down to the last nested callback function.

So we're blocking the execution thread and waiting until the executing is completed.

There are some ways we can follow to avoid this, like.

* Modularizing our code
* Handling errors properly
* Using ES6 promises

#### Promises

Promises are the ideal choice for handling asynchronous operations in a simple and effective manner. It can handle multiple asynchronous operations easily and provide better error handling than callbacks.

Promise has three major states:
* fulfilled: Action related to the promise succeeded
* rejected: Action related to the promise failed
* pending: Promise is still pending i.e not fulfilled or rejected yet

```js
const promise = new Promise((resolve, reject) => { 
    const x = "success"; 
    const y = "success"
    if(x === y) { 
        resolve(x); 
    } else { 
        reject('Failed'); 
    } 
}); 
```
As we can see, Promise will accept two parameters, `resolve` and `reject`. resolve should be called when there the request is success and reject in case of errors.

```js
promise. 
	then( (response) => {
        console.log(response);
    }). 
	catch( (error) => {
        console.log(error);
    }); 
```

We can able to see success response inside `then` and error inside `catch` block.

Promises have many methods like .all, .chain to combine more than one Promise. Read more about promises at [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)


This are some of the ways that we will use to make asynchronous programming better in JavaScript.


You can go through the following references, if you like to do a deep dive on asynchronous programming in JavaScript. 

References:

* [https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous)
* [https://www.dashingd3js.com/lessons/javascript-callback-functions/](https://www.dashingd3js.com/lessons/javascript-callback-functions)
* [http://callbackhell.com/](http://callbackhell.com/)
* [https://github.com/maxogden/art-of-node#callbacks](https://github.com/maxogden/art-of-node#callbacks)
* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)