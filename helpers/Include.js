// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  helpers\Include.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      
//
// ================================================================================================

/**
 * A helper function to allow easy and clean inclusion of other Javascript files.
 * This is meant to make the framework more organized.
 * @public
 * @static
 * @param  {string} file - Path to .js file to include
 * @example
 * include('helpers/DefaultVal.js');
 */
var included = new Array();
function include(file) {
	if (typeof file == 'undefined') {
		console.error("include: file argument was undefined.");
		return;
	}
	// Make sure we aren't including something twice
	if (included.indexOf(file) < 0) {
		// Add a script tag with the specified path to the .js file in the <head> block of the HTML file
		var script = document.createElement('script');
		script.src = file;
	    script.defer = true;
		document.getElementsByTagName('head').item(0).appendChild(script);
		included.push(file);
	}
	else console.warn("Tried to include a file more than once.");
}