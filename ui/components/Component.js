// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\components\Component.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      Abstract definition of a UI component.
//
// ================================================================================================

/**
 * 
 * @abstract
 * @class
 * @extends {Drawable}
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @param {number} [width=0]
 * @param {number} [height=0]
 * @param {boolean} [visible=true]
 *
 * @todo  events
 */
Component.inherits(Drawable);
function Component(x, y, width, height, visible) {
	var _super = Component.prototype._super; // Super shortcut
	_super.constructor.call(this, x, y, width, height, visible); // Super constructor

	/** @type {Boolean} */
	this.enabled = true;

	/**
	 * Unregister events.
	 */
	Component.prototype.Destroy = function() {
		// Unregister events
		
	}

	/**
	 * Handles all the drawing to the canvas for this Component. Override in subclasses.
	 * @abstract
	 * @param {CanvasRenderingContext2D} context
	 */
	Component.prototype.Draw = function(context) {
		_super.Draw.apply(this, arguments); // super function call
	}
}