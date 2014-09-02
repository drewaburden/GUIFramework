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
 * @param {string} [style="rgb(0, 0, 0)"] - Text style. Could be a text color, rgb color,
 * 											gradient, etc.
 * @param {string} [font="normal 12px Arial"]
 * @param {TextHAlign} [textAlignment=TextHAlign.LEFT]
 * @param {boolean} [visible=true]
 */
function Label(text, x, y, width, height, style, font, textHAlignment, visible) {
	Component.call(this, x, y, width, height, visible); // super constructor
	
	this.text = defaultVal(text, "");
	this.style = defaultVal(style, "rgb(0, 0, 0)");
	this.font = defaultVal(font, "normal 12px Arial");
	this.textHAlignment = defaultVal(textHAlignment, TextHAlign.LEFT);

	/**
	 * Handles all the drawing to the canvas for this object.
	 * @override
	 */
	Label.prototype.draw = function() {
		if (this.visible) {
		    context.font = this.font;
		    context.fillStyle = this.style;
			// Set canvas text alignment accordingly
		    switch(this.textHAlignment) {
		    	case TextHAlign.RIGHT:
		    		context.textAlign = 'right';
		    		break;
		    	case TextHAlign.CENTER:
		    		context.textAlign = 'center';
		    		break;
		    	case TextHAlign.LEFT:
		    	default:
		    		context.textAlign = 'left';
		    		break;
		    }
		    context.fillText(this.text, this.x, this.y, this.width);
		}
	}
}
Label.prototype = new Component(); // Inherits from Component