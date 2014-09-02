// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\TextAlign.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      Enum that defines the possible horizontal and vertical text alignments.
//
// ================================================================================================

/**
 * Enum defining the possible horizontal text alignment options
 * @readonly
 * @enum {const}
 */
var TextHAlign = {
	LEFT: 0,
	RIGHT: 1,
	CENTER: 2
};
if (Object.freeze) Object.freeze(TextHAlign); // Make the enum immutable