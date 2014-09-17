// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\mixins\Typeable.js
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
Mixins.Typeable = {
	///////////////
	// Variables //
	///////////////
	/** @type {boolean} */
	isKeyDown: false,
	/** @type {boolean} */
	catchTab: false,
	/** @type {boolean} */
	catchEnter: false,

	/////////////////////
	// Event delegates //
	/////////////////////
	/** Event functions called when the mixed class receives the onKeyDown event from the GUIFramework.
	 * @type {function[]}
	 */
	onKeyDown: [],
	/** Event functions called when the mixed class receives the onKeyUp event from the GUIFramework.
	 * @type {function[]}
	 */
	onKeyUp: [],
	/** Event functions called when the mixed class receives the onKeyUp event from the GUIFramework.
	 * @type {function[]}
	 */
	onKeyPress: [],

	///////////////
	// Functions //
	///////////////
	/**
	 * Receiver of the onKeyDown event from the GUIFramework.
	 * This is called when GUIFramework determines that the mouse is clicked within the bounds of the
	 * component (prioritized by render order).
	 * @param {number} x
	 * @param {number} y
	 * @param {number} button - The mouse button that was pressed.
	 */
	OnKeyDown: function(key, shift, alt, ctrl) {
		this.isKeyDown = true;
		// Notify all listeners
		for (let listener of this.onKeyDown) {
			listener.validate(Function);
			listener(key, shift, alt, ctrl);
		}
	},
	/**
	 * Receiver of the onKeyUp event from the GUIFramework.
	 * This is called when GUIFramework determines that a mouse button has been released.
	 * @param {number} x
	 * @param {number} y
	 */
	OnKeyUp: function(key, shift, alt, ctrl) {
		// If the left mouse button was released and the click actually started on this component
		if (this.isKeyDown) {
			this.isKeyDown = false;
			// Notify all listeners
			for (let listener of this.onKeyUp) {
				listener.validate(Function);
				listener(key, shift, alt, ctrl);
			}
		}
	},
	/**
	 * Receiver of the onKeyUp event from the GUIFramework.
	 * This is called when GUIFramework determines that a mouse button has been released.
	 * @param {number} x
	 * @param {number} y
	 */
	OnKeyPress: function(key) {
		// If the left mouse button was released and the click actually started on this component
		if (this.isKeyDown) {
			this.isKeyDown = false;
			// Notify all listeners
			for (let listener of this.onKeyPress) {
				listener.validate(Function);
				listener(key);
			}
		}
	}
};