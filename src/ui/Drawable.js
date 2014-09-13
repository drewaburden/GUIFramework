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
 * @extends {Destroyable}
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @param {number} [width=0]
 * @param {number} [height=0]
 * @param {boolean} [visible=true]
 */
Drawable.inherits(Destroyable);
function Drawable(x=0, y=0, width=0, height=0, visible=false) {
	Drawable.parent.constructor.call(this); // Super constructor

	///////////////
	// Variables //
	///////////////
	/** @type {number} */
	this.x = Math.abs(x.validate(Number));
	/** @type {number} */
	this.y = Math.abs(y.validate(Number));
	/** @type {number} */
	this.width = Math.abs(width.validate(Number));
	/** @type {number} */
	this.height = Math.abs(height.validate(Number));
	/** @type {boolean} */ 
	this.visible = visible.validate(Boolean);
}

///////////////
// Functions //
///////////////
/**
 * Handles all the drawing to the canvas for this Drawable. Override in subclasses.
 * @abstract
 * @override
 * @param {CanvasRenderingContext2D} context
 */
Drawable.prototype.Draw = function(context) {
	context.validate(CanvasRenderingContext2D);
	if (!this.visible) return;
}