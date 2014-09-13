// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  test\helpers\MathClamp.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      UNIT TESTS
//
// ================================================================================================

QUnit.module("Helpers.MathClamp");

// Math.clamp
QUnit.test("Math.clamp(value, min, max)", function(assert) {
	assert.ok(Math.clamp(-2, -2, -2) == -2, "Normal use case - all same values"); // expect output to remain the same as the input value
	assert.ok(Math.clamp(5, 1, 3) == 3, "Normal use case - int clamp down"); // expect output to be the max value
	assert.ok(Math.clamp(-2, 1, 3) == 1, "Normal use case - int clamp up"); // expect output to be the min value
	assert.ok(Math.clamp(5.3, 1.3, 3.3) == 3.3, "Normal use case - float clamp down"); // expect output to be the max value
	assert.ok(Math.clamp(-2.3, 1.3, 3.3) == 1.3, "Normal use case - float clamp up"); // expect output to be the min value
	assert.throws(function() {Math.clamp(1, 10, 4);}, TypeError, "Min > max"); // expect TypeError exception
	assert.throws(function() {Math.clamp();}, TypeError, "No arguments"); // expect TypeError exception
	assert.throws(function() {Math.clamp(1, 6);}, TypeError, "Too few arguments"); // expect TypeError exception
	let test1 = Math.clamp(1, 2, 3, 4); assert.ok(test1 == 2, "Excess arguments"); // expect no exceptions
	assert.throws(function() {Math.clamp("blah", 2, 5);}, TypeError, "Wrong argument type (1)"); // expect TypeError exception
	assert.throws(function() {Math.clamp(1, "blah", 5);}, TypeError, "Wrong argument type (2)"); // expect TypeError exception
	assert.throws(function() {Math.clamp(1, 2, "blah");}, TypeError, "Wrong argument type (3)"); // expect TypeError exception
	assert.throws(function() {Math.clamp(NaN, 2, 3);}, TypeError, "NaN argument (value)"); // expect TypeError exception
	assert.throws(function() {Math.clamp(1, NaN, 3);}, TypeError, "NaN argument (min)"); // expect TypeError exception
	assert.throws(function() {Math.clamp(1, 2, NaN);}, TypeError, "NaN argument (max)"); // expect TypeError exception
	assert.throws(function() {Math.clamp(null, 2, 3);}, TypeError, "Null argument (value)"); // expect TypeError exception
	assert.throws(function() {Math.clamp(1, null, 3);}, TypeError, "Null argument (min)"); // expect TypeError exception
	assert.throws(function() {Math.clamp(1, 2, null);}, TypeError, "Null argument (max)"); // expect TypeError exception
});