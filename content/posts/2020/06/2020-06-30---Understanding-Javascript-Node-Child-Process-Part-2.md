---
title: Understanding JavaScript - Node Child Process - Part 2
date: "2020-06-30T13:00:00+05:30"
template: "post"
draft: false
slug: "understanding-javascript-node-child-process-part-2"
category: "Node"
tags:
  - "Understanding JavaScript"
  - "Child Process"
  - "Node JS"
description: "This is the second part of our series on Understanding Node JS Child Process. We will be seeing about execFile and fork method of child process in "
socialImage: "/media/image-2.jpg"
---
This is the second part of **Understanding JavaScript - Child Process** Series.

You can read the firt part using the below link

Part 1 of this blog available at - [Understanding JavaScript - Child Process - Part 1](understanding-javascript-node-child-process-part-1)

Using multiple processes is one of the best way to scale and maintain a large scale application in Node JS. One of the ways that we achieve this is by using `child_process` module.

#### Child Processes Module

`child_process` module allows us to create a new child processes in Node JS. Those child processes can easily communicate with each other using a built-in messaging system and we can use that so scale or even process huge data in our Node Application.

*The commands/examples I’ll be using in this article are all Linux-based.*

There are four different ways to create a child process in Node JS.
* `spawn()`
* `exec()`
* `execFile()`
* `fork()`

In this article we're going to see the differences between `execFile()` and `fork()` functions.

Part 1 of this article is available  [here](understanding-javascript-node-child-process-part-1), which explains `spawn` and `exec` methods in detail.

#### execFile

If we need to execute a file without using a shell mode,we need to use `execFile` method. This works exactly like the `exec` function, but does not use a shell, which makes it a bit more efficient.

We have some platform limitation on using `execFile` method, like in Windows, some files cannot be executed on their own, like .bat or .cmd files. Those files cannot be executed with `execFile`. We need to used either `exec` or `spawn` with shell set to true is required to execute them.

`execFile` method has four arguments.


`execFile(file[, args][, options][, callback])`
* *file* - Location of the file/Command - *Required *
* args - list of string arguments for the script  - *optional*
* options - options to execFile method like cwd,env,encoding,timeout,maxBuffer,killSignal,etc -* optional*
* callback function - *optional*

```js
const execFile = require('child_process').execFile;
const childProcess = execFile('node', ['--version'], (error, stdout, stderr) => {
    if (error) {
        console.error('stderr', stderr);
        throw error;
    }
    console.log('stdout', stdout);
});
```
`execFile` is used when we just need to execute an application and get the output. For example, we can use execFile to run an image-processing application to convert from one format to other and we only care if it succeeds or not. 

We should not use `execFile` when the application generates a large amount of data and we need to consume that data in real time.

#### fork

The `fork` method is a special case of `spawn` method and it is used specifically to spawn new Node.js processes. Like `spawn` a ChildProcess object is returned. The returned ChildProcess will have an **additional communication channel**(IPC) built-in that allows messages to be passed back and forth between the parent and child processes.

For example, 
* On the child process, process.on(‘message’) and process.send(‘to parent’) can be used to receive and send data.
* On the parent process, child.on(‘message’) and child.send(‘to child’) are used to process data from client and to send data to the client.

`fork` method has three arguments.
`execFile(modulePath[, args][, options])`
* *file* -Module to run in child process - *Required *
* args - list of string arguments for the script  - *optional*
* options - options to execFile method like cwd,env,encoding,timeout,maxBuffer,killSignal,etc -* optional*

```js
//parent.js
const childProcess = require('child_process');
const parentProcess = childProcess.fork(`${__dirname}/client.js`);
parentProcess.on('message', (message) => {
  console.log('PARENT got message from CHILD ::', message);
});
parentProcess.send({ hello: 'world' });
//sub.js
process.on('message', (message) => {
  console.log('CHILD got message from PARENT ::', message);
});
process.send({ from: 'client' });
```
Since Node's main process is single threaded, long-running tasks like computation will occupy the main process or block the event loop. As a result, incoming requests has to wait until the old process finishes the processing and so the application becomes unresponsive. Off-loading long-running tasks from the main process by forking a new Node process allows the application to serve incoming requests and process huge data without any blocking.

#### Synchronous Methods
The methids `spawn`, `exec`, and `execFile` from the `child_process` module also have synchronous blocking versions that will wait until the child process exits.
```js
const { 
  spawnSync, 
  execSync, 
  execFileSync,
} = require('child_process');
```
Those synchronous versions are potentially useful when trying to simplify scripting tasks or any startup processing tasks, but they should be avoided otherwise.

References:
[https://nodejs.org/api/child_process.html](https://nodejs.org/api/child_process.html)
