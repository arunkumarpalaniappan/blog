---
title: Understanding JavaScript - Require Module
date: "2020-04-25T10:00:00+05:30"
template: "post"
draft: false
slug: "understanding-javascript-require-module"
category: "Node"
tags:
  - "Understanding JavaScript"
  - "Require"
  - "Node JS"
description: "Modularity is a first class concept in Node JS. There are two core modules involved in modularity, the require function, which is available on the global object, but each module gets its own require function, and "
socialImage: "/media/image-2.jpg"
---
Modularity is a first class concept in Node JS and fully understanding how it works will help us to use it to our advanatage. 

There are two core modules involved in Node JS Modularity, 
* The `require` function, which is available on the `global object`, but each module gets its own require function
* The Module module, also available on the global object and this module used to manage all the modules we require with the require function. 

We will require a module using `require` keyword, for example

```js
const someModule = require("something");
```
 
Requiring a module in node is a very simple concept.

Each time, when the require is being called/used, NodeJS goes through the following  steps: 
* Resolving -  to find the absolute file path of a module
* Loading - the content of the file at the resolved path
* Wrapping - every module in it's private scope which makes require local to every module
* Evaluating - what the VM eventually does with the code
* Caching - so that when we require this module again, we don't go over all the steps again
 
### Module Object

I'm using Node JS version 14.0.0, during creating this article. Module API may change depend based on your local node version but underlying principle will remain the same.

```js
// console.log(module)
{
  id: '.',
  path: '/home/arun/Documents/Arun/authentication/',
  exports: {},
  parent: null,
  filename: '/home/arun/Documents/Arun/authentication/sample.js',
  loaded: false,
  children: [],
  paths: [
    '/home/arun/Documents/Arun/authentication/node_modules',
    '/home/arun/Documents/Arun/node_modules',
    '/home/arun/Documents/node_modules',
    '/home/arun/node_modules',
    '/home/node_modules',
    '/node_modules',
    '/home/arun/.node_modules',
    '/home/arun/.node_libraries',
    '/home/arun/.nvm/versions/node/v14.0.0/lib/node'
  ]
}
```
Each and every time we are using require, the module it will have an `id` to identify it. The full path to the module file is usually used here, except for this root module, a `.` is used instead. 

The path to the filename can be accessed with the `path` property. 

Node Modules have a one-to-one relation with files on the file-system. We require a module by loading the content of a file into memory. However before we can load the content of a file into the memory, we need to find the location of a file.

```js
const findMyModule = require("find-me");
```

For example, if we require a `find-me` module from the index module, Node will look for find-me. js in the paths mentioned inside `paths` property from module object.

Which start from the current directory and go up all the way to the root directory.

If it can't find find-me. js in any of these paths, it will throw a `cannot find module error`. 

To be exact, Node will actually look for the find-me. js in more folders, but those are supported for mostly historic reasons and using them is no longer recommended.

But core node modules like `fs`, `utils`, etc.., are an exception. The resolve step returns immediately for core modules. 

Let's see how Node actually resolve a non-core module. So the first path it will look into is the `node_modules` directory under the current directory.

Now We will create one file manually and call it as a find-me.js. 

Now let's also add a `console.log` statement in this new file to identify it and we will do the same for `index.js`. When we now execute the index file, node will find a path to `find-me.js` and it will load it from local node_modules folder.
```js
//node_modules/find-me.js
console.log("from Find Me");
//index.js
console.log("index.js")
require("fine-me");
```
So the output will be like this
```js
//index.js
//from Find Me
```
If we want to only resolve the module and not execute it, we can use `require.resolve` method. This behaves exactly the same as require, but does not load the file. It will still throw an error if the file does not exist. 

This can be used to check whether an optional package is installed or not. 

If we have an another find-me.js file in any of the other paths, for example, if we have a node module's directory under the home directory and if we have a differnet find-me.js file in there and execute the current `index.js` file, the module new route node_modules directory or under home directory will not be loaded, because node already resolved `find-me.js` to the local file found under the local node_modules directly. 

But if remove the local file and execute again, Node will actually just pick the next closest find-me. js and that would be the one under the home directory node_modules directory. 

Modules don't have to be files. 

We can also create a find-me folder under node_modules and place an `index.js` file in there and we will a `console.log` line here also to identify it. And now when we execute `node index.js`, it will actually load the index file under node_modules.

`index.js` is the default fileName, but we can control what fileName to start with under the folder using the main property in `package.json`. For example, to make the `require('find-me')` line resolve to this `start.js` file instead of `index.js`, we just need to add this `package.json` file, which says when the find-me folder gets required, `start.js` is the file that should be loaded. 

Other than resolving modules from within the `node_modules` folder, we can also place the module anywhere we want and require it with either relative paths,`. /` and `.. /`, or with absolute paths, starting with `/`.

For example, `find-me` was under a `lib` folder instead of a `node_modules` folder, we can still require it this way. 
```js
require("./lib/find-me");
```
The `id` for the find-me module is it's full path. We will also see that our main `index.js` module is now listed as the parent of our find-me module. However, the find-me module was not listed as a child of the index module instead, we have this Circular reference, because current module has parent and parent has reference to current file and it goes without any end.

If Node prints the find-me module object here, it will go into an infinite loop.

To understand it better, let's first understand a few other concepts on the module object. First, let's talk about `exports`. In any module, `exports` is a special object. 

Anything we put on the exports object we will see inside `module.exports` property in module object.

What happens when `module1` requires `module2`, and `module2` requires `module1`?

So ideally we have a circular reference. 

Node will partially load content from `module1` here. At this point of the lifecycle of `module2`, the `module1` module is not ready yet, but Node was able to share a partial exports object from `module1` to `module2`. 

So, Node JS by default will handle the circular dependency.

We can also define and require JSON files and C++ Addon files with the node require function, without any additional configuration. The first thing Node will try to resolve is a `.js` file. If it can't find a `.js` file, it will try a `.json` file and it will parse the file if found as a JSON text file. After that, it will try to find a binary `.node` file. 

We can see the available methods using `console.log(require)`

```js
//console.log(require)
[Function: require] {
  resolve: [Function: resolve] { paths: [Function: paths] },
  main: undefined,
  extensions: [Object: null prototype] {
    '.js': [Function (anonymous)],
    '.json': [Function (anonymous)],
    '.node': [Function (anonymous)]
  },
  cache: [Object: null prototype] {}
}
```
We can see the supported extensions in `require` module are `.js`, `.json` and `.node`.

You can go through the following references, if you like to do a deep dive on require module working in JavaScript. 

References:

* [https://nodejs.org/en/knowledge/getting-started/what-is-require/](https://nodejs.org/en/knowledge/getting-started/what-is-require/)
* [https://michelenasti.com/2018/10/02/let-s-write-a-simple-version-of-the-require-function.html](https://michelenasti.com/2018/10/02/let-s-write-a-simple-version-of-the-require-function.html)
* [https://www.freecodecamp.org/news/requiring-modules-in-node-js-everything-you-need-to-know-e7fbd119be8/](https://www.freecodecamp.org/news/requiring-modules-in-node-js-everything-you-need-to-know-e7fbd119be8/)