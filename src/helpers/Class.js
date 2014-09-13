// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  helpers\Class.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      
//
// ================================================================================================

/**
 * Allows class inheritance. The calling class will inherit the specified parent class's
 * properties. This also adds a new property to the child class called parent. This lets
 * the child class access the parent's original properties; i.e., like the super keyword
 * in Java.
 * @public
 * @static
 * @param  {function} parent - The class that the calling class will inherit from.
 * @example
 * function ParentClass() {
 *     this.thing = "hello";
 * }
 * ChildClass.inherits(ParentClass);
 * function ChildClass() {
 *     ChildClass.parent.constructor.apply(this, arguments); // Call parent constructor
 * }
 * console.log((new ChildClass()).thing); // outputs "hello"
 */
Function.prototype.inherits = function(parent) {
	if (parent.constructor !== Function) throw new TypeError("inherits(): `parent` argument was not of type function.");
	let child = this;
	child.prototype = Object.create(parent.prototype);
	child.prototype.constructor = child;
	child.parent = parent.prototype;
}

/**
 * 
 * @public
 * @static
 * @param  {...*} types - The types the object is allowed to be
 * @return {this}
 * @example
 * function someClass(someBool) {
 *     this.someBoolean = someBool.validate(Boolean);
 * }
 * var obj1 = new someClass(true);
 * console.log(obj1.someBoolean) // outputs "true"
 * var obj2 = new someClass("hello"); // throws TypeError
 */
Object.prototype.validate = function(...types) {
	if (types.length == 0 || types.constructor === undefined)
		throw new TypeError("validate(): `types` argument(s) not specified correctly.");
	
	let passed = false;
	for (let type of types) {
		// Make sure they didn't pass the type as something like 'number' instead of Number
		if (type.constructor === String) throw new TypeError("validate(): One or more of the `types` arguments " +
			"was a string. Do not pass the type as a string. Instead, pass the actual class type; e.g., " +
			"numObj.validate(Number) instead of numObj.validate('number'), strObj.validate(String) instead of " +
			"strObj.validate('string'), etc.");
		// If the caller is of the specified type or is an instance of a class
		if (this.constructor === type
			|| (type.constructor === Function && this instanceof type)) {
			passed = true; break;
		}
	}

	if (passed) {
		// Returning "this" allows us to call this function during variable declarations
		// If "this" is a boolean, make sure we actualy return a boolean and not an object. Otherwise, things
		// like:
		// if (someBool) {}  or
		// if (!someBool) {}
		// would always return true, because an instantiated object isn't falsey.
		if (typeof this !== Boolean && this.constructor === Boolean) return !!this; // Cast to boolean
		else return this;
	}
	else throw new TypeError("validate(): The caller '" + this.name + "' failed to validate as " +
		types[0].name + " type.");
}