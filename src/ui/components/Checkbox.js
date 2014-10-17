// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\components\Checkbox.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      
//
// ================================================================================================

/**
 * 
 * @class
 * @extends {UI.Component}
 * @param {string} [text=""]
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @param {number} [width=0]
 * @param {number} [height=0]
 * @param {boolean} [checked=true]
 * @param {boolean} [visible=true]
 * @example
 * var checkbox = new UI.Checkbox("text", 5, 5, 150, 50, true, true);
 */
UI.Checkbox = function(text="", x=0, y=0, width=0, height=0, checked=true, visible=true) {
	UI.Checkbox.parent.constructor.call(this, x, y, width, height, visible); // Super constructor	

	///////////////
	// Variables //
	///////////////
	this.text = text.validate(String);
	this.checked = checked.validate(Boolean);
	this.unchecked_normal = new UI.Image("assets/checkbox/unchecked_normal.png", this.x, this.y);
	this.unchecked_hover = new UI.Image("assets/checkbox/unchecked_hover.png", this.x, this.y);
	this.unchecked_down_normal = new UI.Image("assets/checkbox/unchecked_down_normal.png", this.x, this.y);
	this.unchecked_down_hover = new UI.Image("assets/checkbox/unchecked_down_hover.png", this.x, this.y);
	this.checked_normal = new UI.Image("assets/checkbox/checked_normal.png", this.x, this.y);
	this.checked_hover = new UI.Image("assets/checkbox/checked_hover.png", this.x, this.y);
	this.checked_down_normal = new UI.Image("assets/checkbox/checked_down_normal.png", this.x, this.y);
	this.checked_down_hover = new UI.Image("assets/checkbox/checked_down_hover.png", this.x, this.y);
	this.image = (this.checked) ? (this.checked_normal) : (this.unchecked_normal);
	this.labelStyle_normal = '#B1E77D';
	this.labelStyle_hover = '#D5F3B7';
	this.labelStyle_down = '#B1E77D';
	this.labelStyle_down_hover = '#D5F3B7';
	var textPadding_left = 30;
    this.label = new UI.Label(this.text, this.x+textPadding_left, this.y+this.height/2,
    	this.width-textPadding_left, this.height, this.labelStyle_normal, "normal 12px Share Tech Mono",
    	TextHAlign.LEFT, TextVAlign.MIDDLE, true);
}.inherits(UI.Component);

///////////////
// Functions //
///////////////
/**
 * Handles all the drawing to the canvas for this object.
 * @override
 * @param {CanvasRenderingContext2D} context
 */
UI.Checkbox.prototype.Draw = function(context) {
	let keepDrawing = UI.Checkbox.parent.Draw.apply(this, arguments); // super function call
	if (!keepDrawing || this.width <= 0 || this.height <= 0) return false;

	this.image.Draw(context);
	this.label.Draw(context);

	return true;
}
/**
 * @returns {boolean}
 */
UI.Checkbox.prototype.IsChecked = function(checked) { return this.checked; }
/**
 * Sets the checked state of the {@link UI.Checkbox} to the specified boolean value.
 * @param {boolean} checked
 * @fires UI.Checkbox.CheckedChanged
 */
UI.Checkbox.prototype.SetChecked = function(checked) {
	checked.validate(Boolean);
	this.checked = checked;
	if (this.IsChecked()) {
		if (this.IsMouseOver()) this.image = this.checked_hover;
		else this.image = this.checked_normal;
	}
	else {
		if (this.IsMouseOver()) this.image = this.unchecked_hover;
		else this.image = this.unchecked_normal;
	}
	this.DispatchEvent(new UI.Checkbox.CheckedChanged(this.IsChecked()));
}
/**
 * Toggles the checked state of the {@link UI.Checkbox}.
 */
UI.Checkbox.prototype.Toggle = function() {
	this.SetChecked(!this.checked);
}

/////////////////////
// Event Delegates //
/////////////////////
/**
 * Event triggered when this {@link UI.Checkbox} is either checked or unchecked.
 * 
 * @event UI.Checkbox.CheckedChanged
 * @type {CustomEvent}
 * @property {boolean} checked - Whether or not the {@link UI.Checkbox} is now checked or not.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
 * @example
 * let checkbox = new UI.Checkbox("test checkbox", 25, 100, 120, 24);
 * checkbox.AddListener('checkedchanged', function(event) {
 *     console.log(event.detail.checked);
 * }.bind(this));
 */
UI.Checkbox.CheckedChanged = function(checked) {
	checked.validate(Boolean);
	return new CustomEvent('checkedchanged', { detail: { checked } });
};

/////////////////////////////
// Internal Event Handling //
/////////////////////////////
/**
 * @override
 * @param {UI.Component.event:MouseDown} event
 * @returns {boolean} Whether or not the event was handled.
 */
UI.Checkbox.prototype.OnMouseDown = function(event) {
	UI.Checkbox.parent.OnMouseDown.apply(this, arguments); // super function call
	this.label.SetStyle(this.labelStyle_down_hover);
	if (this.IsChecked()) this.image = this.checked_down_hover;
	else this.image = this.unchecked_down_hover;
	return true;
}
/**
 * @override
 * @param {UI.Component.event:MouseUp} event
 * @returns {boolean} Whether or not the event was handled.
 */
UI.Checkbox.prototype.OnMouseUp = function(event) {
	UI.Checkbox.parent.OnMouseUp.apply(this, arguments); // super function call
	if (this.IsMouseOver()) {
		this.label.SetStyle(this.labelStyle_hover);
		this.Toggle();
	}
	else {
		this.label.SetStyle(this.labelStyle_normal);
		if (this.IsChecked()) this.image = this.checked_normal;
		else this.image = this.unchecked_normal;
	}
	return true;
}
/**
 * @override
 * @param {UI.Component.event:MouseIn} event
 * @returns {boolean} Whether or not the event was handled.
 */
UI.Checkbox.prototype.OnMouseIn = function(event) {
	UI.Checkbox.parent.OnMouseIn.apply(this, arguments); // super function call
	if (this.IsMouseDown()) {
		UI.SetCursor('pointer');
		this.label.SetStyle(this.labelStyle_down_hover);
		if (this.checked) this.image = this.checked_down_hover;
		else this.image = this.unchecked_down_hover;
	}
	// If the mouse isn't down on something else
	else if (!UI.IsMouseDown()) {
		UI.SetCursor('pointer');
		this.label.SetStyle(this.labelStyle_hover);
		if (this.IsChecked()) this.image = this.checked_hover;
		else this.image = this.unchecked_hover;
	}
	return true;
}
/**
 * @override
 * @param {UI.Component.event:MouseOut} event
 * @returns {boolean} Whether or not the event was handled.
 */
UI.Checkbox.prototype.OnMouseOut = function(event) {
	UI.Checkbox.parent.OnMouseOut.apply(this, arguments); // super function call
	if (this.IsMouseDown()) {
		this.label.SetStyle(this.labelStyle_down);
		if (this.IsChecked()) this.image = this.checked_down_normal;
		else this.image = this.unchecked_down_normal;
	}
	else if (!UI.IsMouseDown()) {
		UI.SetCursor('auto');
		this.label.SetStyle(this.labelStyle_normal);
		if (this.IsChecked()) this.image = this.checked_normal;
		else this.image = this.unchecked_normal;
	}
	return true;
}