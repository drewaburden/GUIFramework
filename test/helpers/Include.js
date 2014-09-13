// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  test\helpers\Include.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      UNIT TESTS
//
// ================================================================================================

QUnit.module("Helpers.Include");

// include
QUnit.test("include(file)", function(assert) {
	include('test/dummy.js'); assert.ok(true, "Normal use case"); // expect no exceptions
	include('test/dummy.js'); assert.ok(true, "Duplicate inclusion"); // expect no exceptions
	assert.throws(function() {include();}, TypeError, "No arguments"); // expect TypeError exception
	include('test/dummy.js', 'test/dummy.js'); assert.ok(true, "Excess arguments"); // expect no exceptions
	assert.throws(function() {include(3);}, TypeError, "Wrong argument type"); // expect TypeError exception
	assert.throws(function() {include(null);}, TypeError, "Null argument"); // expect TypeError exception
	//assert.throws(function() {include('sdklajsd');}, "File not found, not accessible, or not loaded"); // expect exception
});

// setScriptRoot
QUnit.test("setScriptRoot(path)", function(assert) {
	let savedScriptRoot = scriptRoot;

	setScriptRoot('src/'); assert.ok(scriptRoot == 'src/', "Normal use case"); // expect no exceptions
	assert.throws(function() {setScriptRoot();}, TypeError, "No arguments"); // expect TypeError exception
	setScriptRoot('src/ui/', '../../'); assert.ok(scriptRoot == 'src/ui/', "Excess arguments"); // expect no exceptions
	assert.throws(function() {setScriptRoot(3);}, TypeError, "Wrong argument type"); // expect TypeError exception
	assert.throws(function() {setScriptRoot(null);}, TypeError, "Null argument"); // expect TypeError exception
	//assert.throws(function() {setScriptRoot('sdklajsd');}, "Path not found or not accessible"); // expect exception
	
	if (savedScriptRoot) setScriptRoot(savedScriptRoot);
});