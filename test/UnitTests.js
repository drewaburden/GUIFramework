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
	include('src/GUIFramework.js');
	unitTesting = true;
	// We have to load everything else here, because otherwise QUnit will load and execute 
	// the other testing modules before running GUIFramework.js, causing the tests to fail.
	include('src/util/Class.js');
	include('src/util/MathClamp.js');
	include('src/ui/mixins/Mixins.js');
	//include('src/ui/mixins/Hoverable.js');
	include('src/ui/Destroyable.js');
	include('src/ui/Drawable.js');
	include('src/ui/NinePatch.js');
	include('src/ui/TextAlign.js');
	include('src/ui/components/Component.js');
	include('src/ui/components/Label.js');
	include('src/ui/GUI.js');
	ok(true, "Loaded GUIFramework"); // expect no exceptions
});

QUnit.test("Unit test modules", function() {
	include('test/util/Include.js');
	include('test/util/Class.js');
	include('test/util/MathClamp.js');
	include('test/GUIFramework.js');
	include('test/ui/mixins/Mixins.js');
	//include('test/ui/mixins/Hoverable.js');
	include('test/ui/Destroyable.js');
	include('test/ui/Drawable.js');
	include('test/ui/NinePatch.js');
	include('test/ui/TextAlign.js');
	include('test/ui/components/Component.js');
	include('test/ui/components/Label.js');
	include('test/ui/GUI.js');
	ok(true, "Loaded test modules");
});