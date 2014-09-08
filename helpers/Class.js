// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  helpers\Class.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      
//
// ================================================================================================

Function.prototype.inherits = function(parent) {
	if (typeof parent != 'function') throw new TypeError("inherits(): `parent` argument was not of type function.");
	var child = this;
	child.prototype = Object.create(parent.prototype);
	child.prototype.constructor = child;
	child.prototype._super = parent.prototype;
}

/**
 * A helper function to allow default arguments to be set for a function. If the given `argument`
 * is valid, the value of `argument` is returned. If `argument` is not valid (undefined, null, NaN),
 * the value of `defaultValue` is returned.
 * @public
 * @static
 * @param  {*} argument
 * @param  {*} defaultValue
 * @return {*}
 * @example
 * function SomeClass(mandatoryArg1, optionalArg1, optionalArg2) {
 *     this.mandatoryArg1 = mandatoryArg(mandatoryArg1);
 *     this.optionalArg1 = optionalArg(optionalArg1, true);
 *     this.optionalArg2 = optionalArg(optionalArg2, 37);
 * }
 * var someClass = new SomeClass(4, false);
 * console.log(someClass.mandatoryArg1); // outputs 4
 * console.log(someClass.optionalArg1); // outputs false
 * console.log(someClass.optionalArg2); // outputs 37
 */
Object.prototype.validate = function(type) {
	if (type === undefined || type.constructor === String)
		throw new TypeError("validate(): `type` argument was not specified correctly. " + 
			"If you specified a type, do not pass it as a string. Instead, pass the actual class type;" + 
			" e.g., numObj.validate(Number);, strObj.validate(String);, imgObj.validate(Image);, etc.");
	// If the caller is not of the specified type and it's not an instance of a class
	if (this.constructor !== type && !(this instanceof type)) {
		throw new TypeError("validate(): The calling object failed to validate as the specified `type`.");
	}
	return this;
}