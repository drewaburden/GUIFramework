// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\components\Caret.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      
//
// ================================================================================================

/**
 * Caret
 * @class
 * @extends {UI.Component}
 * @param {UI.Label}   label   - {@link UI.Label} that handles the text the {@link UI.Caret} corresponds to.
 * @param {string|CanvasGradient|CanvasPattern} [style='rgb(255, 255, 255)'] - {@link UI.Caret} style.
 * @param {number}  offsetX - Base x offset from the x position of the `label`
 * @param {number}  offsetY - Base y offset from the y position of the `label`
 * @param {number}  height  - Height of the {@link UI.Caret}.
 * @param {boolean} [startBlinking=false]
 */
UI.Caret = function(label=undefined, style='white', offsetX=undefined, offsetY=undefined,
	height=undefined, startBlinking=false) {
	UI.Caret.parent.constructor.call(this, 0, 0, 1, height, startBlinking); // Super constructor

	///////////////
	// Variables //
	///////////////
	this.label = label.validate(UI.Label);
	this.style;
	this.position;
	this.blinkFrequency; // Milliseconds between blinks
	this.blinking = false;
	this.blinkIntervalId = null; // Holds the id that refers to the active interval that's handling the blinking.
	this.offsetX;
	this.offsetY;

	////////////////////
	// Initialization //
	////////////////////
	this.SetFocusable(false);
	this.SetStyle(style);
	this.SetPosition(0);
	this.SetBlinkFrequency(450);
	this.SetOffsetX(offsetX);
	this.SetOffsetY(offsetY);
	if (startBlinking) this.StartBlinking();
}.inherits(UI.Component);

///////////////
// Functions //
///////////////
/**
 * Handles all the drawing to the canvas for this object.
 * @override
 * @param {CanvasRenderingContext2D} context
 */
UI.Caret.prototype.Draw = function(context) {
	let keepDrawing = UI.Caret.parent.Draw.apply(this, arguments); // super function call
	if (!keepDrawing || !this.IsBlinking() || this.GetHeight() <= 0) return false;

	// Determine the position of the caret within the bounds of the corresponding Label
	if (this.GetPosition() == 0) this.SetX(0);
	else {
		let text = this.label.GetText().substring(0, this.GetPosition());
		this.SetX(context.measureText(text).width);
	}
	// Set the Caret style
	context.strokeStyle = 'white';
	context.lineWidth = this.width;
	// Draw the caret line
	context.beginPath();
	context.moveTo(
		Math.round(this.label.GetX()+this.GetX()) + this.GetOffsetX(),
		Math.round(this.label.GetY()+this.GetY()) + this.GetOffsetY());
	context.lineTo(
		Math.round(this.label.GetX()+this.GetX()) + this.GetOffsetX(),
		Math.round(this.label.GetY()+this.GetY()+this.GetHeight()) + this.GetOffsetY());
	context.stroke();

	return true;
}

/**
 * If the {@link UI.Caret} is not currently blinking, start blinking.
 * Assigns a new id to the `blinkIntervalId` class variable.
 */
UI.Caret.prototype.StartBlinking = function() {
	if (!this.IsBlinking()) {
		// Set up a recurring function call that toggles the visibility of this component
		// every `blinkFrequency` milliseconds.
		this.blinkIntervalId = setInterval(
			function() { this.visible = !this.IsVisible(); }.bind(this),
			this.blinkFrequency);
		this.SetVisible(true);
		this.blinking = true;
	}
}
/**
 * If the {@link UI.Caret} is currently blinking, stop blinking.
 */
UI.Caret.prototype.StopBlinking = function() {
	if (this.IsBlinking()) {
		clearInterval(this.blinkIntervalId);
		this.blinking = false;
		this.visible = false;
	}
}
/**
 * If the {@link UI.Caret} is currently blinking make sure the caret is explicitly visible for this tick, and
 * restart the blink interval.
 */
UI.Caret.prototype.ResetBlinking = function() {
	if (this.IsBlinking()) {
		this.StopBlinking();
		this.StartBlinking();
	}
}
/**
 * @returns {boolean}
 */
UI.Caret.prototype.IsBlinking= function() { return this.blinking; }

/**
 * Place the {@link UI.Caret} at the very beginning of the text.
 */
UI.Caret.prototype.Home = function() { this.SetPosition(0); }
/**
 * Place the {@link UI.Caret} at the very end of the text.
 */
UI.Caret.prototype.End = function() { this.SetPosition(this.label.GetText().length); }
/**
 * Move the {@link UI.Caret} position one character forward, if possible.
 */
UI.Caret.prototype.Advance = function() { this.SetPosition(this.GetPosition()+1); }
/**
 * Place the {@link UI.Caret} one character backward, if possible.
 */
UI.Caret.prototype.Retreat = function() { this.SetPosition(this.GetPosition()-1); }

//////////////////////////
// Mutators & Accessors //
//////////////////////////
/**
 * @param {number} index - The new position of the {@link UI.Caret}. The Caret position is in between `index`
 *                         and `index`-1; i.e., the Caret comes before the specified `index`.
 */
UI.Caret.prototype.SetPosition = function(index) {
	this.position = Math.clamp(index.validate(Number), 0, this.label.GetText().length);
	this.ResetBlinking();
}
/**
 * @returns {number} The current position of the {@link UI.Caret}.
 */
UI.Caret.prototype.GetPosition = function() { return this.position; }

/**
 * @param {string|CanvasGradient|CanvasPattern} style - New style to apply to the {@link UI.Caret}'s line.
 */
UI.Caret.prototype.SetStyle = function(style) { this.style = style.validate(String, CanvasGradient, CanvasPattern); }
/**
 * @returns {string|CanvasGradient|CanvasPattern} This {@link UI.Caret}'s current display style.
 */
UI.Caret.prototype.GetStyle = function() { return this.style; }

/**
 * @param {number} blinkFrequency - New delay (in milliseconds) between visible states of this {@link UI.Caret}.
 */
UI.Caret.prototype.SetBlinkFrequency = function(blinkFrequency) { this.blinkFrequency = blinkFrequency.validate(Number); }
/**
 * @returns {number} This {@link UI.Caret}'s current blink frequency (in milliseconds).
 */
UI.Caret.prototype.GetBlinkFrequency = function() { return this.blinkFrequency; }

/**
 * @param {number} offsetX - New x-offset to apply to the {@link UI.Caret}. The x-offset denotes the x position that
 *                           the Caret at position 0 should be drawn, relative to the {@link UI.Label}'s position.
 */
UI.Caret.prototype.SetOffsetX = function(offsetX) {
	// Make sure the caret's positions start at a half pixel, otherwise, the width of the line
	// drawn will be inconsistent and/or incorrect.
	this.offsetX = Math.round(offsetX.validate(Number)) + 0.5;
}
/**
 * @returns {number} This {@link UI.Caret}'s current x-offset. The x-offset denotes the x position that the Caret at
 *                   position 0 should be drawn, relative to the {@link UI.Label}'s position.
 */
UI.Caret.prototype.GetOffsetX = function() { return this.offsetX; }
/**
 * @param {number} offsetY - New y-offset to apply to the {@link UI.Caret}. The y-offset denotes the y position that
 *                           the Caret should be drawn, relative to the {@link UI.Label}'s position.
 */
UI.Caret.prototype.SetOffsetY = function(offsetY) {
	// Make sure the caret's positions start at a half pixel, otherwise, the width of the line
	// drawn will be inconsistent and/or incorrect.
	this.offsetY = Math.round(offsetY.validate(Number)) + 0.5;
}
/**
 * @returns {number} This {@link UI.Caret}'s current y-offset. The y-offset denotes the y position that the Caret
 *                   should be drawn, relative to the {@link UI.Label}'s position.
 */
UI.Caret.prototype.GetOffsetY = function() { return this.offsetY; }