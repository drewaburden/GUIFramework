// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  helpers\Class.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      
//
// ================================================================================================

var Class = {};
Class.inherits = function(child, parent) {
	function derivedClass() { this.constructor = child; }
	derivedClass.prototype = parent;
	return new derivedClass();
}