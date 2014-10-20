// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  test\GUIFramework.js
//
//  Created by: 	Drew Burden (drewaburden@gmail.com)
//
//      UNIT TESTS
//
// ================================================================================================
QUnit.module("UI");

/////////////////////
// GUIFramework.js //
/////////////////////
// Init
QUnit.test("Init()", function(assert) {
	UI.Init(); assert.ok(UI.context, "Initialize GUIFramework"); // expect no exceptions
	if (UI.context) delete UI.context;
	UI.Init(); assert.ok(UI.context, "Extra initialization"); // expect no exceptions
	if (UI.context) delete UI.context;
	UI.Init(57); assert.ok(UI.context, "Excess arguments"); // expect no exceptions
	if (UI.context) delete UI.context;
	UI.Init(null); assert.ok(UI.context, "Null argument"); // expect no exceptions
	if (UI.context) delete UI.context;

	// Actually init properly for later tests
	UI.Init();
});
// SetGUI
QUnit.test("SetGUI(gui)", function(assert) {
	UI.SetGUI(new UI.GUI(100, 100)); assert.ok(UI.gui, "Normal use case"); // expect no exceptions
	if (UI.gui) delete UI.gui;
	assert.throws(function() {UI.SetGUI();}, TypeError, "No arguments"); // expect TypeError exception
	if (UI.gui) delete UI.gui;
	UI.SetGUI(new UI.GUI(100, 100), 384); assert.ok(UI.gui, "Excess arguments"); // expect no exceptions
	if (UI.gui) delete UI.gui;
	assert.throws(function() {UI.SetGUI(true);}, TypeError, "Wrong argument type"); // expect TypeError exception
	if (UI.gui) delete UI.gui;
	assert.throws(function() {UI.SetGUI(null);}, TypeError, "Null argument"); // expect TypeError exception
	if (UI.gui) delete UI.gui;
});