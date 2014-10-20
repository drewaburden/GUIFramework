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

QUnit.test("Init", function() {
	UI.unitTesting = true;
	// We have to load everything else here, because otherwise QUnit will load and execute 
	// the other testing modules before running GUIFramework.js, causing the tests to fail.
	/*Util.include('src/util/Class.js');
	Util.include('src/util/MathClamp.js');
	Util.include('src/ui/Destroyable.js');
	Util.include('src/ui/Drawable.js');
	Util.include('src/ui/NinePatch.js');
	Util.include('src/ui/TextAlign.js');
	Util.include('src/ui/components/Component.js');
	Util.include('src/ui/components/Label.js');
	Util.include('src/ui/GUI.js');*/
	ok(true, "Loaded GUIFramework"); // expect no exceptions
});

QUnit.test("Unit test modules", function() {
	Util.include('test/util/Include.js');
	Util.include('test/util/Class.js');
	Util.include('test/util/MathClamp.js');
	Util.include('test/GUIFramework.js');
	Util.include('test/ui/Destroyable.js');
	Util.include('test/ui/Drawable.js');
	Util.include('test/ui/NinePatch.js');
	Util.include('test/ui/TextAlign.js');
	Util.include('test/ui/components/Component.js');
	Util.include('test/ui/components/Label.js');
	Util.include('test/ui/GUI.js');
	ok(true, "Loaded test modules");
});