// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\mixins\Observable.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      
//
// ================================================================================================

/**
 *
 * @mixin
 */
Mixins.Observable = {
	///////////////
	// Variables //
	///////////////
	listeners: {},

	///////////////
	// Functions //
	///////////////
	Fire: function(event, ...params) {
		if (listeners[event]) {
			for (let callback of listeners[event]) {
				callback.Apply(this, params);
			}
		}
	},

	AddListener: function(event, callback) {
		event.validate(String); callback.validate(Function);
		listeners[event].push(callback);
	},

	RemoveListener: function(event, callback) {
		event.validate(String); callback.validate(Function);
		let index = listeners[event].indexOf(callback);
		if (index > 0) {
			listeners[event].splice(index, 1);
		}
	}
};