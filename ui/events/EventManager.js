// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\events\EventManager.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      
//
// ================================================================================================

/**
 * 
 * @class
 */
function EventManager() {
	var listeners = {};

	/**
	 * Returns whether or not a given variable is a valid Event
	 * @private
	 * @param  {*}  event
	 * @return {Boolean} True if the specified `event` has the type of Event; false otherwise.
	 */
	function isValidEvent(event) {
		return typeof event === Event;
	}

	return {
		/**
		 * Adds a callback function to listen for a given Event to be fired
		 * @static
		 * @memberOf EventManager
		 * @param {Event}   event 		The Event that will trigger the `callback` function
		 * @param {Function} callback 	The function to call when `event` is fired
		 */
		AddEventListener: function(event, callback) {
			if (isValidEvent(event)) {
				if (listeners[event] === 'undefined') listeners[event] = [];
				if (listeners[event].indexOf(callback) < 0) listeners[event].push(callback);
			}
			else console.warn("Attempted to add a listener for an invalid Event.");
		},
		/**
		 * Removes a previously added callback function that is listening to the given Event
		 * @static
		 * @memberOf EventManager
		 * @param {Event}   event 		The Event that the specified `callback` was listening to
		 * @param {function} callback 	The callback that was added to the specified `event`
		 */
		RemoveEventListener: function(event, callback) {
			if (isValidEvent(event)) {
				if (listeners[event] !== 'undefined') {
					var callbackIndex = listeners[event].indexOf(callback);
					if (callbackIndex >= 0) listeners[event].splice(callbackIndex, 1);
				}
			}
			else console.warn("Attempted to remove a listener for an invalid Event.");
		},
		/**
		 * Fires the specified Event
		 * @static
		 * @memberOf EventManager
		 * @param {Event} event
		 */
		Fire: function(event) {
			if (isValidEvent(event)) {
				for (callback in listeners[event]) {
					if (callback(arguments)) break;
				}
				if (listeners[event] !== 'undefined' &&
					listeners[event].length > 0) return true;
				else {
					console.warn("Attempted to fire an event with no valid listeners.");
					return false;
				}
			}
			else {
				console.warn("Attempted to fire an invalid Event.");
				return false;
			}
		}
	};
}