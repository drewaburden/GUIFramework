// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\mixins\Hoverable.js
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
Mixins.Hoverable = {
	///////////////
	// Variables //
	///////////////
	/** @type {boolean} */
	isOver: false,

	/////////////////////
	// Event delegates //
	/////////////////////
	/** Event functions called when the mixed class receives the OnMouseIn event from the GUIFramework.
	 * @type {function[]}
	 */
	onMouseIn: [],
	/** Event functions called when the mixed class receives the OnMouseOut event from the GUIFramework.
	 * @type {function[]}
	 */
	onMouseOut: [],

	///////////////
	// Functions //
	///////////////
	/**
	 * Receiver of the OnMouseIn event from the GUIFramework.
	 * This is called when GUIFramework determines that the mouse is intersecting with the bounds of
	 * component (prioritized by render order).
	 * @param {number} x
	 * @param {number} y
	 */
	OnMouseIn: function(x, y) {
		this.isOver = true;
		// Notify all listeners
		for (let listener of this.onMouseIn) {
			listener.validate(Function);
			listener(x, y);
		}
	},
	/**
	 * Receiver of the OnMouseOut event from the GUIFramework.
	 * This is called when GUIFramework determines that the mouse is has left the bounds of a
	 * component who previously had the OnMouseIn event triggered.
	 * @param {number} x
	 * @param {number} y
	 */
	OnMouseOut: function(x, y) {
		this.isOver = false;
		// Notify all listeners
		for (let listener of this.onMouseOut) {
			listener.validate(Function);
			listener();
		}
	}
};