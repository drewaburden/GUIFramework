// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  test\ui\components\Component.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      UNIT TESTS
//
// ================================================================================================
QUnit.module("UI.Components.Component");

// constructor
QUnit.test("Component(x, y, width, height, visible)", function(assert) {
	let (test = new UI.Component(5, 5, 250, 50, true)) assert.ok(test, "Normal use case"); // expect no exceptions
	let (test = new UI.Component(0, 0, 0, 0, true)) assert.ok(test, "0px width and 0px height"); // expect no exceptions
	let (test = new UI.Component()) assert.ok(test, "No arguments"); // expect no exceptions
	let (test = new UI.Component(0, 0, 0, 0, true, true)) assert.ok(test, "Excess arguments"); // expect no exceptions
	let (test = new UI.Component(-1, 0, 0, 0, true)) assert.ok(test.x==-1, "Negative argument (x)"); // expect no exceptions
	let (test = new UI.Component(0, -1, 0, 0, true)) assert.ok(test.y==-1, "Negative argument (y)"); // expect no exceptions
	let (test = new UI.Component(0, 0, -1, 0, true)) assert.ok(test.width>=0, "Negative argument (width)"); // expect no exceptions
	let (test = new UI.Component(0, 0, 0, -1, true)) assert.ok(test.height>=0, "Negative argument (height)"); // expect no exceptions
	assert.throws(function() {new UI.Component('blah', 5, 250, 50, true);}, TypeError, "Wrong argument type (x)"); // expect TypeError exception
	assert.throws(function() {new UI.Component(5, 'blah', 250, 50, true);}, TypeError, "Wrong argument type (y)"); // expect TypeError exception
	assert.throws(function() {new UI.Component(5, 5, 'blah', 50, true);}, TypeError, "Wrong argument type (width)"); // expect TypeError exception
	assert.throws(function() {new UI.Component(5, 5, 250, 'blah', true);}, TypeError, "Wrong argument type (height)"); // expect TypeError exception
	assert.throws(function() {new UI.Component(5, 5, 250, 50, 'blah');}, TypeError, "Wrong argument type (visible)"); // expect TypeError exception
	assert.throws(function() {new UI.Component(null, 5, 250, 50, true);}, TypeError, "Null argument (x)"); // expect TypeError exception
	assert.throws(function() {new UI.Component(5, null, 250, 50, true);}, TypeError, "Null argument (y)"); // expect TypeError exception
	assert.throws(function() {new UI.Component(5, 5, null, 50, true);}, TypeError, "Null argument (width)"); // expect TypeError exception
	assert.throws(function() {new UI.Component(5, 5, 250, null, true);}, TypeError, "Null argument (height)"); // expect TypeError exception
	assert.throws(function() {new UI.Component(5, 5, 250, 50, null);}, TypeError, "Null argument (visible)"); // expect TypeError exception
});
// Draw
QUnit.test("Draw(context)", function(assert) {
	let test1 = new UI.Component(0, 0, 100, 100, true);
	test1.Draw(UI.context); assert.ok(test1, "Normal use case"); // expect no exceptions
	let test2 = new UI.Component(0, 0, 0, 0, true);
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
	let test1 = new UI.Component(0, 0, 100, 100, true);
	test1.Destroy(); assert.ok(true, "Normal use case"); // expect no exceptions
	test1.Destroy(); assert.ok(true, "Extra Destroy"); // expect no exceptions
	new UI.Component(0, 0, 100, 100, true).Destroy(56); assert.ok(true, "Excess arguments"); // expect no exceptions
	new UI.Component(0, 0, 100, 100, true).Destroy(null); assert.ok(true, "Null argument"); // expect no exceptions
});
