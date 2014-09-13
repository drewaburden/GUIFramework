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
 * @param {string|CanvasGradient|CanvasPattern} [bgStyle='rgb(255, 255, 255)'] - GUI background style.
 * @param {boolean} [fullscreen=false] - Whether or not the canvas should take up the whole page.
 */
GUI.inherits(Drawable);
function GUI(width=0, height=0, bgStyle='white', fullscreen=true) {
	GUI.parent.constructor.call(this, 0, 0, width, height, true); // Super constructor

	///////////////
	// Variables //
	///////////////
	/** @type {number} */
	this.width = 0; // Set in OnResize
	/** @type {number} */
	this.height = 0; // Set in OnResize
	/** @type {string|CanvasGradient|CanvasPattern} */
	this.bgStyle = bgStyle.validate(String, CanvasGradient, CanvasPattern);
	/** @type {boolean} */
	this.fullscreen = false; // Set in OnResize
	/** @type {Component[]} */
	this.components = [];
	/** @type {Component} */
	this.focusedComponent = null;
	/** @type {Component} */
	this.hoveredComponent = null;

	////////////////////
	// Initialization //
	////////////////////
	this.OnResize(width.validate(Number), height.validate(Number), fullscreen.validate(Boolean));
}

///////////////
// Functions //
///////////////
/**
 * Destroy the GUI and all its components
 * @override
 */
GUI.prototype.Destroy = function() {
	GUI.parent.Destroy.apply(this, arguments); // super function call

	// Destroy components
	for (let component of this.components) {
		if (component) {
			component.Destroy();
			delete component;
		}
	}
	if (this.focusedComponent) delete this.focusedComponent;
}
/**
 * @override
 * @param {CanvasRenderingContext2D} context
 */
GUI.prototype.Draw = function(context) {
	GUI.parent.Draw.apply(this, arguments); // super function call

	if (!this.visible) return;

	for (let index = 0; index < this.components.length; ++index) {
		let component = this.components[index];
		if (component instanceof Drawable) component.Draw(context);
		else {
			console.warn("GUI tried to draw an object that wasn't an instance of a Drawable:\n"
				+ component + "\nRemoving object from GUI's component list.");
			this.components.splice(this.components.indexOf(component), 1);
		}
	}
}
/**
 * @param {number} width
 * @param {number} height
 * @param {boolean} fullscreen
 */
GUI.prototype.OnResize = function(width, height, fullscreen) {
	width.validate(Number); height.validate(Number); fullscreen.validate(Boolean);
	this.fullscreen = fullscreen;
	if (this.fullscreen) {
		this.width = document.body.clientWidth;
		this.height = document.body.clientHeight;
	}
	else {
		this.width = width;
		this.height = height;
	}
}
/**
 * @param {Component} component
 * @returns {boolean} True if focus was successfully given
 */
GUI.prototype.TryGiveFocusTo = function(component) {
	component.validate(Component);
	if (this.components.indexOf(component) < 0) throw new TypeError("TryGiveFocusTo(): The specified " + 
		"`component` is not a part of the GUI's component list.");
	if (component.IsFocusable()) {
		// Defocus currently focused Component, if there is one
		if (this.focusedComponent) this.focusedComponent.SetFocused(false);
		// Set the new focus to the specified Component
		component.SetFocused(true);
		this.focusedComponent = component;
		return true;
	}
	return false;
}
/**
 * [KeyDown description]
 * @param {[type]} key [description]
 */
GUI.prototype.OnKeyDown = function(key) {
	//key.validate(Number);
	if (this.focusedComponent) return this.focusedComponent.KeyDown(key);
	else return false;
}
/**
 * [KeyUp description]
 * @param {[type]} key [description]
 */
GUI.prototype.OnKeyUp = function(key) {
	//key.validate(Number);
	if (this.focusedComponent) return this.focusedComponent.KeyUp(key);
	else return false;
}
/**
 * [MouseDown description]
 * @param {[type]} x      [description]
 * @param {[type]} y      [description]
 * @param {[type]} button [description]
 */
GUI.prototype.OnMouseDown = function(x, y, button) {
	// Check if the mouse is still within the hovered component
	/*if (this.focusedComponent && !this.focusedComponent.MouseIntersects(x, y)) {
		this.focusedComponent.OnMouseOut();
		this.focusedComponent = null;
	}*/
	// Loop backwards so topmost components get priority
	for (let index = this.components.length-1; index >= 0; --index) {
		let component = this.components[index];
        if (!(component instanceof Component)) continue;
        
        // If the mouse is in the bounds of a component that can receive hover events
 		if (component.MouseIntersects(x, y) && Mixins.HasMixins(component, Mixins.Clickable)) {
 			// Try to give the component focus, and tell it the mouse has clicked on it
 			if (this.TryGiveFocusTo(component)) {
	    		component.OnMouseDown(x, y, button);
				// The rest of the loop would be looking at components underneath what the user is
				// hovering over, so break
				break;
			}
        }
    }
}
/**
 * [MouseUp description]
 * @param {[type]} button [description]
 */
GUI.prototype.OnMouseUp = function(x, y, button) {
	button.validate(Number);
	if (this.focusedComponent) this.focusedComponent.OnMouseUp(x, y, button);
}
/**
 * [OnMouseMove description]
 * @param {number} x
 * @param {number} y
 */
GUI.prototype.OnMouseMove = function(x, y) {
	// Check if the mouse is still within the hovered component
	if (this.hoveredComponent && !this.hoveredComponent.MouseIntersects(x, y)) {
		this.hoveredComponent.OnMouseOut(x, y);
		this.hoveredComponent = null;
	}
	// Loop backwards so topmost components get priority
	for (let index = this.components.length-1; index >= 0; --index) {
		let component = this.components[index];
        if (!(component instanceof Component)) continue;
        
        // If the mouse is in the bounds of a component that can receive hover events
 		if (component.MouseIntersects(x, y) && Mixins.HasMixins(component, Mixins.Hoverable)) {
        	// If there's already a hovered component, tell it the mouse has left
        	if (this.hoveredComponent) this.hoveredComponent.OnMouseOut(x, y);
        	// Set a new hovered component, and tell it the mouse has entered
    		component.OnMouseIn(x, y);
			this.hoveredComponent = component;
			// The rest of the loop would be looking at components underneath what the user is
			// hovering over, so break
			break;
        }
    }
}