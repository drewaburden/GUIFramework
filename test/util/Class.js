// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  test\util\Class.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      UNIT TESTS
//
// ================================================================================================

QUnit.module("Util.Class");

// Object.validate
QUnit.test("Object.validate(type)", function(assert) {
	let obj = 0;
	obj.validate(Number); assert.ok(true, "Normal use case (constructor)"); // expect no exceptions
	obj = new UI.Drawable();
	obj.validate(UI.Destroyable); assert.ok(true, "Normal use case (instanceof)"); // expect no exceptions
	obj = 'test';
	obj.validate(String); assert.ok(true, "Normal use case (string)"); // expect no exceptions
	obj.validate(String, UI.Image, Number); assert.ok(true, "Normal use case (multiple types)"); // expect no exceptions
	assert.throws(function() {obj.validate(Number);}, TypeError, "Normal use case (validation fail)"); // expect TypeError exception
	assert.throws(function() {obj.validate();}, TypeError, "No arguments"); // expect TypeError exception
	assert.throws(function() {obj.validate('string');}, TypeError, "Wrong argument type"); // expect TypeError exception
	assert.throws(function() {obj.validate(null);}, TypeError, "Null argument"); // expect TypeError exception
});
// Function.inherits
QUnit.test("Function.inherits(parent)", function(assert) {
	// Set up some simple classes to use in the inherit unit tests
	// Parent class
	function Parent(x) {
		this.x = x; assert.ok(this.x==2, "Parent receives value from Child calling super constructor");
		assert.throws(function() {Parent.prototype.Bar();}, "Parent fails calling a function only found in the Child");
	}
	Parent.prototype.Foo = function() { this.x = 3; }
	Parent.prototype.Woo = function() {
		this.Foo();
		assert.ok(this.x = 3, "Parent calls a function that subclasses override and only the Parent's function executes");
		return true;
	}
	ok(true, "Parent class defined");
	// Child class
	Child.inherits(Parent); assert.ok(true, "Child inherits Parent");
	function Child() {
		Child.parent.constructor.call(this, 2);
		assert.ok(this.x==2, "Child calls super constructor and the class properties are set properly");
	}
	Child.prototype.Foo = function() {
		Child.parent.Foo.call(this);
		assert.ok(this.x==3, "Child calls super.Foo() and the super function executes properly");
		this.x = 4;
	}
	Child.prototype.Bar = function() {
		assert.ok(true, "Child calls function only found in Child class");
		assert.ok(Child.parent.Woo(), "Child calls function only found in Parent class");
	}
	assert.ok(true, "Child class defined");

	assert.throws(function() {Child.inherits(7);}, "Trying to inherit from an invalid class");
	let child = new Child(); assert.ok(child, "Child object instantiated");
	assert.ok(child instanceof Child, "Child object instance of Child");
	assert.ok(child instanceof Parent, "Child object instance of Parent");
	child.Foo();
	child.Bar();
});