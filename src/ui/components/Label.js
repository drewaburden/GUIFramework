// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\components\Label.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      Defines a text label Component that allows positioning, styling, and rendering of text.
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
 * @param {string|CanvasGradient|CanvasPattern} [style='rgb(0, 0, 0)'] - Text style.
 * @param {string} [font='normal 12px Arial']
 * @param {TextHAlign|string} [textHAlignment=TextHAlign.START] - Horizontal alignment string to
 *                                                            	 pass to the context.textAlign
 *                                                            	 property. You may pass this
 *                                                            	 using the provided enum values
 *                                                            	 or as a literal string.
 * @param {TextVAlign|string} [textVAlignment=TextVAlign.ALPHABETIC] - Vertical alignment string to
 *                                                            	 pass to the context.textBaseline
 *                                                            	 property. You may pass this
 *                                                            	 using the provided enum values
 *                                                            	 or as a literal string.
 * @param {boolean} [visible=true]
 * @example
 * var label = new UI.Label("text", 5, 5, 150, 50, 'black', 'bold 18px Arial', TextHAlign.CENTER, TextVAlign.MIDDLE, true);
 */
UI.Label = function(text="", x=0, y=0, width=0, height=0, style='black', font='normal 12px Arial',
	textHAlignment=TextHAlign.START, textVAlignment=TextVAlign.ALPHABETIC, visible=true) {
	UI.Label.parent.constructor.call(this, x, y, width, height, visible); // Super constructor	

	///////////////
	// Variables //
	///////////////
	this.text;
	this.style;
	this.font;
	this.textHAlignment;
	this.textVAlignment;

	////////////////////
	// Initialization //
	////////////////////
	this.SetText(text);
	this.SetStyle(style);
	this.SetFont(font);
	this.SetHAlignment(textHAlignment);
	this.SetVAlignment(textVAlignment);
}.inherits(UI.Component);

///////////////
// Functions //
///////////////
/**
 * Handles all the drawing to the canvas for this object.
 * @override
 * @param {CanvasRenderingContext2D} context
 */
UI.Label.prototype.Draw = function(context) {
	let keepDrawing = UI.Label.parent.Draw.apply(this, arguments); // super function call
	if (!keepDrawing || this.height <= 0) return false;
	
	// Set text font and style
    context.font = this.font;
    context.fillStyle = this.style;
	// Set text alignments
	context.textAlign = this.textHAlignment;
	context.textBaseline = this.textVAlignment;
	// If a width was specified, constrain the text to render within that width.
	// Otherwise, allow the text to take as much space as necessary.
	if (this.width > 0) context.fillText(this.text, this.x, this.y, this.width);
	else context.fillText(this.text, this.x, this.y);

	return true;
}

//////////////////////////
// Mutators & Accessors //
//////////////////////////
/**
 * @param {string} text - New text for the {@link UI.Label} to display.
 */
UI.Label.prototype.SetText = function(text) { this.text = text.validate(String); }
/**
 * @returns {string} This {@link UI.Label}'s display text.
 */
UI.Label.prototype.GetText = function() { return this.text; }

/**
 * @param {string|CanvasGradient|CanvasPattern} style - New style to apply to the {@link UI.Label}'s display text.
 */
UI.Label.prototype.SetStyle = function(style) { this.style = style.validate(String, CanvasGradient, CanvasPattern); }
/**
 * @returns {string|CanvasGradient|CanvasPattern} This {@link UI.Label}'s current display style.
 */
UI.Label.prototype.GetStyle = function() { return this.style; }

/**
 * @param {string} text - New font to apply to the {@link UI.Label}'s display text.
 */
UI.Label.prototype.SetFont = function(font) { this.font = font.validate(String); }
/**
 * @returns {string} The font of this {@link UI.Label}'s display text.
 */
UI.Label.prototype.GetFont = function() { return this.font; }

/**
 * @param {TextHAlign|string} textHAlignment - New horizontal alignment to apply to the {@link UI.Label}'s display text.
 */
UI.Label.prototype.SetHAlignment = function(textHAlignment) {
	// Validate as string, because that's actually what it is behind the scenes
	this.textHAlignment = textHAlignment.validate(String);
}
/**
 * @returns {TextHAlign|string} The horizontal alignment of this {@link UI.Label}'s display text.
 */
UI.Label.prototype.GetHAlignment = function() { return this.textHAlignment; }

/**
 * @param {TextVAlign|string} textVAlignment - New vertical alignment to apply to the {@link UI.Label}'s display text.
 */
UI.Label.prototype.SetVAlignment = function(textVAlignment) {
	// Validate as string, because that's actually what it is behind the scenes
	this.textVAlignment = textVAlignment.validate(String);
}
/**
 * @returns {TextVAlign|string} The vertical alignment of this {@link UI.Label}'s display text.
 */
UI.Label.prototype.GetVAlignment = function() { return this.textVAlignment; }