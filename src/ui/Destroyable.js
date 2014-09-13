// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\Destroyable.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      Abstract definition of an object that can be destroyed (uninitialized).
//
// ================================================================================================

/**
 * 
 * @abstract
 * @class
 */
function Destroyable() {}

///////////////
// Functions //
///////////////
/**
 * Handles any uninitialization for this Destroyable. This function is not automatically called.
 * Override in subclasses.
 * @abstract
 */
Destroyable.prototype.Destroy = function() {}