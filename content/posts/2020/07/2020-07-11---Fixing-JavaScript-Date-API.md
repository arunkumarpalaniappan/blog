---
title: Fixing JavaScript Date API
date: "2020-07-17T18:00:00+05:30"
template: "post"
draft: false
slug: "understanding-javascript-web-workers"
category: "JavaScript"
tags:
  - "Understanding JavaScript"
  - "Date API"
  - "Frontend"
description: "Browser JavaScript is Single Threaded,So the basic assumption is that we can't process huge data in JavaScript in Parallel with normal DOM Oprerations, Unfortunately this is just an assumption, we can make browser to execute scripts parallely on Browser"
socialImage: "/media/image-2.jpg"
---
Browser JavaScript is Single Threaded, So the basic assumption is that we can't process huge data in JavaScript in Parallel with normal DOM Operations, Unfortunately, this is just an assumption, we can make browser to execute scripts parallelly on Browser.

But we're doing some function processing or network calls asynchronously, Does that mean we're handling things parallelly?

Sadly, No. Doing things asynchronously doesn't mean that it will execute parallelly. v8 engine will move the asynchronous functions or deferred functions such as `setTimeout`, `setInterval`, `setImmediate`  functions to the event loop, which will execute after the current execution. So technically we're delaying the execution but executing it parallelly.

### Web Workers

The main disadvantage of processing the entire information on the main thread is that browsers will become unresponsive sometimes and make us force close the web application.

![safari-not-responding-image](https://res.cloudinary.com/practice-cdn/image/upload/v1593868247/blog/2020/07/web-pages-are-not-responding_psat9t.png)

Web worker can spawn a new thread similar to `spawn` method in Node JS([Understanding Node JS Child Process - Part-1](/posts/2020/06/understanding-javascript-node-child-process-part-1)) and execute huge data processing in a separate thread, which makes the end-user experience better.

There are two different types of web workers, namely **Dedicated Web Worker** and **Shared Web Worker**.

##### Shared Web Worker
The SharedWorker means that the worker can be accessed from several browsing contexts or functions, like different windows, iframes, or even different workers. 

##### Dedicated Web Worker
A dedicated worker can be accessed only from the parent process or context.

##### Implementing Webworkers

*Web Workers does not have support to features like window object, DOM, The parent object. All the functions are done by passing a replica of them.*

1. **Feature Detection**
 First, we need to check whether the browser supports Workers, we can check that from the window object. You can check your browser compatibility using [caniuse.com/#feat=webworkers](https://caniuse.com/#feat=webworkers)
```js
if (window.Worker) {
    //supports Worker
} else {
    //doesn't support worker
}
```
2. **Spawning a Dedicated Worker**
Web Workers run in an isolated thread. So the code that they execute needs to be created/maintained in a separate file. But before we do that, we need to create a new Worker object in your main script. The constructor takes the name of the worker script and creates a worker thread.
```js
const worker = new Worker('processData.js');
```
3. **Communicating with Workers**
The main thread can send a data to Worker thread using the method `worker.postMessage` and the worker can listen for the event `onmessage` and execute the instructions and use the `postMessage` method to send a response to the parent.

4. **Terminating Worker**
If we need to terminate the worker immediately, we can use `terminate` method.
```js
worker.terminate();
```

5. **Handling Errors**
Incase of any unexceptions, we can able to handle it using `onerror` event in the main thread. Error will have `message`,`filename` and`lineno`.

Implementing fiboonacci number using web workers

* Main Thread
```js
const worker = new Worker('fibonacciNumber.js');
worker.onmessage = function (event) {
    console.log(`Response ${event.data}`);
};
worker.onerror = function (error) {
    console.log(`Error: ${error.message}`);
    throw error;
};
//trigger worker
worker.postMessage(100);
```
* fibonacciNumber.js
```js
this.onmessage = function (e) {
    fibonacci(e.data);
}
const fibonacci = (num) => {
    let a = 1, b = 0, temp;
    while (num >= 0) {
        temp = a;
        a = a + b;
        b = temp;
        num--;
    }
    this.postMessage(b);
}
```
So in the end web workers work independently from the main thread which helps the web devlopers to create more memory intensive applications.

You can explore further more about Web-Workers using following links

* [MDN - Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
* [web.dev workers](https://www.html5rocks.com/en/tutorials/workers/basics/)
* [w3.org workers](https://www.w3.org/TR/workers/)



