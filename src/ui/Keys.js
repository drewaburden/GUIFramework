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
 * Array defining the possible key codes Textboxes will accept input from
 * @readonly
 * @type {number[]}
 */
const ASCIIKeyCodes = [
	32, // space
	48, // 0
	49, // 1
	50, // 2
	51, // 3
	52, // 4
	53, // 5
	54, // 6
	55, // 7
	56, // 8
	57, // 9
	59, // ;
	61, // =
	65, // a
	66, // b
	67, // c
	68, // d
	69, // e
	70, // f
	71, // g
	72, // h
	73, // i
	74, // j
	75, // k
	76, // l
	77, // m
	78, // n
	79, // o
	80, // p
	81, // q
	82, // r
	83, // s
	84, // t
	85, // u
	86, // v
	87, // w
	88, // x
	89, // y
	90, // z
	96, // numpad 0
	97, // numpad 1
	98, // numpad 2
	99, // numpad 3
	100, // numpad 4
	101, // numpad 5
	102, // numpad 6
	103, // numpad 7
	104, // numpad 8
	105, // numpad 9
	106, // numpad *
	107, // numpad +
	109, // numpad -
	110, // numpad .
	111, // numpad /
	173, // -
	188, // ,
	190, // .
	191, // /
	192, // `
	219, // [
	220, // \
	221, // ]
	222 // '
];
if (Object.freeze) Object.freeze(ASCIIKeyCodes); // Make the array immutable

/**
 * Array defining the characters that the key codes in ASCIIKeyCodes correspond to.
 * @readonly
 * @type {string[]}
 */
const ASCIICharacters = [
	' ',
	'0',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	';',
	'=',
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
	'0',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'*',
	'+',
	'-',
	'.',
	'/',
	'-',
	',',
	'.',
	'/',
	'`',
	'[',
	'\\',
	']',
	'\''
];
if (Object.freeze) Object.freeze(ASCIICharacters); // Make the array immutable

/**
 * Array defining the characters that the key codes in ASCIIKeyCodes correspond to when
 * the shift key is held.
 * @readonly
 * @type {string[]}
 */
const ASCIIShiftCharacters = [
	' ',
	')',
	'!',
	'@',
	'#',
	'$',
	'%',
	'^',
	'&',
	'*',
	'(',
	':',
	'+',
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'*',
	'+',
	'-',
	'',
	'/',
	'_',
	'<',
	'>',
	'?',
	'~',
	'{',
	'|',
	'}',
	'"'
];
if (Object.freeze) Object.freeze(ASCIIShiftCharacters); // Make the array immutable

/**
 * Array defining the keys for which to prevent the default key action when they are pressed.
 * @readonly
 * @type {string[]}
 */
const CapturedKeyCodes = [
	8,	// backspace
	9,	// tab
	13,	// enter
	33, // page up
	34, // page down
	35, // end
	36, // home
	37,	// arrow key up
	38,	// arrow key right
	39,	// arrow key down
	40,	// arrow key left
	45, // insert
	46, // delete
];
if (Object.freeze) Object.freeze(CapturedKeyCodes); // Make the array immutable