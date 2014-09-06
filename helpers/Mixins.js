// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  helpers\Mixins.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      
//
// ================================================================================================

/**
 * 
 * @abstract
 * @class
 */
function Mixins() {}
/**
 * [Mix description]
 * @param {object} receivingObject [description]
 * @param {...object} mixins          [description]
 */
Mixins.Mix = function(receivingObject, mixins) {
	// Make sure we can actually do the mixing with the given arguments
	if (arguments.length < 2
		|| typeof receivingObject == 'undefined' || receivingObject == null) {
		console.error("Invalid arguments when attempting to mix objects.");
		return;
	}
	// For each specified mixin
	for (var mixinIndex = 1; mixinIndex < arguments.length; ++mixinIndex) {
		// For each property in the mixin
		var mixin = arguments[mixinIndex];
		for (property in mixin) {
			// If the given object doesn't have one of the mixin's properties
			if (!receivingObject[property]) {
				// Add the property it to the object.
				receivingObject.prototype[property] = mixin[property];
			}
		}
	}
}

/**
 * [HasMixins description]
 * @param {object} object [description]
 * @param {...object} mixins          [description]
 * @example
 * if (Mixins.HasMixins(someButton, Hoverable, Clickable)) {
 *     // someButton has both the Hoverable and Clickable mixins
 * }
 */
Mixins.HasMixins = function(object, mixins) {
	// Make sure we can actually check the mixins with the given arguments
	if (arguments.length < 2
		|| typeof object == 'undefined' || object == null) {
		console.error("Invalid arguments when attempting check presence of mixins.");
		return false;
	}
	// For each specified mixin
	for (var mixinIndex = 1; mixinIndex < arguments.length; ++mixinIndex) {
		// For each property in the mixin
		var mixin = arguments[mixinIndex];
		for (property in mixin) {
			// Check if the given object contains all the mixin's properties
			if (!object[property]) return false; // Doesn't have one of the mixins' properties
		}
	}
	return true; // If we made it this far, the object has all specified mixins
}