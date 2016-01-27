/*
Q.js - a tiny jQuery-inspired library

The MIT License (MIT)

Copyright (c) 2016 Ian Jones

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


// Add some useful methods to all Elements

// Returns true if this element has class (name)
Element.prototype.hasClass = function(name) {
	return new RegExp("(?:^|\\s)" + name + "(?:\\s|$)").test(this.className);
}

// Removes class (name)
Element.prototype.removeClass = function(name) {
	this.className = this.className.replace(new RegExp(
		"(^|\\s)" + name + "(\\s|$)", "g"), "$1$2").replace(
		/(^\s|\s{2,}|\s$)/g, "");
}

// Adds class (name)
Element.prototype.addClass = function(name) {
	if (this.hasClass(name)) return;
	this.className = (this.className + " " + name).replace(
		/(^\s|\s{2,}|\s$)/g, "");
}

// Append elements or HTML strings
Element.prototype.append = function(node) {
	if (typeof node === 'string') { // HTML string
		var frag = document.createElement("div");
		frag.innerHTML = node;
		for (var x = 0, y = frag.children.length; x < y; ++ x) {
			this.appendChild(frag.children[x]);
		}
	} else { // Element(s)
		this.appendChild(node);
	}
}

// Provide a shorter alias for a built-in function
Document.prototype.q = function() {
	var result = Document.prototype.querySelectorAll.apply(this, arguments);
	if (result.length === 1) return result[0];
	return result;
}

// Makes it easy to perform an action on one or more elements
Element.prototype.do = function(method) {
	if (typeof method === 'string') { // Method
		this[method].apply(this, Array.prototype.slice.call(arguments, 1));
	} else { // Function
		method.apply(this, Array.prototype.slice.call(arguments, 1));
	}
}
HTMLCollection.prototype.do =
NodeList.prototype.do = function(method) {
	// Loop through elements and perform action on each one
	for (var i = this.length; i --; ) {
		this[i].do.apply(this[i], arguments);
	}
}