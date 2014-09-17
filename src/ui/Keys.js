// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\Keys.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      
//
// ================================================================================================

/**
 * @class
 * @param {number} keyCode
 * @param {string} char=''
 */
function Key(keyCode, char='') {
	this.keyCode = keyCode.validate(Number);
	this.char = char.validate(String);
}

/**
 * Array defining the possible keys Textboxes will accept input from
 * @readonly
 * @enum {Key}
 */
const ASCII = {
	SPACE: new Key(32, ' '),

	GRAVE: new Key(96, '`'),
	ACCENT: this.GRAVE,
	TILDE: new Key(126, '~'),

	ONE: new Key(49, '1'),
	EXCLAMATIONMARK: new Key(33, '!'),

	TWO: new Key(50, '2'),
	AT: new Key(64, '@'),

	THREE: new Key(51, '3'),
	POUND: new Key(35, '#'),
	HASH: this.POUND,

	FOUR: new Key(52, '4'),
	DOLLAR: new Key(36, '$'),

	FIVE: new Key(53, '5'),
	PERCENT: new Key(37, '%'),
	
	SIX: new Key(54, '6'),
	CARET: new Key(94, '^'),

	SEVEN: new Key(55, '7'),
	AMPERSAND: new Key(38, '&'),
	
	EIGHT: new Key(56, '8'),
	ASTERISK: new Key(42, '*'),
	
	NINE: new Key(57, '9'),
	PAREN_OPEN: new Key(40, '('),

	ZERO: new Key(48, '0'),
	PAREN_CLOSE: new Key(41, ')'),

	DASH: new Key(45, '-'),
	HYPHEN: this.DASH,
	UNDERSCORE: new Key(95, '_'),
	
	EQUALS: new Key(61, '='),
	PLUS: new Key(43, '+'),
	
	A_UPPER: new Key(65, 'A'),
	B_UPPER: new Key(66, 'B'),
	C_UPPER: new Key(67, 'C'),
	D_UPPER: new Key(68, 'D'),
	E_UPPER: new Key(69, 'E'),
	F_UPPER: new Key(70, 'F'),
	G_UPPER: new Key(71, 'G'),
	H_UPPER: new Key(72, 'H'),
	I_UPPER: new Key(73, 'I'),
	J_UPPER: new Key(74, 'J'),
	K_UPPER: new Key(75, 'K'),
	L_UPPER: new Key(76, 'L'),
	M_UPPER: new Key(77, 'M'),
	N_UPPER: new Key(78, 'N'),
	O_UPPER: new Key(79, 'O'),
	P_UPPER: new Key(80, 'P'),
	Q_UPPER: new Key(81, 'Q'),
	R_UPPER: new Key(82, 'R'),
	S_UPPER: new Key(83, 'S'),
	T_UPPER: new Key(84, 'T'),
	U_UPPER: new Key(85, 'U'),
	V_UPPER: new Key(86, 'V'),
	W_UPPER: new Key(87, 'W'),
	X_UPPER: new Key(88, 'X'),
	Y_UPPER: new Key(89, 'Y'),
	Z_UPPER: new Key(90, 'Z'),

	A_LOWER: new Key(97, 'a'),
	B_LOWER: new Key(98, 'b'),
	C_LOWER: new Key(99, 'c'),
	D_LOWER: new Key(100, 'd'),
	E_LOWER: new Key(101, 'e'),
	F_LOWER: new Key(102, 'f'),
	G_LOWER: new Key(103, 'g'),
	H_LOWER: new Key(104, 'h'),
	I_LOWER: new Key(105, 'i'),
	J_LOWER: new Key(106, 'j'),
	K_LOWER: new Key(107, 'k'),
	L_LOWER: new Key(108, 'l'),
	M_LOWER: new Key(109, 'm'),
	N_LOWER: new Key(110, 'n'),
	O_LOWER: new Key(111, 'o'),
	P_LOWER: new Key(112, 'p'),
	Q_LOWER: new Key(113, 'q'),
	R_LOWER: new Key(114, 'r'),
	S_LOWER: new Key(115, 's'),
	T_LOWER: new Key(116, 't'),
	U_LOWER: new Key(117, 'u'),
	V_LOWER: new Key(118, 'v'),
	W_LOWER: new Key(119, 'w'),
	X_LOWER: new Key(120, 'x'),
	Y_LOWER: new Key(121, 'y'),
	Z_LOWER: new Key(122, 'z'),

	BRACKET_OPEN: new Key(91, '['),
	CURLY_OPEN: new Key(123, '{'),

	BRACKET_CLOSE: new Key(93, ']'),
	CURLY_CLOSE: new Key(125, '}'),

	VERTICALBAR: new Key(124, '|'),
	ABSVALUE: this.VERTICALBAR,
	BACKSLASH: new Key(92, '\\'),

	SEMICOLON: new Key(59, ';'),
	COLON: new Key(58, ':'),
	
	COMMA: new Key(44, ','),
	LESSTHAN: new Key(60, '<'),
	
	PERIOD: new Key(46, '.'),
	GREATERTHAN: new Key(62, '>'),

	SINGLEQUOTE: new Key(39, '\''),
	APOSTROPHE: this.SINGLEQUOTE,
	DOUBLEQUOTE: new Key(34, '"'),
	QUOTE: this.DOUBLEQUOTE,

	FORWARDSLASH: new Key(47, '/'),
	QUESTIONMARK: new Key(63, '?'),

	getKey: function(which) {
		which.validate(Number);
		for (let key in Keys) {
			if (Keys[key] instanceof Key && Keys[key].keyCode == which)
				return Keys[key];
		}
		return null;
	}
};
Object.freeze(ASCII); // Make the enum immutable

/**
 * Array defining the possible keys to handle presses from, other than ASCII input
 * @readonly
 * @enum {Key}
 */
const Keys = {
	BACKSPACE: new Key(8),
	TAB: new Key(9),
	ENTER: new Key(13),
	RETURN: this.ENTER,
	INSERT: new Key(45),
	DELETE: new Key(46),
	HOME: new Key(36),
	END: new Key(35),
	PAGEUP: new Key(33),
	PAGEDOWN: new Key(34),
	ARROW_LEFT: new Key(37),
	ARROW_UP: new Key(38),
	ARROW_RIGHT: new Key(39),
	ARROW_DOWN: new Key(40)
};
Object.freeze(Keys); // Make the enum immutable

/**
 * Array defining the keys for which to prevent the default key action when they are pressed.
 * @readonly
 * @type {Key[]}
 */
const CapturedKeyCodes = [
	Keys.BACKSPACE,
	Keys.TAB,
	Keys.ENTER,
	Keys.PAGE_UP,
	Keys.PAGE_DOWN,
	Keys.END,
	Keys.HOME,
	Keys.ARROW_UP,
	Keys.ARROW_RIGHT,
	Keys.ARROW_DOWN,
	Keys.ARROW_LEFT,
	Keys.INSERT,
	Keys.DELETE
];
Object.freeze(CapturedKeyCodes); // Make the array immutable