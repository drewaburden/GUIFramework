// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\components\Img.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      Defines an object that can be used to load and display an image.
//
// ================================================================================================

Img.inherits(Component);
/**
 * Img
 * @class
 * @extends {Component}
 * @param {string} imgsrc
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @param {number} [width=image.width]
 * @param {number} [height=image.height]
 * @param {boolean} [visible=true]
 * @example
 * var image = new Img("assets/bg.png", 5, 5, 150, 50, true);
 */
function Img(imgsrc=undefined, x=0, y=0, width=undefined, height=undefined, visible=true) {
	Img.parent.constructor.call(this, x, y, width, height, visible); // Super constructor

	this.focusable = false;

	///////////////
	// Variables //
	///////////////
	/** @type {Image} */
	this.image = new Image();
	/** @type {boolean} */
	this.loaded = false;

	/////////////////////
	// Event delegates //
	/////////////////////
	/** Event functions called when all loading and initialization has been completed for this Img.
	 * @type {function[]}
	 * @example
	 * var img = new Img("image.jpg");
	 * img.onload.push(function() {console.log("image loaded!");});
	 */
	this.onload = [];
	
	////////////////////
	// Initialization //
	////////////////////
	this.image.src = imgsrc.validate(String);
	this.image.onload = function() {
		if (!this.image || !this.image.complete || this.image.naturalWidth === undefined
		|| this.image.naturalWidth <= 0) {
			throw new Error("Image(): Failed to load image '" + this.image.src + "'.");
		}

		// Executed after the image has successfully loaded, because we need to use the width and height
		if (width === undefined) this.width = this.image.width;
		else this.width = width.validate(Number);
		if (height === undefined) this.height = this.image.height;
		else this.height = height.validate(Number);

		this.loaded = true;
		for (let listener of this.onload) {
			listener.validate(Function);
			listener();
		}
	}.bind(this);
}

///////////////
// Functions //
///////////////
/**
 * "Frees" loaded image.
 * @override
 */
Img.prototype.Destroy = function() {
	Img.parent.Destroy.apply(this, arguments); // super function call

	if (this.image) delete this.image;
}

/**
 * Handles all the drawing to the canvas for this object.
 * @override
 * @param {CanvasRenderingContext2D} context
 */
Img.prototype.Draw = function(context) {
	let keepDrawing = Img.parent.Draw.apply(this, arguments); // super function call
	if (!keepDrawing || !this.loaded || this.width <= 0 || this.height <= 0) return false;

	context.drawImage(this.image, this.x, this.y, this.width, this.height);

	return true;
}