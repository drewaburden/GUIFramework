// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  test\ui\NinePatch.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      UNIT TESTS
//
// ================================================================================================
QUnit.module("UI.NinePatch");

// constructor
QUnit.test("NinePatch(imgsrc, x, y, width, height, leftMargin, topMargin, rightMargin, bottomMargin, fillCenter, visible)", function(assert) {
	let (test = new NinePatch("test/dummy.jpg", 5, 5, 250, 50, 1, 1, 1, 1, true, true)) assert.ok(test, "Normal use case"); // expect no exceptions
	let (test = new NinePatch("test/dummy.jpg", 0, 0, 0, 0, 0, 0, 0, 0, true, true)) assert.ok(test, "0px width and 0px height"); // expect no exceptions
	assert.throws(function() {new NinePatch();}, TypeError, "No arguments"); // expect TypeError exception
	let (test = new NinePatch("test/dummy.jpg")) assert.ok(test, "Only mandatory arguments"); // expect no exceptions
	let (test = new NinePatch("test/dummy.jpg", 0, 0, 0, 0, 0, 0, 0, 0, true, true, 0)) assert.ok(test, "Excess arguments"); // expect no exceptions
	let (test = new NinePatch("test/dummy.jpg", -1, 0, 0, 0, 0, 0, 0, 0, true, true)) assert.ok(test.x>=0, "Negative argument (x)"); // expect no exceptions
	let (test = new NinePatch("test/dummy.jpg", 0, -1, 0, 0, 0, 0, 0, 0, true, true)) assert.ok(test.y>=0, "Negative argument (y)"); // expect no exceptions
	let (test = new NinePatch("test/dummy.jpg", 0, 0, -1, 0, 0, 0, 0, 0, true, true)) assert.ok(test.width>=0, "Negative argument (width)"); // expect no exceptions
	let (test = new NinePatch("test/dummy.jpg", 0, 0, 0, -1, 0, 0, 0, 0, true, true)) assert.ok(test.height>=0, "Negative argument (height)"); // expect no exceptions
	let (test = new NinePatch("test/dummy.jpg", 0, 0, 0, 0, -1, 0, 0, 0, true, true)) assert.ok(test.leftMargin>=0, "Negative argument (leftMargin)"); // expect no exceptions
	let (test = new NinePatch("test/dummy.jpg", 0, 0, 0, 0, 0, -1, 0, 0, true, true)) assert.ok(test.topMargin>=0, "Negative argument (topMargin)"); // expect no exceptions
	let (test = new NinePatch("test/dummy.jpg", 0, 0, 0, 0, 0, 0, -1, 0, true, true)) assert.ok(test.rightMargin>=0, "Negative argument (rightMargin)"); // expect no exceptions
	let (test = new NinePatch("test/dummy.jpg", 0, 0, 0, 0, 0, 0, 0, -1, true, true)) assert.ok(test.bottomMargin>=0, "Negative argument (bottomMargin)"); // expect no exceptions
	// Margin tests
	let (test = new NinePatch("test/dummy.jpg", 0, 0, 250, 50, 32, 0, 0, 0, true, true)) {
		QUnit.stop(); test.onload.push(function() {QUnit.start();assert.ok(test.leftMargin <= test.image.width, "Invalid margins (leftMargin > image.width)");}); // expect no exceptions
	}
	let (test = new NinePatch("test/dummy.jpg", 0, 0, 250, 50, 0, 32, 0, 0, true, true)) {
		QUnit.stop(); test.onload.push(function() {QUnit.start();assert.ok(test.topMargin <= test.image.height, "Invalid margins (topMargin > image.height)");}); // expect no exceptions
	}
	let (test = new NinePatch("test/dummy.jpg", 0, 0, 250, 50, 0, 0, 32, 0, true, true)) {
		QUnit.stop(); test.onload.push(function() {QUnit.start();assert.ok(test.rightMargin <= test.image.width, "Invalid margins (rightMargin > image.width)");}); // expect no exceptions
	}
	let (test = new NinePatch("test/dummy.jpg", 0, 0, 250, 50, 0, 0, 0, 32, true, true)) {
		QUnit.stop(); test.onload.push(function() {QUnit.start();assert.ok(test.bottomMargin <= test.image.height, "Invalid margins (bottomMargin > image.height)");}); // expect no exceptions
	}
	let (test = new NinePatch("test/dummy.jpg", 0, 0, 250, 50, 10, 0, 9, 0, true, true)) {
		QUnit.stop(); test.onload.push(function() {QUnit.start();assert.ok(test.rightMargin < test.leftMargin, "Invalid margins (rightMargin < leftMargin)");}); // expect no exceptions
	}
	let (test = new NinePatch("test/dummy.jpg", 0, 0, 250, 50, 9, 0, 10, 0, true, true)) {
		QUnit.stop(); test.onload.push(function() {QUnit.start();assert.ok(test.leftMargin > test.rightMargin, "Invalid margins (leftMargin > rightMargin)");}); // expect no exceptions
	}
	let (test = new NinePatch("test/dummy.jpg", 0, 0, 250, 50, 0, 10, 0, 9, true, true)) {
		QUnit.stop(); test.onload.push(function() {QUnit.start();assert.ok(test.bottomMargin < test.topMargin, "Invalid margins (bottomMargin < topMargin)");}); // expect no exceptions
	}
	let (test = new NinePatch("test/dummy.jpg", 0, 0, 250, 50, 0, 9, 0, 10, true, true)) {
		QUnit.stop(); test.onload.push(function() {QUnit.start();assert.ok(test.topMargin > test.bottomMargin, "Invalid margins (topMargin > bottomMargin)");}); // expect no exceptions
	}

	assert.throws(function() {new NinePatch(0, 5, 5, 250, 50, 14, 14, 14, 14, true, true);}, TypeError, "Wrong argument type (imgsrc)"); // expect TypeError exception
	assert.throws(function() {new NinePatch("test/dummy.jpg", 'blah', 5, 250, 50, 1, 1, 1, 1, true, true);}, TypeError, "Wrong argument type (x)"); // expect TypeError exception
	assert.throws(function() {new NinePatch("test/dummy.jpg", 5, 'blah', 250, 50, 1, 1, 1, 1, true, true);}, TypeError, "Wrong argument type (y)"); // expect TypeError exception
	assert.throws(function() {new NinePatch("test/dummy.jpg", 5, 5, 'blah', 50, 1, 1, 1, 1, true, true);}, TypeError, "Wrong argument type (width)"); // expect TypeError exception
	assert.throws(function() {new NinePatch("test/dummy.jpg", 5, 5, 250, 'blah', 1, 1, 1, 1, true, true);}, TypeError, "Wrong argument type (height)"); // expect TypeError exception
	assert.throws(function() {new NinePatch("test/dummy.jpg", 5, 5, 250, 50, 'blah', 1, 1, 1, true, true);}, TypeError, "Wrong argument type (leftMargin)"); // expect TypeError exception
	assert.throws(function() {new NinePatch("test/dummy.jpg", 5, 5, 250, 50, 1, 'blah', 1, 1, true, true);}, TypeError, "Wrong argument type (topMargin)"); // expect TypeError exception
	assert.throws(function() {new NinePatch("test/dummy.jpg", 5, 5, 250, 50, 1, 1, 'blah', 1, true, true);}, TypeError, "Wrong argument type (rightMargin)"); // expect TypeError exception
	assert.throws(function() {new NinePatch("test/dummy.jpg", 5, 5, 250, 50, 1, 1, 1, 'blah', true, true);}, TypeError, "Wrong argument type (bottomMargin)"); // expect TypeError exception
	assert.throws(function() {new NinePatch("test/dummy.jpg", 5, 5, 250, 50, 1, 1, 1, 1, 'blah', true);}, TypeError, "Wrong argument type (fillCenter)"); // expect TypeError exception
	assert.throws(function() {new NinePatch("test/dummy.jpg", 5, 5, 250, 50, 1, 1, 1, 1, true, 'blah');}, TypeError, "Wrong argument type (visible)"); // expect TypeError exception
	assert.throws(function() {new NinePatch(null, 5, 5, 250, 50, 14, 14, 14, 14, true, true);}, TypeError, "Null argument (imgsrc)"); // expect TypeError exception
	assert.throws(function() {new NinePatch("test/dummy.jpg", null, 5, 250, 50, 1, 1, 1, 1, true, true);}, TypeError, "Null argument (x)"); // expect TypeError exception
	assert.throws(function() {new NinePatch("test/dummy.jpg", 5, null, 250, 50, 1, 1, 1, 1, true, true);}, TypeError, "Null argument (y)"); // expect TypeError exception
	assert.throws(function() {new NinePatch("test/dummy.jpg", 5, 5, null, 50, 1, 1, 1, 1, true, true);}, TypeError, "Null argument (width)"); // expect TypeError exception
	assert.throws(function() {new NinePatch("test/dummy.jpg", 5, 5, 250, null, 1, 1, 1, 1, true, true);}, TypeError, "Null argument (height)"); // expect TypeError exception
	assert.throws(function() {new NinePatch("test/dummy.jpg", 5, 5, 250, 50, null, 1, 1, 1, true, true);}, TypeError, "Null argument (leftMargin)"); // expect TypeError exception
	assert.throws(function() {new NinePatch("test/dummy.jpg", 5, 5, 250, 50, 1, null, 1, 1, true, true);}, TypeError, "Null argument (topMargin)"); // expect TypeError exception
	assert.throws(function() {new NinePatch("test/dummy.jpg", 5, 5, 250, 50, 1, 1, null, 1, true, true);}, TypeError, "Null argument (rightMargin)"); // expect TypeError exception
	assert.throws(function() {new NinePatch("test/dummy.jpg", 5, 5, 250, 50, 1, 1, 1, null, true, true);}, TypeError, "Null argument (bottomMargin)"); // expect TypeError exception
	assert.throws(function() {new NinePatch("test/dummy.jpg", 5, 5, 250, 50, 1, 1, 1, 1, null, true);}, TypeError, "Null argument (fillCenter)"); // expect TypeError exception
	assert.throws(function() {new NinePatch("test/dummy.jpg", 5, 5, 250, 50, 1, 1, 1, 1, true, null);}, TypeError, "Null argument (visible)"); // expect TypeError exception
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
