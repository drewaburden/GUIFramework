// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\components\NinePatch.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      Defines an object that can be used to load and display an image in ninepatch format.
//		This allows for background and border images that scale nicely.
//
// ================================================================================================

/**
 * NinePatch
 * @class
 * @extends {UI.Image}
 * @param {string} imgsrc
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @param {number} [width=0]
 * @param {number} [height=0]
 * @param {number} [leftMargin=0]
 * @param {number} [topMargin=0]
 * @param {number} [rightMargin=0]
 * @param {number} [bottomMargin=0]
 * @param {boolean} [fillCenter=true]
 * @param {boolean} [visible=true]
 * @example
 * var ninePatchImage = new UI.NinePatch("assets/bg.png", 5, 5, 150, 50, 14, 14, 14, 14, true);
 */
UI.NinePatch = function(imgsrc=undefined, x=0, y=0, width=0, height=0, leftMargin=0, topMargin=0, rightMargin=0,
	bottomMargin=0, fillCenter=true, visible=true) {
	UI.NinePatch.parent.constructor.call(this, imgsrc, x, y, width, height, visible); // Super constructor

	///////////////
	// Variables //
	///////////////
	this.leftMargin = Math.abs(leftMargin.validate(Number));
	this.topMargin = Math.abs(topMargin.validate(Number));
	this.rightMargin = Math.abs(rightMargin.validate(Number));
	this.bottomMargin = Math.abs(bottomMargin.validate(Number));
	this.fillCenter = fillCenter.validate(Boolean);	
}.inherits(UI.Image);

///////////////
// Functions //
///////////////
/**
 * "Frees" loaded image.
 * @override
 */
UI.NinePatch.prototype.Destroy = function() {
	UI.NinePatch.parent.Destroy.apply(this, arguments); // super function call

	if (this.image) delete this.image;
}

/**
 * Handles all the drawing to the canvas for this object.
 * @override
 * @param {CanvasRenderingContext2D} context
 */
UI.NinePatch.prototype.Draw = function(context) {
	// Call UI.Image's super Draw function, not the actual UI.Image.Draw function.
	// We do this because, the inherited UI.Image.Draw function would draw an incorrect, additional image
	// underneath what is drawn by UI.NinePatch.Draw, and we don't want that.
	let keepDrawing = UI.Image.parent.Draw.apply(this, arguments); // super function call
	if (!keepDrawing || !this.IsLoaded() || this.GetWidth() <= 0 || this.GetHeight() <= 0) return false;

	// Re-scope the variables so we don't have to use the "this" keyword so much throughout this function
	let image = this.image,
		x = this.GetX(),
		y = this.GetY(),
		width = this.GetWidth(),
		height = this.GetHeight(),
		leftMargin = this.leftMargin,
		topMargin = this.topMargin,
		rightMargin = this.rightMargin,
		bottomMargin = this.bottomMargin;

	////////////
	// Center //
	////////////
	if (this.fillCenter) {
		context.drawImage(image,
		leftMargin, topMargin, image.width-leftMargin-rightMargin, image.height-topMargin-bottomMargin,
		x+leftMargin, y+topMargin, width-leftMargin-rightMargin, height-topMargin-bottomMargin);
	}
	///////////
	// Edges //
	///////////
	// Left
	context.drawImage(image,
		0, topMargin, leftMargin, image.height-topMargin-bottomMargin,
		x, y+topMargin, leftMargin, height-topMargin-bottomMargin);
	// Top
	context.drawImage(image,
		leftMargin, 0, image.width-leftMargin-rightMargin, topMargin,
		x+leftMargin, y, width-leftMargin-rightMargin, topMargin);
	// Right
	context.drawImage(image,
		image.width-rightMargin, topMargin, rightMargin, image.height-topMargin-bottomMargin,
		x+width-rightMargin, y+topMargin, rightMargin, height-topMargin-bottomMargin);
	// Bottom
	context.drawImage(image,
		leftMargin, image.height-bottomMargin, image.width-leftMargin-rightMargin, bottomMargin,
		x+leftMargin, y+height-bottomMargin, width-leftMargin-rightMargin, bottomMargin);
	/////////////
	// Corners //
	/////////////
	// Top left corner
	context.drawImage(image,
		0, 0, leftMargin, topMargin,
		x, y, leftMargin, topMargin);
	// Top right corner
	context.drawImage(image,
		image.width-rightMargin, 0, rightMargin, topMargin,
		x+width-rightMargin, y, rightMargin, topMargin);
	// Bottom right corner
	context.drawImage(image,
		image.width-rightMargin, image.height-bottomMargin, rightMargin, bottomMargin,
		x+width-rightMargin, y+height -bottomMargin, rightMargin, bottomMargin);
	// Bottom left corner
	context.drawImage(image,
		0, image.height-bottomMargin, leftMargin, bottomMargin,
		x, y+height-bottomMargin, leftMargin, bottomMargin);

	return true;
}

/////////////////////////////
// Internal Event Handling //
/////////////////////////////
/**
 * @param {UI.Image.event:Loaded} event
 * @returns {boolean} Whether or not the event was handled.
 */
UI.NinePatch.prototype.OnLoaded = function(event) {
	UI.NinePatch.parent.OnLoaded.apply(this, arguments); // super function call
	// Clamp the margins and dimensions to make sure they make sense
	// Executed after the image has successfully loaded, because we need to use the width and height
	this.leftMargin = Math.clamp(this.leftMargin, 0, this.image.width);
	this.topMargin = Math.clamp(this.topMargin, 0, this.image.height);
	this.rightMargin = Math.clamp(this.rightMargin, 0, this.image.width-this.leftMargin);
	this.bottomMargin = Math.clamp(this.bottomMargin, 0, this.image.height-this.topMargin);
	this.width = Math.clamp(this.width, this.leftMargin+this.rightMargin, Number.MAX_VALUE);
	this.height = Math.clamp(this.height, this.topMargin+this.bottomMargin, Number.MAX_VALUE);
	return true;
}