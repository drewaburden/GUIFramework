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

	Mixins.Mix(this, Mixins.Hoverable, Mixins.Clickable);

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

    /////////////////////
	// Event delegates //
	/////////////////////
	/** Event functions called when all loading and initialization has been completed for this {@link UI.NinePatch}.
	 * @type {function[]}
	 * @example
	 * var img = new UI.NinePatch("image.jpg");
	 * img.onload.push(function() {console.log("image loaded!");});
	 */
    this.onCheckedChange = [];

    /////////////////////
    // Internal events //
    /////////////////////
    // OnMouseIn
    this.onMouseIn.push(function(x, y) {
    	document.body.style.cursor = 'pointer';
    	if (this.isMouseDown) {
    		this.label.SetStyle(this.labelStyle_down_hover);
    		if (this.checked) this.image = this.checked_down_hover;
    		else this.image = this.unchecked_down_hover;
    	}
    	else {
    		this.label.SetStyle(this.labelStyle_hover);
    		if (this.checked) this.image = this.checked_hover;
    		else this.image = this.unchecked_hover;
    	}
	}.bind(this));
	// OnMouseOut
	this.onMouseOut.push(function() {
		if (this.isMouseDown) {
    		this.label.SetStyle(this.labelStyle_down);
    		if (this.checked) this.image = this.checked_down_normal;
    		else this.image = this.unchecked_down_normal;
    	}
    	else {
    		document.body.style.cursor = 'auto';
    		this.label.SetStyle(this.labelStyle_normal);
    		if (this.checked) this.image = this.checked_normal;
    		else this.image = this.unchecked_normal;
    	}
	}.bind(this));
	// OnMouseDown
	this.onMouseDown.push(function(x, y, button) {
		this.label.SetStyle(this.labelStyle_down_hover);
		if (this.checked) this.image = this.checked_down_hover;
    	else this.image = this.unchecked_down_hover;
	}.bind(this));
	// OnMouseUp
	this.onMouseUp.push(function(x, y, button) {
		if (this.isMouseOver) {
			this.label.SetStyle(this.labelStyle_hover);
			this.Toggle();
		}
		else {
			this.label.SetStyle(this.labelStyle_normal);
			if (this.checked) this.image = this.checked_normal;
    		else this.image = this.unchecked_normal;
		}
	}.bind(this));
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
 * Sets the checked state of the {@link UI.Checkbox} to the specified boolean value.
 * @param {boolean} checked
 */
UI.Checkbox.prototype.SetChecked = function(checked) {
	checked.validate(Boolean);

	// Fire event if necessary
	if (this.checked != checked) {
		// Notify all listeners
		for (let listener of this.onCheckedChange) {
			listener.validate(Function);
			listener(checked);
		}
	}

	this.checked = checked;
	if (this.checked) {
		if (this.isMouseOver) this.image = this.checked_hover;
		else this.image = this.checked_normal;
	}
	else {
		if (this.isMouseOver) this.image = this.unchecked_hover;
		else this.image = this.unchecked_normal;
	}
}
/**
 * Toggles the checked state of the {@link UI.Checkbox}.
 */
UI.Checkbox.prototype.Toggle = function() {
	this.SetChecked(!this.checked);
}