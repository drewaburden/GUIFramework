// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\mixins\Clickable.js
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
Mixins.Clickable = {
	///////////////
	// Variables //
	///////////////
	/** @type {boolean} */
	isDown: false,

	/////////////////////
	// Event delegates //
	/////////////////////
	/** Event functions called when the mixed class receives the OnMouseDown event from the GUIFramework.
	 * @type {function[]}
	 */
	onMouseDown: [],
	/** Event functions called when the mixed class receives the OnMouseUp event from the GUIFramework.
	 * @type {function[]}
	 */
	onMouseUp: [],

	///////////////
	// Functions //
	///////////////
	/**
	 * Receiver of the OnMouseDown event from the GUIFramework.
	 * This is called when GUIFramework determines that the mouse is clicked within the bounds of the
	 * component (prioritized by render order).
	 * @param {number} x
	 * @param {number} y
	 * @param {number} button - The mouse button that was pressed.
	 */
	OnMouseDown: function(x, y, button) {
		// If the left mouse button was clicked
		if (button == 0) {
			this.isDown = true;
			// Notify all listeners
			for (let listener of this.onMouseDown) {
				listener.validate(Function);
				listener(x, y, button);
			}
		}
	},
	/**
	 * Receiver of the OnMouseUp event from the GUIFramework.
	 * This is called when GUIFramework determines that a mouse button has been released.
	 * @param {number} x
	 * @param {number} y
	 */
	OnMouseUp: function(x, y, button) {
		// If the left mouse button was released and the click actually started on this component
		if (button == 0 && this.isDown) {
			this.isDown = false;
			// Notify all listeners
			for (let listener of this.onMouseUp) {
				listener.validate(Function);
				listener(x, y, button);
			}
		}
	}
};