// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\Drawable.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
// ================================================================================================

Drawable.inherits(Destroyable);
/**
 * Abstract definition of an object that can be drawn on the canvas.
 * @abstract
 * @class
 * @extends {Destroyable}
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @param {number} [width=0]
 * @param {number} [height=0]
 * @param {boolean} [visible=true]
 */
function Drawable(x=0, y=0, width=0, height=0, visible=false) {
	Drawable.parent.constructor.call(this); // Super constructor

	///////////////
	// Variables //
	///////////////
	this.x;
	this.y;
	this.width;
	this.height;
	this.visible;

	////////////////////
	// Initialization //
	////////////////////
	this.SetX(x);
	this.SetY(y);
	this.SetWidth(width);
	this.SetHeight(height);
	this.SetVisible(visible);
}

///////////////
// Functions //
///////////////
/**
 * Handles all the drawing to the canvas for this Drawable. Override in subclasses.
 * @abstract
 * @override
 * @param {CanvasRenderingContext2D} context
 * @returns {boolean} Whether or not to continue drawing this component.
 */
Drawable.prototype.Draw = function(context) {
	context.validate(CanvasRenderingContext2D);
	if (!this.visible) return false;

	return true;
}

//////////////////////////
// Mutators & Accessors //
//////////////////////////
/**
 * @param {number} x - New x-position for the Drawable.
 */
Drawable.prototype.SetX = function(x) { this.x = x.validate(Number); }
/**
 * @returns {number} This Drawable's current x-position.
 */
Drawable.prototype.GetX = function() { return this.x; }
/**
 * @param {number} y - New y-position for the Drawable.
 */
Drawable.prototype.SetY = function(y) { this.y = y.validate(Number); }
/**
 * @returns {number} This Drawable's current y-position.
 */
Drawable.prototype.GetY = function() { return this.y; }
/**
 * @param {number} width - New width for the Drawable. Must be non-negative.
 */
Drawable.prototype.SetWidth = function(width) { this.width = Math.abs(width.validate(Number)); }
/**
 * @returns {number} This Drawable's current width.
 */
Drawable.prototype.GetWidth = function() { return this.width; }
/**
 * @param {number} height - New height for the Drawable. Must be non-negative.
 */
Drawable.prototype.SetHeight = function(height) { this.height = Math.abs(height.validate(Number)); }
/**
 * @returns {number} This Drawable's current height.
 */
Drawable.prototype.GetHeight = function() { return this.height; }
/**
 * @param {boolean} visible - Set visibility state for the Drawable.
 */
Drawable.prototype.SetVisible = function(visible) { this.visible = visible.validate(Boolean); }
/**
 * @returns {boolean} This Drawable's current visibility state.
 */
Drawable.prototype.IsVisible = function() { return this.visible; }