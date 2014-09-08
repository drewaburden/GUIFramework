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
function Drawable(x, y, width, height, visible) {
	var _super = Drawable.prototype._super; // Super shortcut
	_super.constructor.call(this); // Super constructor

	this.x = optionalArg(x, 0).validate(Number);
	this.y = optionalArg(y, 0).validate(Number);
	this.width = optionalArg(width, 0).validate(Number);
	this.height = optionalArg(height, 0).validate(Number);
	this.visible = optionalArg(visible, true).validate(Boolean);

	/**
	 * Handles all the drawing to the canvas for this Drawable. Override in subclasses.
	 * @abstract
	 * @param {CanvasRenderingContext2D} context
	 */
	Drawable.prototype.Draw = function(context) {
		if (!(context instanceof CanvasRenderingContext2D))
			throw new TypeError("Draw(): `context` argument was not of type CanvasRenderingContext2D.");
		if (!this.visible) return;
	}
}