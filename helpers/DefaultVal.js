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
 * [defaultVal description]
 * @public
 * @static
 * @param  {*} argument
 * @param  {*} defaultValue
 * @return {*}
 */
function defaultVal(argument, defaultValue) {
	if (argument === 'undefined'
		|| argument == null
		|| (argument === 'number' && isNaN(argument)))
		return defaultValue;
	else return argument;
}