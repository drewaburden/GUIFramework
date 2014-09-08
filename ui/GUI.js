// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\GUI.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      Abstract definition of a UI component.
//
// ================================================================================================

/**
 * @class
 * @extends {Drawable}
 * @param {number} [width=0]
 * @param {number} [height=0]
 * @param {string} [bgStyle='rgb(255, 255, 255)'] - GUI background style. Could be a text color,
 *                                                  rgb color, gradient, etc.
 *
 * @todo  Events
 */
function GUI(width, height, bgStyle) {
	Drawable.call(this, 0, 0, width, height, true); // super constructor

	this.width = optionalArg(width, 0);
	this.height = optionalArg(height, 0);
	this.bgStyle = optionalArg(bgStyle, "rgb(255, 255, 255)");
	
	/** @type {Component[]} */
	this.components = [];

	/**
	 * Destroy the GUI and all its components
	 */
	GUI.prototype.Destroy = function() {
		// Unregister events
		
		// Destroy components
		for (component in this.components) {
			if (component instanceof Destroyable) component.Destroy();
			delete component;
		}
	}
	GUI.prototype.Draw = function(context) {
		for (var index = 0; index < this.components.length; ++index) {
    		var component = this.components[index];
			if (component instanceof Drawable) component.Draw(context);
			else {
				console.warn("GUI tried to draw an object that wasn't an instance of a Drawable:\n"
					+ component + "\nRemoving object from GUI's component list.");
				this.components.splice(this.components.indexOf(component), 1);
			}
		}
	}
}
GUI.prototype = new Drawable(); // Inherits from Drawable