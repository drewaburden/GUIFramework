// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\components\DefaultVal.js
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
 * function SomeClass(mandatoryArg, optionalArg1, optionalArg2) {
 *     this.mandatoryArg = mandatoryArg;
 *     this.optionalArg1 = defaultVal(optionalArg1, true);
 *     this.optionalArg2 = defaultVal(optionalArg2, 37);
 * }
 * var someClass = new SomeClass(1, false);
 * console.log(someClass.mandatoryArg); // outputs 1
 * console.log(someClass.optionalArg1); // outputs false
 * console.log(someClass.optionalArg2); // outputs 37
 */
function defaultVal(argument, defaultValue) {
	if (typeof argument == 'undefined'
		|| argument == null
		|| (typeof argument == 'number' && isNaN(argument)))
		return defaultValue;
	else return argument;
}