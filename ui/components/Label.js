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
 * @param {string} [style='rgb(0, 0, 0)'] - Text style. Could be a text color, rgb color,
 * 											gradient, etc.
 * @param {string} [font='normal 12px Arial']
 * @param {TextHAlign|string} [textAlignment=TextHAlign.START] - Horizontal alignment string to
 *                                                            	 pass to the context.textAlign
 *                                                            	 property. You may pass this
 *                                                            	 using the provided enum values
 *                                                            	 or as a literal string.
 * @param {TextVAlign|string} [textAlignment=TextVAlign.ALPHABETIC] - Vertical alignment string to
 *                                                            	 pass to the context.textBaseline
 *                                                            	 property. You may pass this
 *                                                            	 using the provided enum values
 *                                                            	 or as a literal string.
 * @param {boolean} [visible=true]
 * @example
 *  var label = new Label("text", 5, 5, 150, 50, 'black', 'bold 18px Arial', TextHAlign.CENTER, TextVAlign.MIDDLE, true);
 */
function Label(text, x, y, width, height, style, font, textHAlignment, textVAlignment, visible) {
	Component.call(this, x, y, width, height, visible); // super constructor
	
	this.text = defaultVal(text, "");
	this.style = defaultVal(style, "rgb(0, 0, 0)");
	this.font = defaultVal(font, "normal 12px Arial");
	this.textHAlignment = defaultVal(textHAlignment, TextHAlign.START);
	this.textVAlignment = defaultVal(textVAlignment, TextVAlign.ALPHABETIC);

	/**
	 * Handles all the drawing to the canvas for this object.
	 * @override
	 */
	Label.prototype.Draw = function() {
		if (this.visible) {
		    context.font = this.font;
		    context.fillStyle = this.style;
			// Set canvas text alignment accordingly
    		context.textAlign = this.textHAlignment;
    		context.textBaseline = this.textVAlignment;
		    context.fillText(this.text, this.x, this.y, this.width);
		}
	}
}
Label.prototype = new Component(); // Inherits from Component