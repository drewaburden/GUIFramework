// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\Drawable.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
// ================================================================================================

/**
 * Abstract definition of an object that can be drawn on the canvas.
 * @abstract
 * @class
 * @extends {UI.Destroyable}
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @param {number} [width=0]
 * @param {number} [height=0]
 * @param {boolean} [visible=true]
 */
UI.Drawable = function(x=0, y=0, width=0, height=0, visible=false) {
	UI.Drawable.parent.constructor.call(this); // Super constructor

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
}.inherits(UI.Destroyable);

///////////////
// Functions //
///////////////
/**
 * Handles all the drawing to the canvas for this {@link UI.Drawable}. Override in subclasses.
 * @abstract
 * @override
 * @param {CanvasRenderingContext2D} context
 * @returns {boolean} Whether or not derivative classes should continue drawing for this tick.
 */
UI.Drawable.prototype.Draw = function(context) {
	context.validate(CanvasRenderingContext2D);
	if (!this.visible) return false;

	return true;
}

//////////////////////////
// Mutators & Accessors //
//////////////////////////
/**
 * @param {number} x - New x-position for the {@link UI.Drawable}.
 */
UI.Drawable.prototype.SetX = function(x) { this.x = x.validate(Number); }
/**
 * @returns {number} This {@link UI.Drawable}'s current x-position.
 */
UI.Drawable.prototype.GetX = function() { return this.x; }
/**
 * @param {number} y - New y-position for the {@link UI.Drawable}.
 */
UI.Drawable.prototype.SetY = function(y) { this.y = y.validate(Number); }
/**
 * @returns {number} This {@link UI.Drawable}'s current y-position.
 */
UI.Drawable.prototype.GetY = function() { return this.y; }
/**
 * @param {number} width - New width for the {@link UI.Drawable}. Must be non-negative.
 */
UI.Drawable.prototype.SetWidth = function(width) { this.width = Math.abs(width.validate(Number)); }
/**
 * @returns {number} This {@link UI.Drawable}'s current width.
 */
UI.Drawable.prototype.GetWidth = function() { return this.width; }
/**
 * @param {number} height - New height for the {@link UI.Drawable}. Must be non-negative.
 */
UI.Drawable.prototype.SetHeight = function(height) { this.height = Math.abs(height.validate(Number)); }
/**
 * @returns {number} This {@link UI.Drawable}'s current height.
 */
UI.Drawable.prototype.GetHeight = function() { return this.height; }
/**
 * @param {boolean} visible - Set visibility state for the {@link UI.Drawable}.
 */
UI.Drawable.prototype.SetVisible = function(visible) { this.visible = visible.validate(Boolean); }
/**
 * @returns {boolean} This {@link UI.Drawable}'s current visibility state.
 */
UI.Drawable.prototype.IsVisible = function() { return this.visible; }