// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  test\util\Include.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      UNIT TESTS
//
// ================================================================================================

QUnit.module("Util.Include");

// include
QUnit.test("include(file)", function(assert) {
	Util.include('test/dummy.js'); assert.ok(true, "Normal use case"); // expect no exceptions
	Util.include('test/dummy.js'); assert.ok(true, "Duplicate inclusion"); // expect no exceptions
	assert.throws(function() {Util.include();}, TypeError, "No arguments"); // expect TypeError exception
	Util.include('test/dummy.js', 'test/dummy.js'); assert.ok(true, "Excess arguments"); // expect no exceptions
	assert.throws(function() {Util.include(3);}, TypeError, "Wrong argument type"); // expect TypeError exception
	assert.throws(function() {Util.include(null);}, TypeError, "Null argument"); // expect TypeError exception
	//assert.throws(function() {include('sdklajsd');}, "File not found, not accessible, or not loaded"); // expect exception
});

// setScriptRoot
QUnit.test("setScriptRoot(path)", function(assert) {
	let savedScriptRoot = Util.scriptRoot;

	Util.setScriptRoot('src/'); assert.ok(Util.scriptRoot == 'src/', "Normal use case"); // expect no exceptions
	assert.throws(function() {Util.setScriptRoot();}, TypeError, "No arguments"); // expect TypeError exception
	Util.setScriptRoot('src/ui/', '../../'); assert.ok(Util.scriptRoot == 'src/ui/', "Excess arguments"); // expect no exceptions
	assert.throws(function() {Util.setScriptRoot(3);}, TypeError, "Wrong argument type"); // expect TypeError exception
	assert.throws(function() {Util.setScriptRoot(null);}, TypeError, "Null argument"); // expect TypeError exception
	//assert.throws(function() {Util.setScriptRoot('sdklajsd');}, "Path not found or not accessible"); // expect exception
	
	if (savedScriptRoot) Util.setScriptRoot(savedScriptRoot);
});