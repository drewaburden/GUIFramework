// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\components\Image.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      Defines an object that can be used to load and display an image.
//
// ================================================================================================

/**
 * Image
 * @class
 * @extends {UI.Component}
 * @param {string} imgsrc
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @param {number} [width=image.width]
 * @param {number} [height=image.height]
 * @param {boolean} [visible=true]
 * @example
 * var image = new UI.Image("assets/bg.png", 5, 5, 150, 50, true);
 */
UI.Image = function(imgsrc=undefined, x=0, y=0, width=undefined, height=undefined, visible=true) {
	UI.Image.parent.constructor.call(this, x, y, width, height, visible); // Super constructor

	///////////////
	// Variables //
	///////////////
	this.image = new Image(); // js Image, not UI.Image
	this.loaded = false;

	/////////////////////
	// Event delegates //
	/////////////////////
	/** Event functions called when all loading and initialization has been completed for this {@link UI.Image}.
	 * @type {function[]}
	 * @example
	 * var img = new UI.Image("image.jpg");
	 * img.onload.push(function() {console.log("image loaded!");});
	 */
	this.onload = [];
	
	////////////////////
	// Initialization //
	////////////////////
	this.SetFocusable(false);
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
}.inherits(UI.Component);

///////////////
// Functions //
///////////////
/**
 * "Frees" loaded image.
 * @override
 */
UI.Image.prototype.Destroy = function() {
	UI.Image.parent.Destroy.apply(this, arguments); // super function call

	if (this.image) delete this.image;
}

/**
 * Handles all the drawing to the canvas for this object.
 * @override
 * @param {CanvasRenderingContext2D} context
 */
UI.Image.prototype.Draw = function(context) {
	let keepDrawing = UI.Image.parent.Draw.apply(this, arguments); // super function call
	if (!keepDrawing || !this.loaded || this.width <= 0 || this.height <= 0) return false;

	context.drawImage(this.image, this.x, this.y, this.width, this.height);

	return true;
}