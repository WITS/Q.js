# Overview
Q.js is a tiny JavaScript library that makes it easy to write more and do less, like jQuery, but without the bulk. If you're just looking to manipulate the DOM, this is the library for you.

# Features

## Class manipulation

All class manipulation can be done directly to DOM objects, like so

```js
// Get an element (in this case, the body)
var el = document.body;
// Add a class to it
el.addClass("foo");
```

There are several classes that can be used to modify classes

### addClass(String name)
Adds class `name` to the element its called on.

### removeClass(String name)
Removes class `name` from the element its called on.

### hasClass(String name)
Returns whether this element has class `name`.

### toggleClass(String name)
Toggles the class `name` on this element, and returns whether the element has the class (after toggling it).

For example:

```js
var el = document.body;
// Ensure that the element does not have class `foo`,
// for the sake of this example
el.removeClass("foo");
// Toggle the class `foo` and log what's returned
console.log("True, if el currently has class foo: %s", el.toggleClass("foo"));
// ^ Logs "True if el currently has class foo: true"
```

## Querying & Other Essentials

All elements, as well as documents and document fragments can be queried for elements.

> The result of the query will always be one of two things: an HTMLCollection or an Element. The result will be an Element if and only if the result has length 1. If you're unsure what the length of your query will be, just use `.do()` to perform actions on all of the results.

### q(String query)
Call the `q` method on any DOM node in order to query its contents with a CSS selector `query`.

### do(function callback)
Call the `do` method on any Element or Arraylike collection of elements in order to perform function `callback` on it/them.

For example:

```js
// For every element with class `foo`
document.q(".foo").do(function() {
    // Add class `bar`
    this.addClass("bar");
});
```

### do(String methodName[, Mixed argument0, Mixed argument1])
Call the `do` method on any Element or Arraylike collection of elements in order to perform `Element[methodName]` on them, with any following arguments being used as arguments to that method.

For example:

```js
// For every element with class `foo`, add class `bar`
document.q(".foo").do("addClass", "bar");
```
