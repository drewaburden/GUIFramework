// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\mixins\Mixins.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      
//
// ================================================================================================

/**
 * @namespace
 */
var Mixins = Mixins || {};

/**
 * [Mix description]
 * @param {object} receivingObject [description]
 * @param {...Mixins.Mixin} mixins          [description]
 */
Mixins.Mix = function(receivingObject, ...mixins) {
	// Make sure we can actually do the mixing with the given arguments
	if (mixins === undefined || mixins.length < 0 || receivingObject === undefined || receivingObject == null)
		throw new TypeError("Mixins.Mix(): One or more required arguments was undefined.");
	// For each specified mixin
	for (let mixin of mixins) {
		// For each property in the mixin
		for (let property in mixin) {
			// If the given object doesn't have one of the mixin's properties
			if (!Object.hasOwnProperty.call(receivingObject, property)) {
				// Deep copy arrays
				if (Array.isArray(mixin[property])) {
					receivingObject[property] = [];
					for (let value of mixin[property])
						receivingObject[property].push(value);
				}
				// Otherwise, just copy
				else receivingObject[property] = mixin[property];
				// Make sure the property got added
				if (receivingObject[property] === undefined) {
					throw new TypeError("Mixins.HasMixins(): One or more specified `mixins` were not of a valid " +
						"format to mix.");
				}
			}
		}
	}
}

/**
 * [HasMixins description]
 * @param {object} object [description]
 * @param {...Mixins.Mixin} mixins          [description]
 * @example
 * if (Mixins.HasMixins(someButton, Mixin.Hoverable, Mixin.Clickable)) {
 *     // someButton has both the Hoverable and Clickable mixins
 * }
 */
Mixins.HasMixins = function(object, ...mixins) {
	// Make sure we can actually check the mixins with the given arguments
	if (mixins === undefined || mixins.length < 0 || object === undefined || object == null)
		throw new TypeError("Mixins.HasMixins(): One or more required arguments were undefined.");
	// For each specified mixin
	for (let mixin of mixins) {
		// For each property in the mixin
		for (let property in mixin) {
			// Check if the given object contains all the mixin's properties
			if (object[property] === undefined) return false; // Doesn't have one of the mixins' properties
		}
	}
	return true; // If we made it this far, the object has all specified mixins
}