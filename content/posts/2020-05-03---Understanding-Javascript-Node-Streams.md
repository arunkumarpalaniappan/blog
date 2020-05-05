---
title: Understanding JavaScript - Node Streams
date: "2020-05-03T10:00:00+05:30"
template: "post"
draft: false
slug: "understanding-javascript-node-streams"
category: "Node"
tags:
  - "Understanding JavaScript"
  - "Streams"
  - "Node JS"
description: "Streams are collections of data like strings or objects or arrays. The main difference between streams and other format is that, streams need not to have all available data at once and doesn’t have to fit in memory. This"
socialImage: "/media/image-2.jpg"
---
Streams are collections of data like strings or objects or arrays. The main difference between streams and other format is that, streams need not to have all available data at once and doesn’t have to fit in memory. This makes streams really powerful when working with large amounts of data or processing multiple chunks of data.But streams are not only limited to work with huge amount of data. They also give us the power of composability in our code. 

Once [Dominic Tarr](https://dominictarr.com/) said,

> Streams are Node's best and most misunderstood idea.

and that is completely true. Once we understand Streams, its extremely easy for us to work with data in Node.

Streams are not a unique to Node.js. They were introduced in the Unix operating system decades ago and if you have already used pipe(|) in your shell, Congratulations! You have already used Streams. If we want to count all the occurrence of the word `server` in current directory, we will use `grep` with `wc` in unix, for example
```sh
grep server * | wc -l
```
We're passing the value from `grep` to `wc`, If we want to do the same in Node.
```js
const grep = ... // A stream for the grep output
const wc = ...   // A stream for the wc input
grep.pipe(wc)
```

### pipe()
The above example has the line `grep.pipe(wc)`: the `pipe()` method is called on the file stream.Similar to pipe symbol in unix, this method takes the data from source and pipes it into a destination.

We can also combine more than one `pipe()` method.
```js
src.pipe(dest1).pipe(dest2)
```
This is the same
```js
src.pipe(dest1)
dest1.pipe(dest2)
```

### Readable and Writable Streams
```js
source.pipe(destination)
```
In the above example. we have 2 streams called `source`, `destination`, Where `source` is a Readable Stream and `destination` is a writable stream.

**Readable**: A stream that we can pipe from, but not pipe into (we can receive data, but not send data). When we push data into a readable stream, it is buffered, until a consumer starts to read the data.

**Writable**: A stream that we can pipe into, but not pipe from (we can send data, but not receive from it)

**Duplex**: A stream that we can both pipe into and pipe from, basically a combination of a Readable and Writable stream

**Transform**: a Transform stream is similar to a Duplex, but the output is a transform of its input.

|Readble Streams|Writable Streams|
|---------------|----------------|
|process.stdin|process.stdout, process.stderr|
|fs.read streams|fs.write streams|
|HTTP Response| HTTP  Request|



### Real-World Example

That's about basic introduction into Node JS Streams, In the following example, we will be exploring the difference streams can make in code when it comes to memory consumption on huge amount of data.

First, we will create a bug file, using
```js
const fs = require("fs");
const file = fs.createWriteStream("./huge.data");
for (let i = 0; i <= 1e6; i++) {
  file.write(
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n"
  );
}
file.end();
```
The `fs` module can be used to read from and write to files using a stream interface. In the above example, we’re writing nearly 1 million lines to a test file using writable stream from `fs` stream.

Running the script above generates a file that’s about ~450 MB.

Now, we will create a HTTP Server and serve this file as a part of response to an API call, without streams.

```js
const fs = require("fs");
const server = require("http").createServer();
server.on("request", (req, res) => {
  fs.readFile("./huge.data", (err, data) => {
    if (err) throw err;

    res.end(data);
  });
});
server.listen(8080);
```
When the server gets a request, it’ll serve the big file using the asynchronous method, `fs.readFile`. Most importantly we’re not blocking the event loop.

If we run the server, it started out with a normal amount of memory, **6.4 MB**, But after we made a request to the server, Memory Usage jumped over **430 MB**.

We basically put the whole file content in memory before we wrote it out to the response object. This is very inefficient. The HTTP response object (res in the code above) is also a writable stream. 

```js
const fs = require("fs");
const server = require("http").createServer();
server.on("request", (req, res) => {
  const src = fs.createReadStream("./huge.data");
  src.pipe(res);
});
server.listen(8080);
```
This time, server consumed around **16 MB** to serve the whole **450 MB** file in the response.

When a client asks for that huge file, we stream it one chunk at a time, which means we don’t buffer it in memory at all.

This is just a basic introduction about Streams in Node JS, the complete list of API's on Node JS Streams is available at [https://nodejs.org/api/stream.html](https://nodejs.org/api/stream.html) and you can continue learning more about streams at [https://developer.mozilla.org/en-US/docs/Web/API/Streams_API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API).

We will explore more about child process in our next post, Stay tuned!