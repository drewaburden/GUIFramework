// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\NinePatch.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      Defines an object that can be used to load and display an image in ninepatch format.
//		This allows for background and border images that scale nicely.
//
// ================================================================================================

/**
 * 
 * @class
 * @extends {Drawable}
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
 * var ninePatchImage = new NinePatch("assets/bg.png", 5, 5, 150, 50, 14, 14, 14, 14, true);
 */
function NinePatch(imgsrc, x, y, width, height, leftMargin, topMargin, rightMargin, bottomMargin, fillCenter, visible) {
	Drawable.call(this, x, y, width, height, visible); // super constructor

	Mixins.Mix(NinePatch, Hoverable);

	this.leftMargin = optionalArg(leftMargin, 0);
	this.topMargin = optionalArg(topMargin, 0);
	this.rightMargin = optionalArg(rightMargin, 0);
	this.bottomMargin = optionalArg(bottomMargin, 0);
	this.fillCenter = optionalArg(fillCenter, true);	
	this.image = new Image();
	this.image.src = mandatoryArg(imgsrc);
	this.image.onload = function() {
		// Clamp the margins to make sure they make sense
		// Executed after the image has successfully loaded, because we need to use the width and height
		this.leftMargin = Math.clamp(this.leftMargin, 0, this.image.width);
		this.topMargin = Math.clamp(this.topMargin, 0, this.image.height);
		this.rightMargin = Math.clamp(this.rightMargin, 0, this.image.width-this.leftMargin);
		this.bottomMargin = Math.clamp(this.bottomMargin, 0, this.image.height-this.topMargin);
	}.bind(this);

	/**
	 * "Frees" loaded image.
	 */
	NinePatch.prototype.Destroy = function() {
		if (this.image) delete this.image;
	}

	/**
	 * Handles all the drawing to the canvas for this object.
	 */
	NinePatch.prototype.Draw = function() {
		if (!this.visible) return; // If this NinePatch isn't visible, don't do anything
		if (!this.image || !this.image.complete
			|| typeof this.image.naturalWidth == 'undefined'
			|| this.image.naturalWidth <= 0) {
			return; // We are still be loading the image, so we cannot draw it yet
		}

		// Re-scope the variables so we don't have to use the "this" keyword so much throughout this function
		var image = this.image,
			x = this.x,
			y = this.y,
			width = this.width,
			height = this.height,
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
	}	
}
NinePatch.prototype = new Drawable(); // Inherits from Drawable