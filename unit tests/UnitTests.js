// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  .\unit tests\UnitTests.js
//
//  Created by: 	Drew Burden (drewaburden@gmail.com)
//
//      Set up and start unit tests using QUnit.
//
// ================================================================================================
QUnit.module("Unit tests");

QUnit.test("unit tests/UnitTests.js", function() {
	setScriptRoot("../"); ok(true, "Set script root"); // expect no exceptions

	include('GUIFramework.js');
	// We have to load everything else here, because otherwise QUnit will load and execute 
	// the other testing modules before running GUIFramework.js, causing the tests to fail.
	include('helpers/Class.js');
	include('helpers/MathClamp.js');
	include('helpers/Arguments.js');
	include('helpers/Mixins.js');
	include('ui/Destroyable.js');
	include('ui/Drawable.js');
	include('ui/NinePatch.js');
	include('ui/TextAlign.js');
	include('ui/events/EventManager.js');
	include('ui/events/HoverableMixin.js');
	include('ui/components/Component.js');
	include('ui/components/Label.js');
	include('ui/GUI.js');
	ok(true, "Loaded GUIFramework"); // expect no exceptions
});

QUnit.test("Unit test modules", function() {
	include('unit tests/General.js'); ok(true, "Loaded General unit tests"); // expect no exceptions
	include('unit tests/Helpers.js'); ok(true, "Loaded Helpers unit tests"); // expect no exceptions
	include('unit tests/UI.js'); ok(true, "Loaded UI unit tests"); // expect no exceptions
});