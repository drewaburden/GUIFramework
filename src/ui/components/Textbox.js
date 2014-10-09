// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\components\Textbox.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      
//
// ================================================================================================

Textbox.inherits(Component);
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
function Textbox(text="", x=0, y=0, width=0, height=0, visible=true) {
	Textbox.parent.constructor.call(this, x, y, width, height, visible); // Super constructor	
	Mixins.Mix(this, Mixins.Hoverable, Mixins.Clickable, Mixins.Typeable);

	///////////////
	// Variables //
	///////////////
	// Background
	this.background_normal = new NinePatch("assets/textbox/textbox_normal.png", this.x, this.y, this.width, this.height, 10, 10, 10, 10, true);
	this.background_hover = new NinePatch("assets/textbox/textbox_hover.png", this.x, this.y, this.width, this.height, 10, 10, 10, 10, true);
	this.background_focused = new NinePatch("assets/textbox/textbox_focused.png", this.x, this.y, this.width, this.height, 10, 10, 10, 10, true);
	this.background_focused_hover = new NinePatch("assets/textbox/textbox_focused_hover.png", this.x, this.y, this.width, this.height, 10, 10, 10, 10, true);
	this.background = this.background_normal;
	// Label
	this.labelStyle_normal = '#e6e6e6';
	this.labelStyle_focused = '#ffffff';
	let textPadding_left = 8;
	this.textBoundsPadding = 5;
    this.label = new Label(text.validate(String), this.x+textPadding_left, this.y+this.height/2,
    	0, this.height, this.labelStyle_normal, "normal 12px Share Tech Mono", TextHAlign.LEFT,
    	TextVAlign.MIDDLE, true);
    // Caret
    let caretHeightPadding = 15;
    let caretOffsetX = 0;
    let caretOffsetY = -8;
	this.caret = new Caret(this.label, this.label.style, caretOffsetX, caretOffsetY,
		this.height-caretHeightPadding, this.focused);

    /////////////////////
    // Internal events //
    /////////////////////
    // OnMouseIn
    this.onMouseIn.push(function(x, y) {
    	document.body.style.cursor = 'text';
    	if (this.focused) this.background = this.background_focused_hover;
    	else this.background = this.background_hover;
	}.bind(this));
	// OnMouseOut
	this.onMouseOut.push(function() {
		if (this.focused) this.background = this.background_focused;
    	else this.background = this.background_normal;
		document.body.style.cursor = 'auto';
	}.bind(this));
	// OnKeyDown
	this.onKeyDown.push(function(key, shift, alt, ctrl) {
		switch (key) {
			case Input.Key.VK_ARROW_RIGHT:
				this.caret.Advance(); break;
			case Input.Key.VK_ARROW_LEFT:
				this.caret.Retreat(); break;
			case Input.Key.VK_HOME:
			case Input.Key.VK_ARROW_UP:
				this.caret.Home(); break;
			case Input.Key.VK_END:
			case Input.Key.VK_ARROW_DOWN:
				this.caret.End(); break;
			case Input.Key.VK_BACKSPACE:
				this.Backspace(); break;
			case Input.Key.VK_DELETE:
				this.Delete(); break;
		}
	}.bind(this));
	// OnKeyPress
	this.onKeyPress.push(function(key) {
		let charToInsert = String.fromCharCode(key);
		// Insert at beginning
		if (this.caret.position == 0)
			this.label.text = charToInsert + this.label.text;
		// Insert at end
		else if (this.caret.position == this.label.text.length)
			this.label.text = this.label.text + charToInsert;
		// Insert at somewhere in the middle
		else 
			this.label.text = this.label.text.slice(0, this.caret.position)
				+ charToInsert
				+ this.label.text.slice(this.caret.position, this.label.text.length)
		this.caret.Advance();
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
	let keepDrawing = Textbox.parent.Draw.apply(this, arguments); // super function call
	if (!keepDrawing || this.width <= 0 || this.height <= 0) return false;

	this.background.Draw(context);

	// Adjust the label position so that the caret can stay within the Textbox's bounds.
	while (this.label.x+this.caret.x >= this.x+this.width-this.textBoundsPadding*2-1)
		this.label.x -= this.width-this.width/2;
	while (this.label.x+this.caret.x <= this.x+this.textBoundsPadding-1)
		this.label.x += this.width-this.width/2;

	// Draw text only within the textbox bounds; i.e., clip off the overflowing text.
	// Define a rectangle with the dimensions of the text bounds; apply rectangle as
	// a mask; render text within the rectangle.
	context.save();
	context.rect(this.x+this.textBoundsPadding, this.y+this.textBoundsPadding,
		this.width-this.textBoundsPadding*2, this.height-this.textBoundsPadding*2); // Define the mask area
	context.clip(); // Apply the mask
	this.label.Draw(context); // Draw the label within the mask
	// Draw the caret within the mask, and use the label's styles set in the previous statement to do
	// text measurments before the context is restored.
	this.caret.Draw(context);
	context.restore(); // Disable the mask for future drawing

	return true;
}
/**
 * @override
 * @param {boolean} [focused]
 */
Textbox.prototype.SetFocused = function(focused) {
	Textbox.parent.SetFocused.apply(this, arguments);

	if (this.focused) {
		this.caret.StartBlinking();
		this.label.SetStyle(this.labelStyle_focused);
		if (this.isMouseOver) this.background = this.background_focused_hover;
		else this.background = this.background_focused;
	}
	else {
		this.caret.StopBlinking();
		this.label.SetStyle(this.labelStyle_normal);
		if (this.isMouseOver) this.background = this.background_hover;
		else this.background = this.background_normal;
	}
}

/** Remove the character before the Caret's position. */
Textbox.prototype.Backspace = function() {
	let caretPosition = this.caret.GetPosition();
	let labelText = this.label.GetText();
	if (caretPosition != 0) {
		this.label.SetText(
			labelText.slice(0, caretPosition-1) + labelText.slice(caretPosition, labelText.length));
		this.caret.Retreat();
	}
}
/** Remove the character after the Caret's position. */
Textbox.prototype.Delete = function() {
	let caretPosition = this.caret.GetPosition();
	let labelText = this.label.GetText();
	if (caretPosition != labelText.length) {
		this.label.SetText(
			labelText.slice(0, caretPosition) + labelText.slice(caretPosition+1, labelText.length));
	}
	this.caret.ResetBlinking();
}