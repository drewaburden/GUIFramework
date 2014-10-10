// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\components\Button.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      
//
// ================================================================================================

Button.inherits(Component);
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
 * var btn = new Button("text", 5, 5, 150, 50, true);
 */
function Button(text="", x=0, y=0, width=0, height=0, visible=true) {
	Button.parent.constructor.call(this, x, y, width, height, visible); // Super constructor	

	Mixins.Mix(this, Mixins.Hoverable, Mixins.Clickable);

	///////////////
	// Variables //
	///////////////
	this.text = text.validate(String);
	this.background_normal = new NinePatch("assets/button/button_normal.png", this.x, this.y, this.width, this.height, 14, 14, 14, 14, true);
	this.background_hover = new NinePatch("assets/button/button_hover.png", this.x, this.y, this.width, this.height, 14, 14, 14, 14, true);
	this.background_down = new NinePatch("assets/button/button_down_normal.png", this.x, this.y, this.width, this.height, 14, 14, 14, 14, true);
	this.background_down_hover = new NinePatch("assets/button/button_down_hover.png", this.x, this.y, this.width, this.height, 14, 14, 14, 14, true);
	this.background = this.background_normal;
	this.labelStyle_normal = '#B1E77D';
	this.labelStyle_hover = '#D5F3B7';
	this.labelStyle_down = '#B1E77D';
	this.labelStyle_down_hover = '#D5F3B7';
    this.label = new Label(this.text, this.x+this.width/2, this.y+this.height/2,
    	this.width, this.height, this.labelStyle_normal, "normal 12px Share Tech Mono", TextHAlign.CENTER, TextVAlign.MIDDLE, true);

    /////////////////////
    // Internal events //
    /////////////////////
    // OnMouseIn
    this.onMouseIn.push(function(x, y) {
    	document.body.style.cursor = 'pointer';
    	if (this.isMouseDown) {
    		this.background = this.background_down_hover;
			this.label.style = this.labelStyle_down_hover;
    	}
    	else {
			this.background = this.background_hover;
			this.label.style = this.labelStyle_hover;
		}
	}.bind(this));
	// OnMouseOut
	this.onMouseOut.push(function() {
		if (this.isMouseDown) {
			this.background = this.background_down;
			this.label.style = this.labelStyle_down;
		}
		else {
			document.body.style.cursor = 'auto';
			this.background = this.background_normal;
			this.label.style = this.labelStyle_normal;
		}
	}.bind(this));
	// OnMouseDown
	this.onMouseDown.push(function(x, y, button) {
		this.background = this.background_down_hover;
		this.label.style = this.labelStyle_down_hover;
	}.bind(this));
	// OnMouseUp
	this.onMouseUp.push(function(x, y, button) {
		if (this.isMouseOver) this.OnMouseIn(x, y);
		else this.OnMouseOut();
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
Button.prototype.Draw = function(context) {
	let keepDrawing = Button.parent.Draw.apply(this, arguments); // super function call
	if (!keepDrawing || this.width <= 0 || this.height <= 0) return false;

	this.background.Draw(context);
	this.label.Draw(context);

	return true;
}