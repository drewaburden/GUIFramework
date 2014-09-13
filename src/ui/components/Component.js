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
 */
Component.inherits(Drawable);
function Component(x=0, y=0, width=0, height=0, visible=true) {
	Component.parent.constructor.call(this, x, y, width, height, visible); // Super constructor

	///////////////
	// Variables //
	///////////////
	/** @type {boolean} */
	this.enabled = true;
	/** @type {boolean} */
	this.focusable = true;
	/** @type {boolean} */
	this.focused = false;
}
///////////////
// Functions //
///////////////
/**
 * @override
 */
Component.prototype.Destroy = function() {
	Component.parent.Destroy.apply(this, arguments);
}
/**
 * Handles all the drawing to the canvas for this Component. Override in subclasses.
 * @abstract
 * @override
 * @param {CanvasRenderingContext2D} context
 */
Component.prototype.Draw = function(context) {
	Component.parent.Draw.apply(this, arguments); // super function call
}
/**
 * @abstract
 * @param {number} mouseX
 * @param {number} mouseY
 */
Component.prototype.MouseIntersects = function(mouseX, mouseY) {
	mouseX.validate(Number);
	mouseY.validate(Number);
	if (!this.visible) return false;

	if (mouseX >= this.x && mouseY >= this.y
		&& mouseX <= this.x+this.width && mouseY <= this.y+this.height)
		return true;
	else return false;
}
/**
 * @param {boolean} focused
 */
Component.prototype.SetFocused = function(focused) {
	focused.validate(Boolean);
	if (!this.enabled) return;
	if (!this.visible) return;
}
/**
 * 	 
 */
Component.prototype.IsFocusable = function() {
	if (!this.focusable || !this.enabled || !this.visible) return false;
	else return true;
}