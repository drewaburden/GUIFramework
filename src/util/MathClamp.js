// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  util\MathClamp.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      Defines a helper method added to the built-in Math object that clamps number values
//      between specified min and max values.
//
// ================================================================================================

/**
 * The built-in Javascript Math object.
 * @external Math
 * @see {@link http://www.w3schools.com/js/js_math.asp Math}
 */

/**
 * Adds a new method to the built-in Javascript Math object that can be used to conveniently
 * clamp a number to a particular range.
 * @public
 * @static
 * @function external:Math.clamp
 * @param  {number} value
 * @param  {number} min
 * @param  {number} max
 * @returns {number} The `value` number clamped between the `min` and `max` values.
 * @example
 * Math.clamp(42, 1, 10); // returns 10
 */
Math.clamp = function(value, min, max) {
	if (value === undefined || min === undefined || max === undefined || 
		value.constructor !== Number || min.constructor !== Number || max.constructor !== Number
		|| isNaN(value) || isNaN(min) || isNaN(max)) {
		throw new TypeError("Math.clamp(): One or more arguments were either not specified, not numbers, " +
			"or out of the valid number range.");
	}
	if (min > max) throw new TypeError("Math.clamp(): The specified `min` was higher than the specified `max`.");

	return Math.min(Math.max(value, min), max);
}