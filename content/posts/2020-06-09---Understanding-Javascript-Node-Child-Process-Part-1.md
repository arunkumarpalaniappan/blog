---
title: Understanding JavaScript - Node Child Process - Part 1
date: "2020-06-09T18:00:00+05:30"
template: "post"
draft: false
slug: "understanding-javascript-node-child-process-part-1"
category: "Node"
tags:
  - "Understanding JavaScript"
  - "Child Process"
  - "Node JS"
description: "Node JS runs on Single Thread. So the basic assumption is that Node can't handle more than huge API calls or huge data processing at a given point of time, this is a myth. Node JS allows us to take advantage of complete hardware for better performance, cluster"
socialImage: "/media/image-2.jpg"
---
Node JS runs on Single Thread. No matter how powerful the cloud instance or server may be, running on a single thread can only support a limited load. The fact that Node.js runs in a single thread does not mean that we cannot take advantage of multiple processes or cores in a hardware. Node JS allows us to take advantage of complete hardware for better performance, cluster module is an example for this usecase.

Using multiple processes is one of the best way to scale and maintain a large sacle application and scalabity is by default available in Node JS. One of the ways that we achieve this is by using `child_process` module.

#### Child Processes Module

`child_process` module allows us to create a new child processes in Node JS. Those child processes can easily communicate with each other using a built-in messaging system and we can use that so scale or even process huge data in our Node Application.

We can control or pass any input to a child process via stream and listen to its output stream. We can also control the arguments to be passed to the underlying script. We can also pipe the output of one process as the input to another (just like pipe command in Mac/Linux) as all inputs and outputs of these commands can be presented to Node JS as streams.

*The commands/examples I’ll be using in this article are all Linux-based.*

There are four different ways to create a child process in Node JS.
* `spawn()`
* `exec()`
* `execFile()`
* `fork()`

In this article we're going to see the differences between `spawn()` and `exec()` functions.

#### Spawing Child Process

`spawn` launches a command in a new process , for example

```
const { spawn } = require('child_process');
const childProcess = spawn('ls', ['-s', '-a', '-l']);
```
We can pass the arguments to the command executed by the spawn as array in the second argument to `spawn`.It returns a ChildProcess object. As ChildProcess inherits from EventEmitter.We can register custom handlers for events in the ChildProcess object.

For example,if we want an exit handler

```
childProcess.on('exit', code => {
  console.log(`Exit code is: ${code}`);
});
```
In addition to `exit` event, we have `disconnect`, `error`, `close` and `message` events.

`message` event allows the driver/parent process to communicate with the child process. This will be emitted when child process uses `process.send()` command.

Child processes have three standard IO streams available.
* stdin (writeable)
* stdout (readable)
* stderr (readable). 

These streams also inherited from EventEmitter. On readable streams there is data event emitted when a commands run inside a child process outputs something.

Since stdin of the main process is a readable stream, we can directly pipe it into the stdin of the child process, which is a writeable stream.

```
const { spawn } = require('child_process');
const childProcess = spawn('ls');
process.stdin.pipe(childProcess.stdin)
for await (const data of childProcess.stdout) {
  console.log(`Output :: ${data}`);
};
```
We can also pass the output of one child process as the input to the another child process, as these are handled as streams in Node JS.

```
const { spawn } = require('child_process');
const findProcess = spawn('find', ['.', '-type', 'f']);
const wordCountProcess = spawn('wc', ['-l']);
findProcess.stdout.pipe(wordCountProcess.stdin);
for await (const data of wordCountProcess.stdout) {
  console.log(`Files Count :: ${data}`);
};
```

We can specify a directory to use for the command being executed by spawn using cwd option and environment variables to the child process using env option. The child process doesnot have access to environment variables of parent/caller.

```
const childProcess = spawn('echo $MODE', {
  cwd: '/home/arun/Documents/bin',
  env: { MODE: 'production' }
});
```

#### exec() method

`spawn` doesn't create a shell to execute the command, but `exec` create a shell. So it is possible to specify the command to execute using the shell syntax. `exec` also buffers the command's entire output instead of using a stream.
```
const util = require('util');
const exec = util.promisify(require('child_process').exec);
async function main() {
  const { stdout, stderr } = await exec('find . -type f | wc -l');
  if (stderr) {
    console.error(`error: ${stderr}`);
  }
  console.log(`Number of files ${stdout}`);
}
main();
```
We can also force `spawn` to create and use a shell by specifying `shell: true` option.

Since the `exec` function uses a shell to execute the command, we can directly use the shell syntax or command in exec function, so we're making use of the shell pipe feature in the above snippet.

Also beaware that using the shell copmmand directly creates a security risk, if we’re executing any kind of dynamic input provided externally. A user can simply do a command injection attack using shell syntax.

The `exec` function buffers the output from the command and passes it to the callback function (the second argument to exec). This stdout argument is the command’s output that we can print.

Using `exec` function is a good choice if we need to directly use the shell syntax and if the size of the data smaller.

The `spawn` function is a much better choice when the size of the data is large, because that data will be streamed with the standard IO objects.

Thats all for now and we will be learning more about `execFile` anf `fork` method in the next article, Stay tuned!

References:
[https://nodejs.org/api/child_process.html](https://nodejs.org/api/child_process.html)
