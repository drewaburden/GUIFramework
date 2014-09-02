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
 * @extends {Drawable}
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @param {number} [width=0]
 * @param {number} [height=0]
 * @param {boolean} [visible=true]
 *
 * @todo  events
 */
function Component(x, y, width, height, visible) {
	Drawable.call(this, x, y, width, height, visible); // super constructor
}
Component.prototype = new Drawable(); // Inherits from Drawable