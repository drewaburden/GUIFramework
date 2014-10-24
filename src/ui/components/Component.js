// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\components\Component.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      Abstract definition of a UI component.
//
// ================================================================================================

/**
 * 
 * @abstract
 * @class
 * @extends {UI.Drawable}
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @param {number} [width=0]
 * @param {number} [height=0]
 * @param {boolean} [visible=true]
 */
UI.Component = function(x=0, y=0, width=0, height=0, visible=true) {
	UI.Component.parent.constructor.call(this, x, y, width, height, visible); // Super constructor

	///////////////
	// Variables //
	///////////////
	this.enabled = true;
	this.focusable = true;
	this.focused = false;
	this.listeners = [];
	this.isMouseOver = false;
	this.isMouseDown = false;
	this.isKeyDown = false;
	this.catchTab = false;
	this.catchEnter = false;

	////////////////////
	// Initialization //
	////////////////////
	// Listen to our own events so we can do any processing before other listeners are triggered
	this.AddListener('mousedown', this.OnMouseDown);
	this.AddListener('mouseup', this.OnMouseUp);
	this.AddListener('mousein', this.OnMouseIn.bind(this));
	this.AddListener('mouseout', this.OnMouseOut.bind(this));
	this.AddListener('keydown', this.OnKeyDown.bind(this));
	this.AddListener('keyup', this.OnKeyUp.bind(this));
	this.AddListener('keypress', this.OnKeyPress.bind(this));
}.inherits(UI.Drawable);

///////////////
// Functions //
///////////////
/**
 * @override
 */
UI.Component.prototype.Destroy = function() {
	UI.Component.parent.Destroy.apply(this, arguments);
}
/**
 * Handles all the drawing to the canvas for this {@link UI.Component}. Override in subclasses.
 * @abstract
 * @override
 * @param {CanvasRenderingContext2D} context
 */
UI.Component.prototype.Draw = function(context) {
	return UI.Component.parent.Draw.apply(this, arguments); // super function call
}
/**
 * @param {number} mouseX
 * @param {number} mouseY
 */
UI.Component.prototype.MouseIntersects = function(mouseX, mouseY) {
	mouseX.validate(Number);
	mouseY.validate(Number);
	if (!this.IsVisible()) return false;

	if (mouseX >= this.GetX() && mouseY >= this.GetY()
		&& mouseX <= this.GetX()+this.GetWidth() && mouseY <= this.GetY()+this.GetHeight())
		return true;
	else return false;
}

//////////////////////////
// Mutators & Accessors //
//////////////////////////
/**
 * @param {boolean} focusable - Whether or not this {@link UI.Component} is able to ever gain focus.
 */
UI.Component.prototype.SetFocusable = function(focusable) { this.focusable = focusable.validate(Boolean); }
/**
 * @returns {boolean}
 */
UI.Component.prototype.IsFocusable = function() {
	if (!this.focusable || !this.IsEnabled() || !this.IsVisible()) return false
;	else return true;
}

/**
 * @param {boolean} focused
 * @fires UI.Component.FocusChanged
 */
UI.Component.prototype.SetFocused = function(focused) {
	focused.validate(Boolean);
	if (!this.IsEnabled()) return;
	if (!this.IsVisible()) return;

	this.focused = focused;

	this.DispatchEvent(new UI.Component.FocusChanged(this.IsFocused()));
}
/**
 * @returns {boolean}
 */
UI.Component.prototype.IsFocused = function() { return this.focused; }
/**
 * @param {boolean} enabled
 */
UI.Component.prototype.SetEnabled = function(enabled) { this.enabled = enabled.validate(Boolean); }
/**
 * @returns {boolean}
 */
UI.Component.prototype.IsEnabled = function() { return this.enabled; }
/**
 * @returns {boolean}
 */
UI.Component.prototype.IsMouseOver = function() { return this.isMouseOver; }
/**
 * @returns {boolean}
 */
UI.Component.prototype.IsMouseDown = function() { return this.isMouseDown; }
/**
 * @returns {boolean}
 */
UI.Component.prototype.IsKeyDown = function() { return this.isKeyDown; }
/**
 * @returns {boolean}
 */
UI.Component.prototype.ShouldCatchTab = function() { return this.catchTab; }
/**
 * @returns {boolean}
 */
UI.Component.prototype.ShouldCatchEnter = function() { return this.catchEnter; }

////////////
// Events //
////////////
/**
 * @param {Event} event
 */
UI.Component.prototype.DispatchEvent = function(event) {
	event.validate(Event);
	if (this.listeners[event.type]) {
		for (let index = 0; index < this.listeners[event.type].length; ++index) {
			let callback = this.listeners[event.type][index];
			callback.call(this, event);
		}
	}
}
/**
 * @param {string}   message  - Event message to listen for.
 * @param {function} callback - Function to run when the specified `message` has been dispatched.
 */
UI.Component.prototype.AddListener = function(message, callback) {
	message.validate(String);
	callback.validate(Function);
	if (!this.listeners[message]) this.listeners[message] = [];
	this.listeners[message].push(callback);
}
/**
 * @param {string}   message  - Event message that was being listened for.
 * @param {function} callback - Function that was to run when the specified `message` had been dispatched.
 */
UI.Component.prototype.RemoveListener = function(message, callback) {
	message.validate(String);
	callback.validate(Function);
	let index = this.listeners[message].indexOf(callback);
	if (index > 0) {
		this.listeners[message].splice(index, 1);
	}
}

/////////////////////
// Event Delegates //
/////////////////////
/**
 * Event triggered when the {@link UI.Component}'s focus state changes.
 * @event UI.Component.FocusChanged
 * @type {CustomEvent}
 * @property {boolean} focused - Whether or not the {@link UI.Component} is now focused or not.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
 * @example
 * let button = new UI.Button("test button", 25, 25, 120, 35, true);
 * button.AddListener('focuschanged', function(event) {
 *     if (event.detail.focused) console.log("focused");
 *     else console.log("unfocused");
 * }.bind(this));
 */
UI.Component.FocusChanged = function(focused) {
	focused.validate(Boolean);
	return new CustomEvent('focuschanged', { bubbles: true, cancelable: true, detail: { focused } });
};
/**
 * Event triggered when a mouse button is pressed on this {@link UI.Component}.
 * @event UI.Component.MouseDown
 * @type {CustomEvent}
 * @property {number} x
 * @property {number} y
 * @property {number} button
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
 * @example
 * let button = new UI.Button("test button", 25, 25, 120, 35, true);
 * button.AddListener('mousedown', function(event) {
 *     console.log(event.detail.x + " " + event.detail.y + " " + event.detail.button);
 * }.bind(this));
 */

UI.Component.MouseDown = function(x, y, button) {
	x.validate(Number); y.validate(Number); button.validate(Number);
	return new CustomEvent('mousedown', { bubbles: true, cancelable: true, detail: { x, y, button } });
};
/**
 * Event triggered when a mouse button is released on this {@link UI.Component}.
 * @event UI.Component.MouseUp
 * @type {CustomEvent}
 * @property {number} x
 * @property {number} y
 * @property {number} button
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
 * @example
 * let button = new UI.Button("test button", 25, 25, 120, 35, true);
 * button.AddListener('mouseup', function(event) {
 *     console.log(event.detail.x + " " + event.detail.y + " " + event.detail.button);
 * }.bind(this));
 */
UI.Component.MouseUp = function(x, y, button) {
	x.validate(Number); y.validate(Number); button.validate(Number);
	return new CustomEvent('mouseup', { bubbles: true, cancelable: true, detail: { x, y, button } });
};
/**
 * Event triggered when the mouse enters the bounds of this {@link UI.Component}.
 * @event UI.Component.MouseIn
 * @type {CustomEvent}
 * @property {number} x
 * @property {number} y
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
 * @example
 * let button = new UI.Button("test button", 25, 25, 120, 35, true);
 * button.AddListener('mousein', function(event) {
 *     console.log(event.detail.x + " " + event.detail.y);
 * }.bind(this));
 */
UI.Component.MouseIn = function(x, y) {
	x.validate(Number); y.validate(Number);
	return new CustomEvent('mousein', { bubbles: true, cancelable: true, detail: { x, y } });
};
/**
 * Event triggered when the mouse exits the bounds of this {@link UI.Component}.
 * @event UI.Component.MouseOut
 * @type {CustomEvent}
 * @property {number} x
 * @property {number} y
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
 * @example
 * let button = new UI.Button("test button", 25, 25, 120, 35, true);
 * button.AddListener('mouseout', function(event) {
 *     console.log(event.detail.x + " " + event.detail.y);
 * }.bind(this));
 */
UI.Component.MouseOut = function(x, y) {
	x.validate(Number); y.validate(Number);
	return new CustomEvent('mouseout', { bubbles: true, cancelable: true, detail: { x, y } });
};
/**
 * Event triggered when a key is down while this {@link UI.Component} has focus.
 * @event UI.Component.KeyDown
 * @type {CustomEvent}
 * @property {number}  key
 * @property {boolean} [shift=false]
 * @property {boolean} [alt=false]
 * @property {boolean} [ctrl=false]
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
 * @example
 * let button = new UI.Button("test button", 25, 25, 120, 35, true);
 * button.AddListener('keydown', function(event) {
 *     console.log("shift key down? " + event.detail.shift);
 *     switch (event.detail.key) {
 *         case Input.Key.VK_H:
 *             console.log("H key was pressed"); break;
 *     }
 * }.bind(this));
 */
UI.Component.KeyDown = function(key=undefined, shift=false, alt=false, ctrl=false) {
	key.validate(Number); shift.validate(Boolean); alt.validate(Boolean); ctrl.validate(Boolean);
	return new CustomEvent('keydown', { bubbles: true, cancelable: true, detail: { key, shift, alt, ctrl } });
};
/**
 * Event triggered when a key is released for this {@link UI.Component}.
 * @event UI.Component.KeyUp
 * @type {CustomEvent}
 * @property {number}  key
 * @property {boolean} [shift=false]
 * @property {boolean} [alt=false]
 * @property {boolean} [ctrl=false]
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
 * @example
 * let button = new UI.Button("test button", 25, 25, 120, 35, true);
 * button.AddListener('keyup', function(event) {
 *     console.log("shift key still down? " + event.detail.shift);
 *     switch (event.detail.key) {
 *         case Input.Key.VK_H:
 *             console.log("H key was released"); break;
 *     }
 * }.bind(this));
 */
UI.Component.KeyUp = function(key=undefined, shift=false, alt=false, ctrl=false) {
	key.validate(Number); shift.validate(Boolean); alt.validate(Boolean); ctrl.validate(Boolean);
	return new CustomEvent('keyup', { bubbles: true, cancelable: true, detail: { key, shift, alt, ctrl } });
};
/**
 * Event triggered when a key is pressed while this {@link UI.Component} has focus.
 * 
 * @event UI.Component.KeyPress
 * @type {CustomEvent}
 * @property {number} key
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
 * @example
 * let button = new UI.Button("test button", 25, 25, 120, 35, true);
 * button.AddListener('keypress', function(event) {
 *     console.log(String.fromCharCode(event.detail.key));
 * }.bind(this));
 */
UI.Component.KeyPress = function(key) {
	key.validate(Number);
	return new CustomEvent('keypress', { bubbles: true, cancelable: true, detail: { key } });
};

/////////////////////////////
// Internal Event Handling //
/////////////////////////////
/**
 * @abstract
 * @param {UI.Component.event:KeyDown} event
 * @returns {boolean} Whether or not the event was handled.
 */
UI.Component.prototype.OnKeyDown = function(event) {
	this.isKeyDown = true;
	return false;
}
/**
 * @abstract
 * @param {UI.Component.event:KeyPress} event
 * @returns {boolean} Whether or not the event was handled.
 */
UI.Component.prototype.OnKeyUp = function(event) {
	this.isKeyDown = false;
	return false;
}
/**
 * @abstract
 * @param {UI.Component.event:KeyPress} event
 * @returns {boolean} Whether or not the event was handled.
 */
UI.Component.prototype.OnKeyPress = function(event) {
	return false;
}
/**
 * @abstract
 * @param {UI.Component.event:MouseDown} event
 * @returns {boolean} Whether or not the event was handled.
 */
UI.Component.prototype.OnMouseDown = function(event) {
	this.isMouseDown = true;
	return false;
}
/**
 * @abstract
 * @param {UI.Component.event:MouseUp} event
 * @returns {boolean} Whether or not the event was handled.
 */
UI.Component.prototype.OnMouseUp = function(event) {
	this.isMouseDown = false;
	return false;
}
/**
 * @abstract
 * @param {UI.Component.event:MouseIn} event
 * @returns {boolean} Whether or not the event was handled.
 */
UI.Component.prototype.OnMouseIn = function(event) {
	this.isMouseOver = true;
	return false;
}
/**
 * @abstract
 * @param {UI.Component.event:MouseOut} event
 * @returns {boolean} Whether or not the event was handled.
 */
UI.Component.prototype.OnMouseOut = function(event) {
	this.isMouseOver = false;
	return false;
}