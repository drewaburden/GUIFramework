// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  util\Include.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      
//
// ================================================================================================

///////////////
// Variables //
///////////////
Util.scriptRoot = './';
Util.included = [];
Util.loaded = [];

///////////////
// Functions //
///////////////
/**
 * A helper function to allow easy and clean inclusion of other Javascript files.
 * This is meant to make the framework more organized.
 * @public
 * @static
 * @param  {string} file - Path to .js file to include
 * @example
 * include('util/Class.js');
 */
Util.include = function(file) {
	if (file.constructor !== String || file == '')
		throw new TypeError("include(): `file` argument was not specified correctly.");
	// Make sure we aren't including something twice
	if (Util.included.indexOf(file) < 0) {
		// Add a script tag with the specified path to the .js file in the <head> block of the HTML file
		let script = document.createElement('script');
		script.src = Util.scriptRoot + file;
	    script.async = false;
	    script.type = 'application/javascript;version=1.7';
		document.getElementsByTagName('head').item(0).appendChild(script);
		Util.included.push(file);
		script.addEventListener('error', function() { 
			throw new Error("include(): The specified `file` was not found or could not be loaded.");
		}, true);
		script.onload = function() { 
			Util.loaded.push(file);
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
 * setScriptRoot('./util/');
 */
Util.setScriptRoot = function(path) {
	if (path.constructor !== String || path == '') throw new TypeError("setScriptRoot(): `path` argument was not specified correctly.");
	Util.scriptRoot = path;
}