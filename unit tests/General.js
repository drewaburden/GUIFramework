// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  .\unit tests\General.js
//
//  Created by: 	Drew Burden (drewaburden@gmail.com)
//
//      General unit tests.
//
// ================================================================================================
QUnit.module("General");

/////////////////////
// GUIFramework.js //
/////////////////////
// Init
QUnit.test("GUIFramework.js - Init()", function() {
	Init(); ok(true, "Initialized GUIFramework"); // expect no exceptions
	Init(); ok(true, "Extra initialization"); // expect no exceptions
});