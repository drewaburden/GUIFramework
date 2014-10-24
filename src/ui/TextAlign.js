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
 * @enum {string}
 */
UI.TextHAlign = {
	START: 'start',
	END: 'end',
	LEFT: 'left',
	RIGHT: 'right',
	CENTER: 'center'
};
Object.freeze(UI.TextHAlign); // Make the enum immutable

/**
 * Enum defining the possible vertical text alignment options
 * @readonly
 * @enum {string}
 */
UI.TextVAlign = {
	TOP: 'top',
	BOTTOM: 'bottom',
	MIDDLE: 'middle',
	ALPHABETIC: 'alphabetic',
	HANGING: 'hanging',
	IDEOGRAPHIC: 'ideographic'
};
Object.freeze(UI.TextVAlign); // Make the enum immutable