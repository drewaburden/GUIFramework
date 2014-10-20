// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  test\ui\Drawable.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      UNIT TESTS
//
// ================================================================================================
QUnit.module("UI.Drawable");

// constructor
QUnit.test("Drawable(x, y, width, height, visisble)", function(assert) {
	let (test = new UI.Drawable(0, 0, 50, 50, true)) assert.ok(test, "Normal use case"); // expect no exceptions
	let (test = new UI.Drawable(0, 0, 0, 0, true)) assert.ok(test, "0px width and 0px height"); // expect no exceptions
	let (test = new UI.Drawable()) ok(test, "No arguments"); // expect no exceptions
	let (test = new UI.Drawable(0, 0, 0, 0, true, 7)) assert.ok(test, "Excess arguments"); // expect no exceptions
	let (test = new UI.Drawable(-1, 0, 0, 0, true)) assert.ok(test.x==-1, "Negative argument (x)"); // expect no exceptions
	let (test = new UI.Drawable(0, -1, 0, 0, true)) assert.ok(test.y==-1, "Negative argument (y)"); // expect no exceptions
	let (test = new UI.Drawable(0, 0, -1, 0, true)) assert.ok(test.width>=0, "Negative argument (width)"); // expect no exceptions
	let (test = new UI.Drawable(0, 0, 0, -1, true)) assert.ok(test.height>=0, "Negative argument (height)"); // expect no exceptions
	assert.throws(function() {new UI.Drawable('blah', 0, 0, 0, true);}, TypeError, "Wrong argument type (x)"); // expect TypeError exception
	assert.throws(function() {new UI.Drawable(0, 'blah', 0, 0, true);}, TypeError, "Wrong argument type (y)"); // expect TypeError exception
	assert.throws(function() {new UI.Drawable(0, 0, 'blah', 0, true);}, TypeError, "Wrong argument type (width)"); // expect TypeError exception
	assert.throws(function() {new UI.Drawable(0, 0, 0, 'blah', true);}, TypeError, "Wrong argument type (height)"); // expect TypeError exception
	assert.throws(function() {new UI.Drawable(0, 0, 0, 0, 'blah');}, TypeError, "Wrong argument type (visible)"); // expect TypeError exception
	assert.throws(function() {new UI.Drawable(null, 0, 0, 0, true);}, TypeError, "Null argument (x)"); // expect TypeError exception
	assert.throws(function() {new UI.Drawable(0, null, 0, 0, true);}, TypeError, "Null argument (y)"); // expect TypeError exception
	assert.throws(function() {new UI.Drawable(0, 0, null, 0, true);}, TypeError, "Null argument (width)"); // expect TypeError exception
	assert.throws(function() {new UI.Drawable(0, 0, 0, null, true);}, TypeError, "Null argument (height)"); // expect TypeError exception
	assert.throws(function() {new UI.Drawable(0, 0, 0, 0, null);}, TypeError, "Null argument (visible)"); // expect TypeError exception
});
// Draw
QUnit.test("Draw(context)", function(assert) {
	let test1 = new UI.Drawable(0, 0, 50, 50, true);
	test1.Draw(UI.context); assert.ok(test1, "Normal use case"); // expect no exceptions
	let test2 = new UI.Drawable(0, 0, 0, 0, true);
	test2.Draw(UI.context); assert.ok(test2, "0px width and 0px height"); // expect no exceptions
	test1.visible = false;
	test1.Draw(UI.context); assert.ok(true, "When visibile=false"); // expect no exceptions
	assert.throws(function() {test1.Draw();}, TypeError, "No arguments"); // expect TypeError exception
	test2.Draw(UI.context, 0); assert.ok(true, "Excess arguments"); // expect no exceptions
	assert.throws(function() {test1.Draw(42);}, TypeError, "Wrong argument type"); // expect TypeError exception
	assert.throws(function() {test1.Draw(null);}, TypeError, "Null argument"); // expect TypeError exception
});