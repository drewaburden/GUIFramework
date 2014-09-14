// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\components\Textbox.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      
//
// ================================================================================================

/**
 * 
 * @class
 * @extends {Component}
 * @param {string} [text=""]
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @param {number} [width=0]
 * @param {number} [height=0]
 * @param {boolean} [visible=true]
 * @example
 * var btn = new Textbox("text", 5, 5, 150, 50, true);
 */
Textbox.inherits(Component);
function Textbox(text="", x=0, y=0, width=0, height=0, visible=true) {
	Textbox.parent.constructor.call(this, x, y, width, height, visible); // Super constructor	

	Mixins.Mix(this, Mixins.Hoverable, Mixins.Clickable);

	///////////////
	// Variables //
	///////////////
	/** @type {string} */
	this.text = text.validate(String);
	let caretHeightPadding = 14;
	this.caret = new Caret(this.x, this.y+caretHeightPadding-7, this.height-caretHeightPadding, false);
	this.background_normal = new NinePatch("assets/textbox/textbox_normal.png", this.x, this.y, this.width, this.height, 10, 10, 10, 10, true);
	this.background_hover = new NinePatch("assets/textbox/textbox_hover.png", this.x, this.y, this.width, this.height, 10, 10, 10, 10, true);
	this.background_focused = new NinePatch("assets/textbox/textbox_focused.png", this.x, this.y, this.width, this.height, 10, 10, 10, 10, true);
	this.background_focused_hover = new NinePatch("assets/textbox/textbox_focused_hover.png", this.x, this.y, this.width, this.height, 10, 10, 10, 10, true);
	this.background = this.background_normal;
	this.labelStyle_normal = '#e6e6e6';
	this.labelStyle_focused = '#ffffff';
	this.textPadding_left = 8;
	this.textBoundsPadding = 5;
    this.label = new Label(this.text, this.x+this.textPadding_left, this.y+this.height/2,
    	0, this.height, this.labelStyle_normal, "normal 12px Share Tech Mono", TextHAlign.LEFT, TextVAlign.MIDDLE, true);

    /////////////////////
    // Internal events //
    /////////////////////
    // OnMouseIn
    this.onMouseIn.push(function(x, y) {
    	document.body.style.cursor = "text";
    	if (this.focused) this.background = this.background_focused_hover;
    	else this.background = this.background_hover;
	}.bind(this));
	// OnMouseOut
	this.onMouseOut.push(function() {
		if (this.focused) this.background = this.background_focused;
    	else this.background = this.background_normal;
		document.body.style.cursor = "auto";
	}.bind(this));
	// OnMouseDown
	this.onMouseDown.push(function(x, y, button) {

	}.bind(this));
	// OnMouseUp
	this.onMouseUp.push(function(x, y, button) {

	}.bind(this));
}

///////////////
// Functions //
///////////////
/**
 * Handles all the drawing to the canvas for this object.
 * @override
 * @param {CanvasRenderingContext2D} context
 */
Textbox.prototype.Draw = function(context) {
	Textbox.parent.Draw.apply(this, arguments); // super function call

	if (!this.visible) return;

	this.background.Draw(context);

	// Draw text only within the textbox bounds; i.e., clip off the overflowing text.
	// Define a rectangle with the dimensions of the text bounds; apply rectangle as
	// a mask; render text within the rectangle.
	//this.label.x -= 1; // Debug the edges
	context.save();
	context.rect(this.x+this.textBoundsPadding, this.y+this.textBoundsPadding,
		this.width-this.textBoundsPadding*2, this.height-this.textBoundsPadding*2); // Define the mask area
	context.clip(); // Apply the mask
	this.label.Draw(context); // Draw the label within the mask
	context.restore();

	this.caret.Draw(context);
}
/**
 * @param {boolean} focused
 */
Textbox.prototype.SetFocused = function(focused) {
	Textbox.parent.SetFocused.apply(this, arguments);

	if (this.focused) {
		this.caret.StartBlinking();
		this.label.style = this.labelStyle_focused;
		if (this.isOver) this.background = this.background_focused_hover;
		else this.background = this.background_focused;
	}
	else {
		this.caret.StopBlinking();
		this.label.style = this.labelStyle_normal;
		if (this.isOver) this.background = this.background_hover;
		else this.background = this.background_normal;
	}
}