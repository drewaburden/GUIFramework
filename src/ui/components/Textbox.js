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
 * @extends {UI.Component}
 * @param {string} [text=""]
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @param {number} [width=0]
 * @param {number} [height=0]
 * @param {boolean} [visible=true]
 * @example
 * var btn = new UI.Textbox("text", 5, 5, 150, 50, true);
 */
UI.Textbox = function(text="", x=0, y=0, width=0, height=0, visible=true) {
	UI.Textbox.parent.constructor.call(this, x, y, width, height, visible); // Super constructor

	///////////////
	// Variables //
	///////////////
	// Background
	this.background_normal = new UI.NinePatch("assets/textbox/textbox_normal.png", this.GetX(), this.GetY(), this.GetWidth(), this.GetHeight(), 10, 10, 10, 10, true);
	this.background_hover = new UI.NinePatch("assets/textbox/textbox_hover.png", this.GetX(), this.GetY(), this.GetWidth(), this.GetHeight(), 10, 10, 10, 10, true);
	this.background_focused = new UI.NinePatch("assets/textbox/textbox_focused.png", this.GetX(), this.GetY(), this.GetWidth(), this.GetHeight(), 10, 10, 10, 10, true);
	this.background_focused_hover = new UI.NinePatch("assets/textbox/textbox_focused_hover.png", this.GetX(), this.GetY(), this.GetWidth(), this.GetHeight(), 10, 10, 10, 10, true);
	this.background = this.background_normal;
	// Label
	this.labelStyle_normal = '#e6e6e6';
	this.labelStyle_focused = '#ffffff';
	let textPadding_left = 8;
	this.textBoundsPadding = 5;
    this.label = new UI.Label(text.validate(String), this.GetX()+textPadding_left, this.GetY()+this.GetHeight()/2,
    	0, this.GetHeight(), this.labelStyle_normal, "normal 12px Share Tech Mono", UI.TextHAlign.LEFT,
    	UI.TextVAlign.MIDDLE, true);
    // Caret
    let caretHeightPadding = 15;
    let caretOffsetX = 0;
    let caretOffsetY = -8;
	this.caret = new UI.Caret(this.label, this.label.GetStyle(), caretOffsetX, caretOffsetY,
		this.GetHeight()-caretHeightPadding, this.IsFocused());
}.inherits(UI.Component);

///////////////
// Functions //
///////////////
/**
 * Handles all the drawing to the canvas for this object.
 * @override
 * @param {CanvasRenderingContext2D} context
 */
UI.Textbox.prototype.Draw = function(context) {
	let keepDrawing = UI.Textbox.parent.Draw.apply(this, arguments); // super function call
	if (!keepDrawing || this.GetWidth() <= 0 || this.GetHeight() <= 0) return false;

	this.background.Draw(context);

	// Adjust the label position so that the caret can stay within the Textbox's bounds.
	while (this.label.GetX()+this.caret.GetX() >= this.GetX()+this.GetWidth()-this.textBoundsPadding*2-1)
		this.label.SetX(this.label.GetX()-this.GetWidth()-this.GetWidth()/2);
	while (this.label.GetX()+this.caret.GetX() <= this.GetX()+this.textBoundsPadding-1)
		this.label.SetX(this.label.GetX()+this.GetWidth()-this.GetWidth()/2);

	// Draw text only within the textbox bounds; i.e., clip off the overflowing text.
	// Define a rectangle with the dimensions of the text bounds; apply rectangle as
	// a mask; render text within the rectangle.
	context.save();
	context.rect(this.GetX()+this.textBoundsPadding, this.GetY()+this.textBoundsPadding,
		this.GetWidth()-this.textBoundsPadding*2, this.GetHeight()-this.textBoundsPadding*2); // Define the mask area
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
UI.Textbox.prototype.SetFocused = function(focused) {
	UI.Textbox.parent.SetFocused.apply(this, arguments);

	if (this.IsFocused()) {
		this.caret.StartBlinking();
		this.label.SetStyle(this.labelStyle_focused);
		if (this.IsMouseOver()) this.background = this.background_focused_hover;
		else this.background = this.background_focused;
	}
	else {
		this.caret.StopBlinking();
		this.label.SetStyle(this.labelStyle_normal);
		if (this.IsMouseOver()) this.background = this.background_hover;
		else this.background = this.background_normal;
	}
}

/** Remove the character before the {@link UI.Caret}'s position. */
UI.Textbox.prototype.Backspace = function() {
	let caretPosition = this.caret.GetPosition();
	let labelText = this.label.GetText();
	if (caretPosition != 0) {
		this.label.SetText(labelText.slice(0, caretPosition-1) + labelText.slice(caretPosition, labelText.length));
		this.caret.Retreat();
	}
}
/** Remove the character after the {@link UI.Caret}'s position. */
UI.Textbox.prototype.Delete = function() {
	let caretPosition = this.caret.GetPosition();
	let labelText = this.label.GetText();
	if (caretPosition != labelText.length) {
		this.label.SetText(
			labelText.slice(0, caretPosition) + labelText.slice(caretPosition+1, labelText.length));
	}
	this.caret.ResetBlinking();
}

/////////////////////////////
// Internal Event Handling //
/////////////////////////////
/**
 * @override
 * @param {UI.Component.event:KeyDown} event
 * @returns {boolean} Whether or not the event was handled.
 */
UI.Textbox.prototype.OnKeyDown = function(event) {
	UI.Textbox.parent.OnKeyDown.apply(this, arguments); // super function call
	switch (event.detail.key) {
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
	return true;
}
/**
 * @override
 * @param {UI.Component.event:KeyPress} event
 * @returns {boolean} Whether or not the event was handled.
 */
UI.Textbox.prototype.OnKeyPress = function(event) {
	UI.Textbox.parent.OnKeyPress.apply(this, arguments); // super function call
	let charToInsert = String.fromCharCode(event.detail.key);
	let labelText = this.label.GetText();
	let caretPosition = this.caret.GetPosition();
	// Insert at beginning
	if (caretPosition == 0)
		this.label.SetText(charToInsert + labelText);
	// Insert at end
	else if (caretPosition == labelText.length)
		this.label.SetText(labelText + charToInsert);
	// Insert at somewhere in the middle
	else
		this.label.SetText(labelText.slice(0, caretPosition)
			+ charToInsert
			+ labelText.slice(caretPosition, labelText.length));
	this.caret.Advance();
	return true;
}
/**
 * @override
 * @param {UI.Component.event:MouseIn} event
 * @returns {boolean} Whether or not the event was handled.
 */
UI.Textbox.prototype.OnMouseIn = function(event) {
	UI.Textbox.parent.OnMouseIn.apply(this, arguments); // super function call
	// If the mouse isn't down at all, or it is down on only this component.
	if (this.IsMouseDown() || !UI.IsMouseDown()) {
		UI.SetCursor('text');
		if (this.IsFocused()) this.background = this.background_focused_hover;
		else this.background = this.background_hover;
		return true;
	}
	else return false;
}
/**
 * @override
 * @param {UI.Component.event:MouseOut} event
 * @returns {boolean} Whether or not the event was handled.
 */
UI.Textbox.prototype.OnMouseOut = function(event) {
	UI.Textbox.parent.OnMouseOut.apply(this, arguments); // super function call
	// Only if the mouse isn't down.
	if (!UI.IsMouseDown()) {
		UI.SetCursor('auto');
		if (this.IsFocused()) this.background = this.background_focused;
		else this.background = this.background_normal;
		return true;
	}
	else return false;
}