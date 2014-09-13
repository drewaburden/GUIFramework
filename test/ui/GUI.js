// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  test\ui\GUI.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      UNIT TESTS
//
// ================================================================================================
QUnit.module("UI.GUI");

// constructor
QUnit.test("GUI(width, height, bgStyle, fullscreen)", function(assert) {
	let (test = new GUI(100, 100, 'black', true)) assert.ok(test, "Normal use case (string bgStyle)"); // expect no exceptions
	let (test = new GUI(100, 100, context.createLinearGradient(0, 0, 0, 0), true)) assert.ok(test, "Normal use case (CanvasGradient bgStyle)"); // expect no exceptions
	let (test = new GUI(100, 100, context.createPattern(document.getElementById('dummyimg'), 'repeat'), true)) assert.ok(test, "Normal use case (CanvasPattern bgStyle)"); // expect no exceptions
	let (test = new GUI(0, 0, 'black')) assert.ok(test, "0px width and 0px height") // expect no exceptions
	let (test = new GUI()) assert.ok(test, "No arguments"); // expect no exceptions
	let (test = new GUI(0, 0, 'black', true, 78)) assert.ok(test, "Excess arguments"); // expect no exceptions
	assert.throws(function() {new GUI(true, 50, 'black', false);}, TypeError, "Wrong argument type (width)"); // expect TypeError exception
	assert.throws(function() {new GUI(50, true, 'black', false);}, TypeError, "Wrong argument type (height)"); // expect TypeError exception
	assert.throws(function() {new GUI(50, 50, true, false);}, TypeError, "Wrong argument type (bgStyle)"); // expect TypeError exception
	assert.throws(function() {new GUI(50, 50, 'black', 50);}, TypeError, "Wrong argument type (fullscreen)"); // expect TypeError exception
	assert.throws(function() {new GUI(null, 50, 'black', false);}, TypeError, "Null argument (width)"); // expect TypeError exception
	assert.throws(function() {new GUI(50, null, 'black', false);}, TypeError, "Null argument (height)"); // expect TypeError exception
	assert.throws(function() {new GUI(50, 50, null, false);}, TypeError, "Null argument (bgStyle)"); // expect TypeError exception
	assert.throws(function() {new GUI(50, 50, 'black', null);}, TypeError, "Null argument (fullscreen)"); // expect TypeError exception
});
// Draw
QUnit.test("Draw(context)", function(assert) {
	let test1 = new GUI(50, 50, 'black');
	test1.Draw(context); assert.ok(test1, "Normal use case"); // expect no exceptions
	let test2 = new GUI(0, 0, 'black');
	test2.Draw(context); assert.ok(test2, "0px width and 0px height"); // expect no exceptions
	test1.visible = false;
	test1.Draw(context); assert.ok(true, "When visibile=false"); // expect no exceptions
	assert.throws(function() {test1.Draw();}, TypeError, "No arguments"); // expect TypeError exception
	test2.Draw(context, 0); assert.ok(true, "Excess arguments"); // expect no exceptions
	assert.throws(function() {test1.Draw(42);}, TypeError, "Wrong argument type"); // expect TypeError exception
	assert.throws(function() {test1.Draw(null);}, TypeError, "Null argument"); // expect TypeError exception
});
// Destroy
QUnit.test("Destroy()", function(assert) {
	let test1 = new GUI(50, 50, 'black');
	test1.Destroy(); assert.ok(true, "Normal use case"); // expect no exceptions
	test1.Destroy(); assert.ok(true, "Extra Destroy"); // expect no exceptions
	new GUI(50, 50, 'black').Destroy(56); assert.ok(true, "Excess arguments"); // expect no exceptions
	new GUI(50, 50, 'black').Destroy(null); assert.ok(true, "Null argument"); // expect no exceptions
});