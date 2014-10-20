// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  test\ui\Destroyable.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      UNIT TESTS
//
// ================================================================================================
QUnit.module("UI.Destroyable");

// constructor
QUnit.test("Destroyable()", function(assert) {
	let (test = new UI.Destroyable()) assert.ok(test, "Normal use case"); // expect no exceptions
	let (test = new UI.Destroyable(0, true, 7)) assert.ok(test, "Excess arguments"); // expect no exceptions
	let (test = new UI.Destroyable(null)) assert.ok(test, "Null argument"); // expect no exceptions
});
// Destroy
QUnit.test("Destroy()", function(assert) {
	let test1 = new UI.Destroyable();
	test1.Destroy(); assert.ok(true, "Normal use case"); // expect no exceptions
	test1.Destroy(); assert.ok(true, "Extra Destroy"); // expect no exceptions
	new UI.Destroyable().Destroy(56); assert.ok(true, "Excess arguments"); // expect no exceptions
	new UI.Destroyable().Destroy(null); assert.ok(true, "Null argument"); // expect no exceptions
});