// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\components\Caret.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      Defines an object that can be used to load and display an image.
//
// ================================================================================================

/**
 * Caret
 * @class
 * @extends {Component}
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @param {number} [height=image.height]
 * @param {boolean} [visible=true]
 */
Caret.inherits(Component);
function Caret(x=0, y=0, height, visible=true) {
	Caret.parent.constructor.call(this, x, y, 1, height, visible); // Super constructor

	this.focusable = false;
	this.blinking = false;
	this.blinkFrequency = 500; // Milliseconds between blinks
	this.position = 0;

	this.intervalId = null;
	if (visible) this.StartBlinking();
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
	Caret.parent.Draw.apply(this, arguments); // super function call

	if (!this.blinking || !this.visible) return;

	context.strokeStyle = 'white';
	context.lineWidth = this.width;
	// Add 0.5 to everything, because otherwise, the line will be 2px wide
	context.beginPath();
	context.moveTo(this.x+0.5, this.y+0.5);
	context.lineTo(this.x+0.5, this.y+this.height+0.5);
	context.stroke();
}

Caret.prototype.StartBlinking = function() {
	if (!this.blinking) {
		this.intervalId = setInterval(function() { this.visible = !this.visible; }.bind(this), this.blinkFrequency);
		this.visible = true;
		this.blinking = true;
	}
}
Caret.prototype.StopBlinking = function() {
	if (this.blinking) {
		clearInterval(this.intervalId);
		this.blinking = false;
		this.visible = false;
	}
}
Caret.prototype.RecalculatePosition = function(visibleText) {

}