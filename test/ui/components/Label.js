// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  test\ui\components\Label.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      UNIT TESTS
//
// ================================================================================================
QUnit.module("UI.Components.Label");

// constructor
QUnit.test("Label(text, x, y, width, height, style, font, textHAlignment, textVAlignment, visible)", function(assert) {
	let (test = new UI.Label("test", 5, 5, 250, 50, 'black', 'normal 12px Arial', TextHAlign.START, TextVAlign.TOP, true)) assert.ok(test, "Normal use case"); // expect no exceptions
	let (test = new UI.Label("test", 0, 0, 0, 0, 'black', 'normal 12px Arial', TextHAlign.START, TextVAlign.TOP, true)) assert.ok(test, "0px width and 0px height"); // expect no exceptions
	let (test = new UI.Label()) assert.ok(test, "No arguments"); // expect no exceptions
	let (test = new UI.Label("test", 5, 5, 250, 50, 'black', 'normal 12px Arial', TextHAlign.START, TextVAlign.TOP, true, true)) assert.ok(test, "Excess arguments"); // expect no exceptions
	let (test = new UI.Label("test", -1, 0, 0, 0, 'black', 'normal 12px Arial', TextHAlign.START, TextVAlign.TOP, true)) assert.ok(test.x==-1, "Negative argument (x)"); // expect no exceptions
	let (test = new UI.Label("test", 0, -1, 0, 0, 'black', 'normal 12px Arial', TextHAlign.START, TextVAlign.TOP, true)) assert.ok(test.y==-1, "Negative argument (y)"); // expect no exceptions
	let (test = new UI.Label("test", 0, 0, -1, 0, 'black', 'normal 12px Arial', TextHAlign.START, TextVAlign.TOP, true)) assert.ok(test.width>=0, "Negative argument (width)"); // expect no exceptions
	let (test = new UI.Label("test", 0, 0, 0, -1, 'black', 'normal 12px Arial', TextHAlign.START, TextVAlign.TOP, true)) assert.ok(test.height>=0, "Negative argument (height)"); // expect no exceptions
	assert.throws(function() {new UI.Label(0, 5, 5, 250, 50, 'black', 'normal 12px Arial', TextHAlign.START, TextVAlign.TOP, true);}, TypeError, "Wrong argument type (text)"); // expect TypeError exception
	assert.throws(function() {new UI.Label("test", 'blah', 5, 250, 50, 'black', 'normal 12px Arial', TextHAlign.START, TextVAlign.TOP, true);}, TypeError, "Wrong argument type (x)"); // expect TypeError exception
	assert.throws(function() {new UI.Label("test", 5, 'blah', 250, 50, 'black', 'normal 12px Arial', TextHAlign.START, TextVAlign.TOP, true);}, TypeError, "Wrong argument type (y)"); // expect TypeError exception
	assert.throws(function() {new UI.Label("test", 5, 5, 'blah', 50, 'black', 'normal 12px Arial', TextHAlign.START, TextVAlign.TOP, true);}, TypeError, "Wrong argument type (width)"); // expect TypeError exception
	assert.throws(function() {new UI.Label("test", 5, 5, 250, 'blah', 'black', 'normal 12px Arial', TextHAlign.START, TextVAlign.TOP, true);}, TypeError, "Wrong argument type (height)"); // expect TypeError exception
	assert.throws(function() {new UI.Label("test", 5, 5, 250, 50, 0, 'normal 12px Arial', TextHAlign.START, TextVAlign.TOP, true);}, TypeError, "Wrong argument type (style)"); // expect TypeError exception
	assert.throws(function() {new UI.Label("test", 5, 5, 250, 50, 'black', 0, TextHAlign.START, TextVAlign.TOP, true);}, TypeError, "Wrong argument type (font)"); // expect TypeError exception
	assert.throws(function() {new UI.Label("test", 5, 5, 250, 50, 'black', 'normal 12px Arial', 0, TextVAlign.TOP, true);}, TypeError, "Wrong argument type (textHAlignment)"); // expect TypeError exception
	assert.throws(function() {new UI.Label("test", 5, 5, 250, 50, 'black', 'normal 12px Arial', TextHAlign.START, 0, true);}, TypeError, "Wrong argument type (textVAlignment)"); // expect TypeError exception
	assert.throws(function() {new UI.Label("test", 5, 5, 250, 50, 'black', 'normal 12px Arial', TextHAlign.START, 0, 'blah');}, TypeError, "Wrong argument type (visible)"); // expect TypeError exception
	assert.throws(function() {new UI.Label(null, 5, 5, 250, 50, 'black', 'normal 12px Arial', TextHAlign.START, TextVAlign.TOP, true);}, TypeError, "Null argument (text)"); // expect TypeError exception
	assert.throws(function() {new UI.Label("test", null, 5, 250, 50, 'black', 'normal 12px Arial', TextHAlign.START, TextVAlign.TOP, true);}, TypeError, "Null argument (x)"); // expect TypeError exception
	assert.throws(function() {new UI.Label("test", 5, null, 250, 50, 'black', 'normal 12px Arial', TextHAlign.START, TextVAlign.TOP, true);}, TypeError, "Null argument (y)"); // expect TypeError exception
	assert.throws(function() {new UI.Label("test", 5, 5, null, 50, 'black', 'normal 12px Arial', TextHAlign.START, TextVAlign.TOP, true);}, TypeError, "Null argument (width)"); // expect TypeError exception
	assert.throws(function() {new UI.Label("test", 5, 5, 250, null, 'black', 'normal 12px Arial', TextHAlign.START, TextVAlign.TOP, true);}, TypeError, "Null argument (height)"); // expect TypeError exception
	assert.throws(function() {new UI.Label("test", 5, 5, 250, 50, null, 'normal 12px Arial', TextHAlign.START, TextVAlign.TOP, true);}, TypeError, "Null argument (style)"); // expect TypeError exception
	assert.throws(function() {new UI.Label("test", 5, 5, 250, 50, 'black', null, TextHAlign.START, TextVAlign.TOP, true);}, TypeError, "Null argument (font)"); // expect TypeError exception
	assert.throws(function() {new UI.Label("test", 5, 5, 250, 50, 'black', 'normal 12px Arial', null, TextVAlign.TOP, true);}, TypeError, "Null argument (textHAlignment)"); // expect TypeError exception
	assert.throws(function() {new UI.Label("test", 5, 5, 250, 50, 'black', 'normal 12px Arial', TextHAlign.START, null, true);}, TypeError, "Null argument (textVAlignment)"); // expect TypeError exception
	assert.throws(function() {new UI.Label("test", 5, 5, 250, 50, 'black', 'normal 12px Arial', TextHAlign.START, 0, null);}, TypeError, "Null argument (visible)"); // expect TypeError exception
});
// Draw
QUnit.test("Draw(context)", function(assert) {
	let test1 = new UI.Label("test", 5, 5, 250, 50, 'black', 'normal 12px Arial', TextHAlign.START, TextVAlign.TOP, true);
	test1.Draw(UI.context); assert.ok(test1, "Normal use case"); // expect no exceptions
	let test2 = new UI.Label("test", 0, 0, 0, 0, 'black', 'normal 12px Arial', TextHAlign.START, TextVAlign.TOP, true);
	test2.Draw(UI.context); assert.ok(test2, "0px width and 0px height"); // expect no exceptions
	test1.visible = false;
	test1.Draw(UI.context); assert.ok(true, "When visibile=false"); // expect no exceptions
	assert.throws(function() {test1.Draw();}, TypeError, "No arguments"); // expect TypeError exception
	test2.Draw(UI.context, 0); assert.ok(true, "Excess arguments"); // expect no exceptions
	assert.throws(function() {test1.Draw(42);}, TypeError, "Wrong argument type"); // expect TypeError exception
	assert.throws(function() {test1.Draw(null);}, TypeError, "Null argument"); // expect TypeError exception
});
// Destroy
QUnit.test("Destroy()", function(assert) {
	let test1 = new UI.Label("test", 5, 5, 250, 50, 'black', 'normal 12px Arial', TextHAlign.START, TextVAlign.TOP, true);
	test1.Destroy(); assert.ok(true, "Normal use case"); // expect no exceptions
	test1.Destroy(); assert.ok(true, "Extra Destroy"); // expect no exceptions
	new UI.Label("test", 5, 5, 250, 50, 'black', 'normal 12px Arial', TextHAlign.START, TextVAlign.TOP, true).Destroy(56); assert.ok(true, "Excess arguments"); // expect no exceptions
	new UI.Label("test", 5, 5, 250, 50, 'black', 'normal 12px Arial', TextHAlign.START, TextVAlign.TOP, true).Destroy(null); assert.ok(true, "Null argument"); // expect no exceptions
});
