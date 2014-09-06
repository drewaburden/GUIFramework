// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  helpers\Arguments.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      
//
// ================================================================================================

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
function optionalArg(argument, defaultValue) {
	if (typeof defaultValue == 'undefined') console.warn("optionalArg: defaultValue is undefined.")

	if (typeof argument == 'undefined'
		|| argument == null
		|| (typeof argument == 'number' && isNaN(argument)))
		return defaultValue;
	else return argument;
}

/**
 * A helper function to allow mandatory arguments to be specified for a function. If the given `argument`
 * is valid, the value of `argument` is returned. If `argument` is not valid (undefined), null is returned
 * and a console error is logged.
 * @public
 * @static
 * @param  {*} argument
 * @return {*}
 * @example
 * function SomeClass(mandatoryArg1) {
 *     this.mandatoryArg1 = mandatoryArg(mandatoryArg1);
 * }
 * var someClass = new SomeClass(); // Outputs error to console
 */
function mandatoryArg(argument) {
	if (typeof argument == 'undefined') {
		console.error("A mandatory argument was undefined.");
		return null;
	}
	else return argument;
}