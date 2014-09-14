// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\components\Label.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      Defines a text label Component that allows positioning and styling of text.
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
 * var label = new Label("text", 5, 5, 150, 50, 'black', 'bold 18px Arial', TextHAlign.CENTER, TextVAlign.MIDDLE, true);
 */
Label.inherits(Component);
function Label(text="", x=0, y=0, width=0, height=0, style='black', font='normal 12px Arial',
	textHAlignment=TextHAlign.START, textVAlignment=TextVAlign.ALPHABETIC, visible=true) {
	Label.parent.constructor.call(this, x, y, width, height, visible); // Super constructor	

	///////////////
	// Variables //
	///////////////
	/** @type {string} */
	this.text = text.validate(String);
	/** @type {string|CanvasGradient|CanvasPattern} */
	this.style = style.validate(String, CanvasGradient, CanvasPattern);
	/** @type {number} */
	this.font = font.validate(String);
	// Validate these as strings, because that's actually what they are behind the scenes
	/** @type {TextHAlign|string} */
	this.textHAlignment = textHAlignment.validate(String);
	/** @type {TextVAlign|string} */
	this.textVAlignment = textVAlignment.validate(String);
}

///////////////
// Functions //
///////////////
/**
 * Handles all the drawing to the canvas for this object.
 * @override
 * @param {CanvasRenderingContext2D} context
 */
Label.prototype.Draw = function(context) {
	Label.parent.Draw.apply(this, arguments); // super function call
	
	if (!this.visible) return;
	
    context.font = this.font;
    context.fillStyle = this.style;
	// Set canvas text alignment accordingly
	context.textAlign = this.textHAlignment;
	context.textBaseline = this.textVAlignment;
	if (this.width > 0) context.fillText(this.text, this.x, this.y, this.width);
	else context.fillText(this.text, this.x, this.y);
}