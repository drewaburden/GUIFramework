// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\components\Button.js
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
 * @param {boolean} [visible=true]
 * @example
 * var btn = new UI.Button("text", 5, 5, 150, 50, true);
 */
UI.Button = function(text="", x=0, y=0, width=0, height=0, visible=true) {
	UI.Button.parent.constructor.call(this, x, y, width, height, visible); // Super constructor	

	///////////////
	// Variables //
	///////////////
	this.text = text.validate(String);
	this.background_normal = new UI.NinePatch("assets/button/button_normal.png", this.x, this.y, this.width, this.height, 14, 14, 14, 14, true);
	this.background_hover = new UI.NinePatch("assets/button/button_hover.png", this.x, this.y, this.width, this.height, 14, 14, 14, 14, true);
	this.background_down = new UI.NinePatch("assets/button/button_down_normal.png", this.x, this.y, this.width, this.height, 14, 14, 14, 14, true);
	this.background_down_hover = new UI.NinePatch("assets/button/button_down_hover.png", this.x, this.y, this.width, this.height, 14, 14, 14, 14, true);
	this.background = this.background_normal;
	this.labelStyle_normal = '#B1E77D';
	this.labelStyle_hover = '#D5F3B7';
	this.labelStyle_down = '#B1E77D';
	this.labelStyle_down_hover = '#D5F3B7';
    this.label = new UI.Label(this.text, this.x+this.width/2, this.y+this.height/2,
    	this.width, this.height, this.labelStyle_normal, "normal 12px Share Tech Mono",
    	TextHAlign.CENTER, TextVAlign.MIDDLE, true);
}.inherits(UI.Component);

///////////////
// Functions //
///////////////
/**
 * Handles all the drawing to the canvas for this object.
 * @override
 * @param {CanvasRenderingContext2D} context
 */
UI.Button.prototype.Draw = function(context) {
	let keepDrawing = UI.Button.parent.Draw.apply(this, arguments); // super function call
	if (!keepDrawing || this.width <= 0 || this.height <= 0) return false;

	this.background.Draw(context);
	this.label.Draw(context);

	return true;
}

/////////////////////
// Event Delegates //
/////////////////////
/**
 * Event triggered when the {@link UI.Button} is clicked.
 * @event UI.Button.Clicked
 * @type {CustomEvent}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
 * @example
 * let button = new UI.Button("test button", 25, 25, 120, 35, true);
 * button.AddListener('clicked', function(event) {
 *     console.log("button clicked");
 * }.bind(this));
 */
UI.Button.Clicked = function() {
	return new CustomEvent('clicked');
};

/////////////////////////////
// Internal Event Handling //
/////////////////////////////
/**
 * @override
 * @param {UI.Component.event:MouseDown} event
 * @returns {boolean} Whether or not the event was handled.
 */
UI.Button.prototype.OnMouseDown = function(event) {
	UI.Button.parent.OnMouseDown.apply(this, arguments); // super function call
	this.background = this.background_down_hover;
	this.label.SetStyle(this.labelStyle_down_hover);
	return true;
}
/**
 * @override
 * @param {UI.Component.event:MouseUp} event
 * @returns {boolean} Whether or not the event was handled.
 * @fires UI.Button.Clicked
 */
UI.Button.prototype.OnMouseUp = function(event) {
	UI.Button.parent.OnMouseUp.apply(this, arguments); // super function call
	if (this.IsMouseOver()) {
		this.OnMouseIn(event);
		this.DispatchEvent(new UI.Button.Clicked());
	}
	else this.OnMouseOut(event);
	return true;
}
/**
 * @override
 * @param {UI.Component.event:MouseIn} event
 * @returns {boolean} Whether or not the event was handled.
 */
UI.Button.prototype.OnMouseIn = function(event) {
	UI.Button.parent.OnMouseIn.apply(this, arguments); // super function call
	if (this.IsMouseDown()) {
		UI.SetCursor('pointer');
		this.background = this.background_down_hover;
		this.label.SetStyle(this.labelStyle_down_hover);
	}
	// If the mouse isn't down on something else
	else if (!UI.IsMouseDown()) {
		UI.SetCursor('pointer');
		this.background = this.background_hover;
		this.label.SetStyle(this.labelStyle_hover);
	}
	return true;
}
/**
 * @override
 * @param {UI.Component.event:MouseOut} event
 * @returns {boolean} Whether or not the event was handled.
 */
UI.Button.prototype.OnMouseOut = function(event) {
	UI.Button.parent.OnMouseOut.apply(this, arguments); // super function call
	if (this.IsMouseDown()) {
		this.background = this.background_down;
		this.label.SetStyle(this.labelStyle_down);
	}
	// If the mouse isn't down on something else
	else if (!UI.IsMouseDown()) {
		UI.SetCursor('auto');
		this.background = this.background_normal;
		this.label.SetStyle(this.labelStyle_normal);
	}
	return true;
}