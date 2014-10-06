// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\GUI.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      Definition of a UI.
//
// ================================================================================================

GUI.inherits(Drawable);
/**
 * @class
 * @extends {Drawable}
 * @param {number} [width=0]
 * @param {number} [height=0]
 * @param {string|CanvasGradient|CanvasPattern} [bgStyle='rgb(255, 255, 255)'] - GUI background style.
 * @param {boolean} [fullscreen=true] - Whether or not the canvas should take up the whole page.
 */
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
	this.Resize(width.validate(Number), height.validate(Number), fullscreen.validate(Boolean));
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
 * @param {boolean} [fullscreen=this.fullscreen]
 */
GUI.prototype.Resize = function(width=undefined, height=undefined, fullscreen=this.fullscreen) {
	width.validate(Number); height.validate(Number); fullscreen.validate(Boolean);
	this.fullscreen = fullscreen;
	if (this.fullscreen === true) {
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
	if (this.focusedComponent == component) return true;
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
 * Removes the focus from the currently focused component.
 */
GUI.prototype.ClearFocus = function() {
	// Defocus currently focused Component, if there is one
	if (this.focusedComponent) this.focusedComponent.SetFocused(false);
	this.focusedComponent = null;
}
/**
 * @param {number} key
 * @param {boolean} shift
 * @param {boolean} alt
 * @param {boolean} ctrl
 */
GUI.prototype.OnKeyDown = function(key, shift, alt, ctrl) {
	if (this.focusedComponent
		&& Mixins.HasMixins(this.focusedComponent, Mixins.Typeable))
		return this.focusedComponent.OnKeyDown(key, shift, alt, ctrl);
	else return false;
}
/**
 * @param {number} key
 * @param {boolean} shift
 * @param {boolean} alt
 * @param {boolean} ctrl
 */
GUI.prototype.OnKeyUp = function(key, shift, alt, ctrl) {
	if (this.focusedComponent
		&& Mixins.HasMixins(this.focusedComponent, Mixins.Typeable))
		return this.focusedComponent.OnKeyUp(key, shift, alt, ctrl);
	else return false;
}
/**
 * @param {number} key
 */
GUI.prototype.OnKeyPress = function(key) {
	if (this.focusedComponent
		&& Mixins.HasMixins(this.focusedComponent, Mixins.Typeable)) {
		return this.focusedComponent.OnKeyPress(key);
	}
	else return false;
}
/**
 * @param {number} x
 * @param {number} y
 * @param {number} button
 */
GUI.prototype.OnMouseDown = function(x, y, button) {
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
				// hovering over, so return
				return;
			}
        }
    }
    // If the user clicked on nothing focusable, remove any current focus
    this.ClearFocus();
}
/**
 * @param {number} x
 * @param {number} y
 * @param {number} button
 */
GUI.prototype.OnMouseUp = function(x, y, button) {
	button.validate(Number);
	if (this.focusedComponent) this.focusedComponent.OnMouseUp(x, y, button);
}
/**
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