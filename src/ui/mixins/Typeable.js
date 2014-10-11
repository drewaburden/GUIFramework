// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\mixins\Typeable.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      
//
// ================================================================================================

/**
 * 
 * @enum {string}
 */
var InputType = {
	ANY: 						'',
	NUMERIC: 					'0123456789',
	ALPHABETIC: 				'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
	ALPHANUMERIC: 				'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
	ALPHANUMERIC_PUNCTUATION: 	'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,.?!-\'"',
	EMAIL: 						'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@.!#$%&\'*+-/=?_^`{|}~'
};
Object.freeze(InputType); // Make the enum immutable
/**
 * 
 * @enum {string}
 */
var IgnoredKeyPressChars = {
	DEFAULT: 	'\b\n\r\t'
};
Object.freeze(IgnoredKeyPressChars); // Make the enum immutable

/**
 *
 * @mixin
 */
Mixins.Typeable = {
	///////////////
	// Variables //
	///////////////
	/** @type {InputType} */
	inputType: InputType.ANY,
	/** @type {InputType} */
	ignoredKeyPressChars: IgnoredKeyPressChars.DEFAULT,
	/** @type {boolean} */
	isKeyDown: false,
	/** @type {boolean} */
	catchTab: false,
	/** @type {boolean} */
	catchEnter: false,

	/////////////////////
	// Event delegates //
	/////////////////////
	/** Event functions called when the mixed class receives the onKeyDown event from the GUIFramework.
	 * @type {function[]}
	 */
	onKeyDown: [],
	/** Event functions called when the mixed class receives the onKeyUp event from the GUIFramework.
	 * @type {function[]}
	 */
	onKeyUp: [],
	/** Event functions called when the mixed class receives the onKeyPress event from the GUIFramework.
	 * @type {function[]}
	 */
	onKeyPress: [],

	///////////////
	// Functions //
	///////////////
	/**
	 * Receiver of the onKeyDown event from the GUIFramework.
	 * This is called when GUIFramework determines that a key is down on a focused {@link UI.Component} with
	 * this Mixin.
	 * @param {Input.Key} key
	 * @param {boolean} shift
	 * @param {boolean} alt
	 * @param {boolean} ctrl
	 */
	OnKeyDown: function(key, shift, alt, ctrl) {
		this.isKeyDown = true;
		// Notify all listeners
		for (let listener of this.onKeyDown) {
			listener.validate(Function);
			listener(key, shift, alt, ctrl);
		}
	},
	/**
	 * Receiver of the onKeyUp event from the GUIFramework.
	 * This is called when GUIFramework determines that a key has been released.
	 * @param {Input.Key} key
	 * @param {boolean} shift
	 * @param {boolean} alt
	 * @param {boolean} ctrl
	 * 
	 */
	OnKeyUp: function(key, shift, alt, ctrl) {
		// If the key was released and the KeyDown actually started on this component
		if (this.isKeyDown) {
			this.isKeyDown = false;
			// Notify all listeners
			for (let listener of this.onKeyUp) {
				listener.validate(Function);
				listener(key, shift, alt, ctrl);
			}
		}
	},
	/**
	 * Receiver of the onKeyPress event from the GUIFramework.
	 * This is called when GUIFramework determines that a key has been pressed. Mostly used
	 * for simple text input detection.
	 * @param {Input.Key} key
	 */
	OnKeyPress: function(key) {
		if (this.ignoredKeyPressChars.toString().indexOf(String.fromCharCode(key)) == -1
				&& (this.inputType === InputType.ANY
					|| this.inputType.toString().indexOf(String.fromCharCode(key)) != -1)) {
			// Notify all listeners
			for (let listener of this.onKeyPress) {
				listener.validate(Function);
				listener(key);
			}
		}
	}
};