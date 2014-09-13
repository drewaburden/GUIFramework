// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  helpers\Include.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      
//
// ================================================================================================

var scriptRoot = './';
var included = [];
var loaded = [];

/**
 * A helper function to allow easy and clean inclusion of other Javascript files.
 * This is meant to make the framework more organized.
 * @public
 * @static
 * @param  {string} file - Path to .js file to include
 * @example
 * include('helpers/Arguments.js');
 */
function include(file) {
	if (file.constructor !== String || file == '')
		throw new TypeError("include(): `file` argument was not specified correctly.");
	// Make sure we aren't including something twice
	if (included.indexOf(file) < 0) {
		// Add a script tag with the specified path to the .js file in the <head> block of the HTML file
		let script = document.createElement('script');
		script.src = scriptRoot + file;
	    script.async = false;
	    script.type = 'application/javascript;version=1.7';
		document.getElementsByTagName('head').item(0).appendChild(script);
		included.push(file);
		script.addEventListener('error', function() { 
			throw new Error("include(): The specified `file` was not found or could not be loaded.");
		}, true);
		script.onload = function() { 
			loaded.push(file);
		};
	}
}

/**
 * A helper function to allow easy and clean inclusion of other Javascript files.
 * This is meant to make the framework more organized.
 * @public
 * @static
 * @param  {string} path - Path to root of your scripts. Will be prepended to any
 *                         scripts that are loaded.
 * @example
 * include('helpers/Arguments.js');
 */
function setScriptRoot(path) {
	if (path.constructor !== String || path == '') throw new TypeError("setScriptRoot(): `path` argument was not specified correctly.");
	scriptRoot = path;
}