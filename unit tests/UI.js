// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  .\unit tests\UI.js
//
//  Created by: 	Drew Burden (drewaburden@gmail.com)
//
//      UI module unit tests.
//
// ================================================================================================
QUnit.module("UI");

///////////////////////
// ui/Destroyable.js //
///////////////////////
// constructor
QUnit.test("ui/Destroyable.js - Destroyable()", function() {
	var test1 = new Destroyable(0, 0, 0, 0, true); ok(test1, "Normal use case"); // expect no exceptions
	var test2 = new Destroyable(0, 0, 0, 0, true, 7); ok(test2, "Excess arguments"); // expect no exceptions
});
// Destroy
QUnit.test("ui/Destroyable.js - Destroy()", function() {
	new Destroyable(0, 0, 0, 0, true).Destroy(); ok(true, "Normal use case"); // expect no exceptions
	new Destroyable(0, 0, 0, 0, true, 7).Destroy(56); ok(true, "Excess arguments"); // expect no exceptions
});

////////////////////
// ui/Drawable.js //
////////////////////
// constructor
QUnit.test("ui/Drawable.js - Drawable(x, y, width, height, visisble)", function() {
	var test1 = new Drawable(0, 0, 50, 50, true); ok(test1, "Normal use case"); // expect no exceptions
	var test2 = new Drawable(0, 0, 0, 0, true); ok(test2, "0px width and 0px height"); // expect no exceptions
	var test3 = new Drawable(); ok(test3, "No arguments"); // expect no exceptions
	var test4 = new Drawable(0, 0, 0, 0, true, 7); ok(test4, "Excess arguments"); // expect no exceptions
	throws(function() {new Drawable('blah', 0, 0, 0, true);}, TypeError, "Wrong argument type (1)"); // expect TypeError exception
	throws(function() {new Drawable(0, 'blah', 0, 0, true);}, TypeError, "Wrong argument type (2)"); // expect TypeError exception
	throws(function() {new Drawable(0, 0, 'blah', 0, true);}, TypeError, "Wrong argument type (3)"); // expect TypeError exception
	throws(function() {new Drawable(0, 0, 0, 'blah', true);}, TypeError, "Wrong argument type (4)"); // expect TypeError exception
	throws(function() {new Drawable(0, 0, 0, 0, 'blah');}, TypeError, "Wrong argument type (5)"); // expect TypeError exception
});
// Draw
QUnit.test("ui/Drawable.js - Draw(context)", function() {
	var test1 = new Drawable(0, 0, 50, 50, true);
	test1.Draw(context); ok(test1, "Normal use case"); // expect no exceptions
	var test1 = new Drawable(0, 0, 0, 0, true);
	test1.Draw(context); ok(test1, "0px width and 0px height"); // expect no exceptions
	test1.visible = false;
	test1.Draw(context); ok(true, "When visibile=false"); // expect no exceptions
	throws(function() {test1.Draw();}, TypeError, "No arguments"); // expect TypeError exception
	throws(function() {test1.Draw(42);}, TypeError, "Wrong argument type"); // expect TypeError exception
});