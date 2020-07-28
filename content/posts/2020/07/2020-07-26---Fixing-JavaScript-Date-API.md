---
title: Fixing JavaScript Date API with Temporal
date: "2020-07-26T11:30:00+05:30"
template: "post"
draft: false
slug: "fixing-javascript-date-api-with-temporal"
category: "JavaScript"
tags:
  - "ECMA Proposal"
  - "Date API"
  - "Temporal"
description: "JavaScript Date API is broken since its inception. JavaScript is the language with combination of both good and bad decisions. One of such bad decision and implemention is Date API, we cannot fix the existing Date API without breaking more than half of the internet"
socialImage: "/media/image-2.jpg"
---
JavaScript Date API is broken since its inception. JavaScript is the language with combination of both good and bad decisions. One of such bad decision and implemention is Date API, we cannot fix the existing Date API without breaking more than half of the internet.

JavaScript `Date` API is based on ```java.util.Date```, which was deprecated in 1997 due to being a terrible and unusable API,later it was replaced with a better Date API. Most of us are heisitant to use JavaScript Date API and look for external date libraries like `moment.js`

Sadly, being a default language of browser and not able to handle date and time to its full extent is not a good thing for developers and also for JavaScript.

### Issues with JavaScript Date API
There are a lots of issues with Date API but the most important things are
* No support for time zones other than the user’s local time and UTC
* Date Parser behavior is unreliable and unusable
* Date object is mutable
* Date Computation APIs are not stable

### Fixing JavaScript Date API

Starting a few years ago, a proposal has been in development to add a new globally available Date object to JavaScript, **Temporal**. **Temporal** is a robust and modern API for working with dates, times, and timestamps, and also makes it easy to do things that were hard or impossible with Date, like converting dates between time zones, adding and subtracting while accounting for daylight saving time, working with date-only or time-only data.


### Trying Temporal

* All Temporal APIs will be already loaded in all major browsers, we can try it out just by using console.

* A polyfill for the Temporal API on npm. we can use it in your project with ```npm install --save proposal-temporal``` and import it using ```const { Temporal } = require('proposal-temporal');```.

*A word of caution! This polyfill is not yet ready for production applications! The proposal is still at Stage 2, and the polyfill has an 0.x version, so that should make it clear that the API is subject to change.*

NPM Polyfill -  [proposal-temporal](https://www.npmjs.com/package/proposal-temporal)

### Exploring Temporal API

* How to get the current date and time in the local time zone?

```js
const date = Temporal.now.date(); // Gets the current date
date.toString(); // returns the date in ISO 8601 date format
Temporal.now.dateTime().toString(); // date and time in ISO 8601 format
```
If we just want the date and not the time, we can use `Temporal.Date` and if we want both time and date, we can use `Temporal.DateTime`.

* How to get current time in Unix timestamp?

```js
const timeStamp = Temporal.now.absolute();
timeStamp.getEpochMilliseconds(); // Timestamp in Milliseconds
timeStamp.getEpochSeconds(); // Timestamp in Seconds
```

### Providing Feedback

* A short survey is available to collect the feedback from JavaScript Community on Temporal API, you can provide feedback using this [link](https://docs.google.com/forms/d/e/1FAIpQLSeYdvnDZZS6tKn18jiomfN7u_rq-_-_BqOevTzAcfgE3J4kHA/viewform).
* If you face any issues, you can also raise it [here](https://github.com/tc39/proposal-temporal/issues).

Further Reading: 
* [Temporal Documentation](https://tc39.es/proposal-temporal/docs/index.html)
* [Temporal Cookbook](https://tc39.es/proposal-temporal/docs/cookbook.html)
