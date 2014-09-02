// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\Drawable.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      Abstract definition of an object that can be drawn on the canvas.
//
// ================================================================================================

/**
 * 
 * @abstract
 * @class
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @param {number} [width=0]
 * @param {number} [height=0]
 * @param {boolean} [visible=true]
 */
function Drawable(x, y, width, height, visible) {
	this.x = defaultVal(x, 0);
	this.y = defaultVal(y, 0);
	this.width = defaultVal(width, 0);
	this.height = defaultVal(height, 0);
	this.visible = defaultVal(visible, true);

	/**
	 * Handles all the drawing to the canvas for this Drawable. Override in subclasses.
	 * @abstract
	 */
	Drawable.prototype.draw = function() {
		// Give a warning if the subclass didn't override the draw function
		console.log("Warning: Attempting to draw an abstract Drawable. " +
			"Did you forget to override the draw() function in your subclass?");
	}
}