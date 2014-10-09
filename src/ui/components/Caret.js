// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\components\Caret.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      
//
// ================================================================================================

Caret.inherits(Component);
/**
 * Caret
 * @class
 * @extends {Component}
 * @param {Label}   label   - Label that handles the text the Caret corresponds to.
 * @param {string|CanvasGradient|CanvasPattern} [style='rgb(255, 255, 255)'] - Caret style.
 * @param {number}  offsetX - Base x offset from the x position of the `label`
 * @param {number}  offsetY - Base y offset from the y position of the `label`
 * @param {number}  height  - Height of the caret.
 * @param {boolean} [startBlinking=false]
 */
function Caret(label=undefined, style='white', offsetX=undefined, offsetY=undefined,
	height=undefined, startBlinking=false) {
	Caret.parent.constructor.call(this, 0, 0, 1, height, startBlinking); // Super constructor

	///////////////
	// Variables //
	///////////////
	this.label = label.validate(Label);
	this.style = style.validate(String, CanvasGradient, CanvasPattern);
	this.position = 0;
	this.blinkFrequency = 450; // Milliseconds between blinks
	this.blinking = false;
	this.blinkIntervalId = null; // Holds the id that refers to the active interval that's handling the blinking.
	// Make sure the caret's positions start at a half pixel, otherwise, the width of the line
	// drawn will be inconsistent and/or incorrect.
	this.offsetX = Math.round(offsetX.validate(Number)) + 0.5;
	this.offsetY = Math.round(offsetY.validate(Number)) + 0.5;

	////////////////////
	// Initialization //
	////////////////////
	this.focusable = false;
	if (startBlinking) this.StartBlinking();
}

///////////////
// Functions //
///////////////
/**
 * Handles all the drawing to the canvas for this object.
 * @override
 * @param {CanvasRenderingContext2D} context
 */
Caret.prototype.Draw = function(context) {
	let keepDrawing = Caret.parent.Draw.apply(this, arguments); // super function call
	if (!keepDrawing || !this.blinking || this.height <= 0) return false;

	// Determine the position of the caret within the bounds of the corresponding Label
	if (this.position == 0) this.x = 0;
	else {
		let text = this.label.text.substring(0, this.position);
		this.x = context.measureText(text).width;
	}
	// Set the Caret style
	context.strokeStyle = 'white';
	context.lineWidth = this.width;
	// Draw the caret line
	context.beginPath();
	context.moveTo(Math.round(this.label.x+this.x)+this.offsetX, Math.round(this.label.y+this.y)+this.offsetY);
	context.lineTo(Math.round(this.label.x+this.x)+this.offsetX, Math.round(this.label.y+this.y+this.height)+this.offsetY);
	context.stroke();

	return true;
}

/**
 * If the Caret is not currently blinking, start blinking.
 * Assigns a new id to the `blinkIntervalId` class variable.
 */
Caret.prototype.StartBlinking = function() {
	if (!this.blinking) {
		// Set up a recurring function call that toggles the visibility of this component
		// every `blinkFrequency` milliseconds.
		this.blinkIntervalId = setInterval(
			function() { this.visible = !this.visible; }.bind(this),
			this.blinkFrequency);
		this.visible = true;
		this.blinking = true;
	}
}
/**
 * If the Caret is currently blinking, stop blinking.
 */
Caret.prototype.StopBlinking = function() {
	if (this.blinking) {
		clearInterval(this.blinkIntervalId);
		this.blinking = false;
		this.visible = false;
	}
}
/**
 * If the caret is currently blinking make sure the caret is explicitly visible for this tick, and
 * restart the blink interval.
 */
Caret.prototype.ResetBlinking = function() {
	if (this.blinking) {
		this.StopBlinking();
		this.StartBlinking();
	}
}

/**
 * @param {number} index - The new position of the Caret. The Caret position is in between `index`
 *                         and `index`-1; i.e., the Caret comes before the specified `index`.
 */
Caret.prototype.SetPosition = function(index) {
	this.position = Math.clamp(index.validate(Number), 0, this.label.text.length);
	this.ResetBlinking();
}
/**
 * @returns {number} The current position of the Caret.
 */
Caret.prototype.GetPosition = function() { return this.position; }

/**
 * Place the Caret at the very beginning of the text.
 */
Caret.prototype.Home = function() { this.SetPosition(0); }
/**
 * Place the Caret at the very end of the text.
 */
Caret.prototype.End = function() { this.SetPosition(this.label.text.length); }
/**
 * Move the position one character forward, if possible.
 */
Caret.prototype.Advance = function() { this.SetPosition(this.position+1); }
/**
 * Place the Caret one character backward, if possible.
 */
Caret.prototype.Retreat = function() { this.SetPosition(this.position-1); }