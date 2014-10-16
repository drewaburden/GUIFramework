// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\GUI.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      Definition of a GUI.
//
// ================================================================================================

/**
 * @class
 * @extends {UI.Drawable}
 * @param {number} [width=0]
 * @param {number} [height=0]
 * @param {string|CanvasGradient|CanvasPattern} [bgStyle='rgb(255, 255, 255)'] - GUI background style.
 * @param {boolean} [fullscreen=true] - Whether or not the canvas should take up the whole page.
 */
UI.GUI = function(width=0, height=0, bgStyle='white', fullscreen=true) {
	UI.GUI.parent.constructor.call(this, 0, 0, width, height, true); // Super constructor

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
	/** @type {UI.Component[]} */
	this.components = [];
	/** @type {UI.Component} */
	this.focusedComponent = null;
	/** @type {UI.Component} */
	this.hoveredComponent = null;

	////////////////////
	// Initialization //
	////////////////////
	this.Resize(width.validate(Number), height.validate(Number), fullscreen.validate(Boolean));
}.inherits(UI.Drawable);

///////////////
// Functions //
///////////////
/**
 * Destroy the {@link UI.GUI} and all its components
 * @override
 */
UI.GUI.prototype.Destroy = function() {
	UI.GUI.parent.Destroy.apply(this, arguments); // super function call

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
UI.GUI.prototype.Draw = function(context) {
	let keepDrawing = UI.GUI.parent.Draw.apply(this, arguments); // super function call
	if (!keepDrawing) return false;

	for (let index = 0; index < this.components.length; ++index) {
		let component = this.components[index];
		if (component instanceof UI.Drawable) component.Draw(context);
		else {
			console.warn("GUI tried to draw an object that wasn't an instance of a Drawable:\n"
				+ component + "\nRemoving object from GUI's component list.");
			this.components.splice(this.components.indexOf(component), 1);
		}
	}

	return true;
}
/**
 * @param {number} width
 * @param {number} height
 * @param {boolean} [fullscreen=this.fullscreen]
 */
UI.GUI.prototype.Resize = function(width=undefined, height=undefined, fullscreen=this.fullscreen) {
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
 * @param {UI.Component} component
 * @returns {boolean} True if focus was successfully given
 */
UI.GUI.prototype.TryGiveFocusTo = function(component) {
	component.validate(UI.Component);
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
 * Removes the focus from the currently focused {@link UI.Component}.
 */
UI.GUI.prototype.ClearFocus = function() {
	// Defocus currently focused Component, if there is one
	if (this.focusedComponent) this.focusedComponent.SetFocused(false);
	this.focusedComponent = null;
}
/**
 * @param {number} key
 * @param {boolean} shift
 * @param {boolean} alt
 * @param {boolean} ctrl
 * @fires UI.Component.KeyDown
 */
UI.GUI.prototype.OnKeyDown = function(key, shift, alt, ctrl) {
	if (this.focusedComponent)
		return this.focusedComponent.DispatchEvent(UI.Component.KeyDown, { key, shift, alt, ctrl });
	else
		return false;
}
/**
 * @param {number} key
 * @param {boolean} shift
 * @param {boolean} alt
 * @param {boolean} ctrl
 * @fires UI.Component.KeyUp
 */
UI.GUI.prototype.OnKeyUp = function(key, shift, alt, ctrl) {
	if (this.focusedComponent)
		return this.focusedComponent.DispatchEvent(new UI.Component.KeyUp(key, shift, alt, ctrl));
	else
		return false;
}
/**
 * @param {number} key
 * @fires UI.Component.KeyPress
 */
UI.GUI.prototype.OnKeyPress = function(key) {
	if (this.focusedComponent)
		return this.focusedComponent.DispatchEvent(new UI.Component.KeyPress(key));
	else
		return false;
}
/**
 * @param {number} x
 * @param {number} y
 * @param {number} button
 * @fires UI.Component.MouseDown
 */
UI.GUI.prototype.OnMouseDown = function(x, y, button) {
	// Loop backwards so topmost components get priority
	for (let index = this.components.length-1; index >= 0; --index) {
		let component = this.components[index];
        if (!(component instanceof UI.Component)) continue;
        
        // If the mouse is in the bounds of a component that can receive hover events
 		if (component.MouseIntersects(x, y)) {
 			// Try to give the component focus, and tell it the mouse has clicked on it
 			if (this.TryGiveFocusTo(component)) {
 				component.DispatchEvent(new UI.Component.MouseDown(x, y, button));
	    		//component.OnMouseDown(x, y, button);
				// The rest of the loop would be looking at components underneath what the user is
				// hovering over, so return
				return true;
			}
        }
    }
    // If the user clicked on nothing focusable, remove any current focus
    this.ClearFocus();

    return false;
}
/**
 * @param {number} x
 * @param {number} y
 * @param {number} button
 * @fires UI.Component.MouseUp
 */
UI.GUI.prototype.OnMouseUp = function(x, y, button) {
	button.validate(Number);
	if (this.focusedComponent)
		return this.focusedComponent.DispatchEvent(new UI.Component.MouseUp(x, y, button));
	else
		return false;
}
/**
 * @param {number} x
 * @param {number} y
 * @fires UI.Component.MouseOut
 * @fires UI.Component.MouseIn
 */
UI.GUI.prototype.OnMouseMove = function(x, y) {
	// Check if the mouse is still within the hovered component
	if (this.hoveredComponent && !this.hoveredComponent.MouseIntersects(x, y)) {
		this.hoveredComponent.DispatchEvent(new UI.Component.MouseOut(x, y));
		this.hoveredComponent = null;
	}
	// Loop backwards so topmost components get priority
	for (let index = this.components.length-1; index >= 0; --index) {
		let component = this.components[index];
        if (!(component instanceof UI.Component)) continue;
        
        // If the mouse is in the bounds of a component that can receive hover events
 		if (component.MouseIntersects(x, y)) {
        	// If there is already some other hovered component, tell it the mouse has left
        	if (this.hoveredComponent && this.hoveredComponent !== component)
        		this.hoveredComponent.DispatchEvent(new UI.Component.MouseOut(x, y));
        	// Set a new hovered component, and tell it the mouse has entered
        	this.hoveredComponent = component;
        	component.DispatchEvent(new UI.Component.MouseIn(x, y));
			// The rest of the loop would be looking at components underneath what the user is
			// hovering over, so return
			return true;
        }
    }
  
    return false;
}

/**
 * @param {UI.Component} component
 */
UI.GUI.prototype.AddComponent = function(component) {
	component.validate(UI.Component)
	if (component.gui && component.gui !== this)
		throw new Error("AddComponent(): The specified Component already belongs to a different GUI.");
	component.gui = this;
	this.components.push(component);
}
/**
 * @param {UI.Component} component
 */
UI.GUI.prototype.RemoveComponent = function(component) {
	component.validate(UI.Component)
	let index = this.components.indexOf(component);
	if (index < 0 || component.gui !== this)
		throw new Error("RemoveComponent(): The specified Component does not exist in the context of this GUI.");
	this.components.splice(index, 1);
	component.gui = null;
}