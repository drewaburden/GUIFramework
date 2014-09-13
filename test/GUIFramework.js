// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  test\GUIFramework.js
//
//  Created by: 	Drew Burden (drewaburden@gmail.com)
//
//      UNIT TESTS
//
// ================================================================================================
QUnit.module("GUIFramework");

/////////////////////
// GUIFramework.js //
/////////////////////
// Init
QUnit.test("Init()", function(assert) {
	Init(); assert.ok(context, "Initialize GUIFramework"); // expect no exceptions
	if (context) delete context;
	Init(); assert.ok(context, "Extra initialization"); // expect no exceptions
	if (context) delete context;
	Init(57); assert.ok(context, "Excess arguments"); // expect no exceptions
	if (context) delete context;
	Init(null); assert.ok(context, "Null argument"); // expect no exceptions
	if (context) delete context;

	// Actually init properly for later tests
	Init();
});
// SetGUI
QUnit.test("SetGUI(gui)", function(assert) {
	SetGUI(new GUI(100, 100)); assert.ok(gui, "Normal use case"); // expect no exceptions
	if (gui) delete gui;
	assert.throws(function() {SetGUI();}, TypeError, "No arguments"); // expect TypeError exception
	if (gui) delete gui;
	SetGUI(new GUI(100, 100), 384); assert.ok(gui, "Excess arguments"); // expect no exceptions
	if (gui) delete gui;
	assert.throws(function() {SetGUI(true);}, TypeError, "Wrong argument type"); // expect TypeError exception
	if (gui) delete gui;
	assert.throws(function() {SetGUI(null);}, TypeError, "Null argument"); // expect TypeError exception
	if (gui) delete gui;
});