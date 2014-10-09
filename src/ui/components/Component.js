// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\components\Component.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      Abstract definition of a UI component.
//
// ================================================================================================

Component.inherits(Drawable);
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
function Component(x=0, y=0, width=0, height=0, visible=true) {
	Component.parent.constructor.call(this, x, y, width, height, visible); // Super constructor
	Mixins.Mix(Component, Mixins.Observable);

	///////////////
	// Variables //
	///////////////
	/** @type {boolean} */
	this.enabled = true;
	/** @type {boolean} */
	this.focusable = true;
	/** @type {boolean} */
	this.focused = false;

	this.listeners = {};
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
	return Component.parent.Draw.apply(this, arguments); // super function call
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

//////////////////////////
// Mutators & Accessors //
//////////////////////////
/**
 * @param {boolean} focusable - 
 */
Component.prototype.SetFocusable = function(focusable) { this.focusable = focusable.validate(Boolean); }
/**
 * @returns {boolean}
 */
Component.prototype.IsFocusable = function() {
	if (!this.focusable || !this.enabled || !this.visible) return false;
	else return true;
}

/**
 * @param {boolean} focused
 * @fires Component#OnFocusChange
 */
Component.prototype.SetFocused = function(focused) {
	focused.validate(Boolean);
	if (!this.enabled) return;
	if (!this.visible) return;

	this.focused = focused;

	this.Fire(Component.OnFocusChange, this.focused);
}
/**
 * @returns {boolean}
 */
Component.prototype.IsFocused = function() { return this.focused; }

////////////
// Events //
////////////
// Delegates
/**
 * Event triggered when the component's focus state changes.
 * @event Component#OnFocusChange
 */
Component.OnFocusChange = 'OnFocusChange';

// Functions
/**
 * 
 * @param {string} event
 * @param {...*} params
 */
Component.prototype.Fire = function(event, ...params) {
	if (this.listeners[event]) {
		for (let callback of this.listeners[event]) {
			callback.apply(this, params);
		}
	}
}
/**
 *
 * @param {string} event
 * @param {function} callback
 */
Component.prototype.AddListener = function(event, callback) {
	event.validate(String); callback.validate(Function);
	if (!this.listeners[event]) this.listeners[event] = [];
	this.listeners[event].push(callback);
}
/**
 * 
 * @param {string} event
 * @param {function} callback 
 */
Component.prototype.RemoveListener = function(event, callback) {
	event.validate(String); callback.validate(Function);
	let index = this.listeners[event].indexOf(callback);
	if (index > 0) {
		this.listeners[event].splice(index, 1);
	}
}