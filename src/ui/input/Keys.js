// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\input\Keys.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      
//
// ================================================================================================

/**
 * Array defining the keys and their key codes that can have their input processed.
 * @readonly
 * @enum {number}
 */
Input.Key = {
	VK_SPACE: 			32,
	VK_0: 				48, 
	VK_1: 				49, 
	VK_2: 				50, 
	VK_3: 				51, 
	VK_4: 				52, 
	VK_5: 				53, 
	VK_6: 				54, 
	VK_7: 				55, 
	VK_8: 				56, 
	VK_9: 				57, 
	VK_SEMICOLON: 		59, 
	VK_EQUALS: 			61, 
	VK_A: 				65, 
	VK_B: 				66, 
	VK_C: 				67, 
	VK_D: 				68, 
	VK_E: 				69, 
	VK_F: 				70, 
	VK_G: 				71, 
	VK_H: 				72, 
	VK_I: 				73, 
	VK_J: 				74, 
	VK_K: 				75, 
	VK_L: 				76, 
	VK_M: 				77, 
	VK_N: 				78, 
	VK_O: 				79, 
	VK_P: 				80, 
	VK_Q: 				81, 
	VK_R: 				82, 
	VK_S: 				83, 
	VK_T: 				84, 
	VK_U: 				85, 
	VK_V: 				86, 
	VK_W: 				87, 
	VK_X: 				88, 
	VK_Y: 				89, 
	VK_Z: 				90, 
	VK_NUM0: 			96, 
	VK_NUM1: 			97, 
	VK_NUM2: 			98, 
	VK_NUM3: 			99, 
	VK_NUM4: 			100, 
	VK_NUM5: 			101, 
	VK_NUM6: 			102, 
	VK_NUM7: 			103, 
	VK_NUM8: 			104, 
	VK_NUM9: 			105, 
	VK_MULTIPLY: 		106, 
	VK_ADD: 			107, 
	VK_SUBTRACT: 		109, 
	VK_DECIMAL: 		110, 
	VK_DIVIDE: 			111, 
	VK_HYPHEN: 			173, 
	VK_COMMA: 			188, 
	VK_PERIOD: 			190, 
	VK_SLASH_FORWARD: 	191, 
	VK_GRAVE: 			192, 
	VK_BRACKET_OPEN: 	219, 
	VK_SLASH_BACK: 		220, 
	VK_BRACKET_CLOSE: 	221, 
	VK_APOSTROPHE: 		222, 
	VK_BACKSPACE: 		8,
	VK_TAB: 			9,
	VK_ENTER: 			13,
	VK_PAGE_UP: 		33,
	VK_PAGE_DOWN: 		34,
	VK_END: 			35,
	VK_HOME: 			36,
	VK_ARROW_LEFT: 		37,
	VK_ARROW_UP: 		38,
	VK_ARROW_RIGHT: 	39,
	VK_ARROW_DOWN: 		40,
	VK_INSERT: 			45,
	VK_DELETE: 			46
};
Object.freeze(Input.Key); // Make the enum immutable

/**
 * Array defining the keys for which to prevent the default key action when they are pressed.
 * @readonly
 * @type {Input.Key[]}
 */
Input.CapturedKeys = [
	Input.Key.VK_BACKSPACE,
	Input.Key.VK_TAB,
	Input.Key.VK_ENTER,
	Input.Key.VK_PAGE_UP,
	Input.Key.VK_PAGE_DOWN,
	Input.Key.VK_END,
	Input.Key.VK_HOME,
	Input.Key.VK_ARROW_UP,
	Input.Key.VK_ARROW_RIGHT,
	Input.Key.VK_ARROW_DOWN,
	Input.Key.VK_ARROW_LEFT,
	Input.Key.VK_INSERT,
	Input.Key.VK_DELETE,
	Input.Key.VK_SLASH_FORWARD,
	Input.Key.VK_APOSTROPHE,
	Input.Key.VK_SPACE
];
Object.freeze(Input.CapturedKeys); // Make the array immutable