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
	this.width = width;
	this.height = height;
	
	////////////////////
	// Initialization //
	////////////////////
	this.SetFocusable(false);
	this.image.src = imgsrc.validate(String);
	this.image.onload = function() { this.DispatchEvent(new UI.Image.Loaded()); }.bind(this);
	// Listen to our own events so we can do any processing before other listeners are triggered
	this.AddListener('loaded', this.OnLoaded);
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
	if (!keepDrawing || !this.IsLoaded() || this.GetWidth() <= 0 || this.GetHeight() <= 0) return false;

	context.drawImage(this.image, this.GetX(), this.GetY(), this.GetWidth(), this.GetHeight());

	return true;
}
/**
 * @returns {boolean}
 */
UI.Image.prototype.IsLoaded = function() { return this.loaded; }

/////////////////////
// Event Delegates //
/////////////////////
/**
 * Event triggered when the {@link UI.Image} is loaded. Listeners added after the image has
 * been loaded will not be called.
 * @event UI.Image.Loaded
 * @type {CustomEvent}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
 * @example
 * let image = new UI.Image("assets/checkbox/unchecked_normal.png", 5, 5);
 * image.AddListener('loaded', function(event) {
 *     console.log("image loaded");
 * }.bind(this));
 */
UI.Image.Loaded = function() {
	return new CustomEvent('loaded');
};

/////////////////////////////
// Internal Event Handling //
/////////////////////////////
/**
 * @param {UI.Image.event:Loaded} event
 * @returns {boolean} Whether or not the event was handled.
 */
UI.Image.prototype.OnLoaded = function(event) {
	if (!this.image || !this.image.complete || this.image.naturalWidth === undefined
		|| this.image.naturalWidth <= 0) {
		throw new Error("Image(): Failed to load image '" + this.image.src + "'.");
	}

	// Executed after the image has successfully loaded, because we need to use the width and height
	if (this.GetWidth() === undefined) this.SetWidth(this.image.width);
	else this.width.validate(Number);
	if (this.GetHeight() === undefined) this.SetHeight(this.image.height);
	else this.height.validate(Number);

	this.loaded = true;
	return true;
}