// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  test\ui\TextAlign.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      UNIT TESTS
//
// ================================================================================================
QUnit.module("UI.TextAlign");

// TextHAlign
QUnit.test("TextHAlign", function(assert) {
	TextHAlign = 0; assert.ok(TextHAlign != 0, "Try to change immutable enum (TextHAlign)"); // expect value not to change
	TextHAlign.START = 0; assert.ok(TextHAlign.START != 0, "Try to change immutable property (START)"); // expect value not to change
	TextHAlign.END = 0; assert.ok(TextHAlign.END != 0, "Try to change immutable property (END)"); // expect value not to change
	TextHAlign.LEFT = 0; assert.ok(TextHAlign.LEFT != 0, "Try to change immutable property (LEFT)"); // expect value not to change
	TextHAlign.RIGHT = 0; assert.ok(TextHAlign.RIGHT != 0, "Try to change immutable property (RIGHT)"); // expect value not to change
	TextHAlign.CENTER = 0; assert.ok(TextHAlign.CENTER != 0, "Try to change immutable property (CENTER)"); // expect value not to change
});
// TextVAlign
QUnit.test("TextVAlign", function(assert) {
	TextVAlign = 0; assert.ok(TextVAlign != 0, "Try to change immutable enum (TextVAlign)"); // expect value not to change
	TextVAlign.TOP = 0; assert.ok(TextHAlign.TOP != 0, "Try to change immutable property (TOP)"); // expect value not to change
	TextVAlign.BOTTOM = 0; assert.ok(TextHAlign.BOTTOM != 0, "Try to change immutable property (BOTTOM)"); // expect value not to change
	TextVAlign.MIDDLE = 0; assert.ok(TextHAlign.MIDDLE != 0, "Try to change immutable property (MIDDLE)"); // expect value not to change
	TextVAlign.ALPHABETIC = 0; assert.ok(TextHAlign.ALPHABETIC != 0, "Try to change immutable property (ALPHABETIC)"); // expect value not to change
	TextVAlign.HANGING = 0; assert.ok(TextHAlign.HANGING != 0, "Try to change immutable property (HANGING)"); // expect value not to change
	TextVAlign.IDEOGRAPHIC = 0; assert.ok(TextHAlign.IDEOGRAPHIC != 0, "Try to change immutable property (IDEOGRAPHIC)"); // expect value not to change
});