// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  .\unit tests\Helpers.js
//
//  Created by: 	Drew Burden (drewaburden@gmail.com)
//
//      Helpers module unit tests.
//
// ================================================================================================
QUnit.module("Helpers");

////////////////////////
// helpers/Include.js //
////////////////////////
// include
QUnit.test("helpers/Include.js - include(file)", function() {
	include('unit tests/dummy.js'); ok(true, "Normal use case"); // expect no exceptions
	include('unit tests/dummy.js'); ok(true, "Duplicate inclusion"); // expect no exceptions
	throws(function() {include();}, TypeError, "No arguments"); // expect TypeError exception
	include('unit tests/dummy.js', 'unit tests/dummy.js'); ok(true, "Excess arguments"); // expect no exceptions
	throws(function() {include(3);}, TypeError, "Wrong argument type"); // expect TypeError exception
	throws(function() {include(null);}, TypeError, "Null argument"); // expect TypeError exception
	//throws(function() {include('sdklajsd');}, "File not found, not accessible, or not loaded"); // expect exception
});
// setScriptRoot
QUnit.test("helpers/Include.js - setScriptRoot(path)", function() {
	var savedScriptRoot = scriptRoot;
	setScriptRoot('../'); ok(scriptRoot == '../', "Normal use case"); // expect no exceptions
	throws(function() {setScriptRoot();}, TypeError, "No arguments"); // expect TypeError exception
	setScriptRoot('../ui/', '../../'); ok(scriptRoot == '../ui/', "Excess arguments"); // expect no exceptions
	throws(function() {setScriptRoot(3);}, TypeError, "Wrong argument type"); // expect TypeError exception
	throws(function() {setScriptRoot(null);}, TypeError, "Null argument"); // expect TypeError exception
	//throws(function() {setScriptRoot('sdklajsd');}, "Path not found or not accessible"); // expect exception
	
	setScriptRoot(savedScriptRoot);
});

//////////////////////////
// helpers/Arguments.js //
//////////////////////////
// optionalArg
QUnit.test("helpers/Arguments.js - optionalArg(argument, defaultValue)", function() {
	optionalArg(true, false); ok(true, "Normal use case"); // expect no exceptions
	throws(function() {optionalArg();}, TypeError, "No arguments"); // expect TypeError exception
	throws(function() {optionalArg(true);}, TypeError, "Too few arguments"); // expect TypeError exception
	optionalArg(true, false, false); ok(true, "Excess arguments"); // expect no exceptions
	throws(function() {optionalArg(null, true);}, TypeError, "Null argument (1)"); // expect TypeError exception
	throws(function() {optionalArg(true, null);}, TypeError, "Null argument (2)"); // expect TypeError exception
});
// mandatoryArg
QUnit.test("helpers/Arguments.js - mandatoryArg(argument)", function() {
	ok(mandatoryArg(2)==2, "Normal use case"); // expect input value = output value
	throws(function() {mandatoryArg();}, TypeError, "No arguments/undefined arguments"); // expect TypeError exception
	mandatoryArg(true, false, false); ok(true, "Excess arguments"); // expect no exceptions
	throws(function() {mandatoryArg(null);}, TypeError, "Null argument"); // expect TypeError exception
});

//////////////////////////
// helpers/MathClamp.js //
//////////////////////////
// Math.clamp
QUnit.test("helpers/MathClamp.js - Math.clamp(value, min, max)", function() {
	ok(Math.clamp(-2, -2, -2) == -2, "Normal use case - all same values"); // expect output to remain the same as the input value
	ok(Math.clamp(5, 1, 3) == 3, "Normal use case - int clamp down"); // expect output to be the max value
	ok(Math.clamp(-2, 1, 3) == 1, "Normal use case - int clamp up"); // expect output to be the min value
	ok(Math.clamp(5.3, 1.3, 3.3) == 3.3, "Normal use case - float clamp down"); // expect output to be the max value
	ok(Math.clamp(-2.3, 1.3, 3.3) == 1.3, "Normal use case - float clamp up"); // expect output to be the min value
	throws(function() {Math.clamp(1, 10, 4);}, TypeError, "Min > max"); // expect TypeError exception
	throws(function() {Math.clamp();}, TypeError, "No arguments"); // expect TypeError exception
	throws(function() {Math.clamp(1, 6);}, TypeError, "Too few arguments"); // expect TypeError exception
	Math.clamp(1, 2, 3, 4); ok(true, "Excess arguments"); // expect no exceptions
	throws(function() {Math.clamp("blah", 2, 5);}, TypeError, "Wrong argument type (1)"); // expect TypeError exception
	throws(function() {Math.clamp(1, "blah", 5);}, TypeError, "Wrong argument type (2)"); // expect TypeError exception
	throws(function() {Math.clamp(1, 2, "blah");}, TypeError, "Wrong argument type (3)"); // expect TypeError exception
	throws(function() {Math.clamp(NaN, 2, 3);}, TypeError, "NaN argument (1)"); // expect TypeError exception
	throws(function() {Math.clamp(1, NaN, 3);}, TypeError, "NaN argument (2)"); // expect TypeError exception
	throws(function() {Math.clamp(1, 2, NaN);}, TypeError, "NaN argument (3)"); // expect TypeError exception
	throws(function() {Math.clamp(null, 2, 3);}, TypeError, "Null argument (1)"); // expect TypeError exception
	throws(function() {Math.clamp(1, null, 3);}, TypeError, "Null argument (2)"); // expect TypeError exception
	throws(function() {Math.clamp(1, 2, null);}, TypeError, "Null argument (3)"); // expect TypeError exception
});

//////////////////////
// helpers/Class.js //
//////////////////////
// Object.validate
QUnit.test("helpers/Class.js - Object.validate(type)", function() {
	var obj = 0;
	obj.validate(Number); ok(true, "Normal use case (number)"); // expect no exceptions
	obj = 'test';
	obj.validate(String); ok(true, "Normal use case (string)"); // expect no exceptions
	obj = new Image();
	obj.validate(Image); ok(true, "Normal use case (Image)"); // expect no exceptions
	throws(function() {obj.validate(String);}, TypeError, "Normal use case (validation fail)"); // expect TypeError exception
	throws(function() {obj.validate();}, TypeError, "No arguments"); // expect TypeError exception
	obj.validate(Image, 'blah'); ok(true, "Excess arguments"); // expect no exceptions
	throws(function() {obj.validate('string');}, TypeError, "Wrong argument type"); // expect TypeError exception
	throws(function() {obj.validate(null);}, TypeError, "Null argument"); // expect TypeError exception
});
// Function.inherits
QUnit.test("helpers/Class.js - Function.inherits(parent)", function() {
	// Set up some simple classes to use in the inherit unit tests
	function Parent(x) {
		this.x = x; ok(this.x==2, "Parent receives value from Child calling super constructor");
		throws(function() {Parent.prototype.Bar();}, "Parent fails calling a function only found in the Child");

		Parent.prototype.Foo = function() { this.x = 3; }
		Parent.prototype.Woo = function() {
			Parent.prototype.Foo();
			ok(this.x = 3, "Parent calls a function that subclasses override and only the Parent's function executes");
			return true;
		}

		ok(true, "Parent class defined");
	}
	function Child() {
		var _super = Child.prototype._super; // Super shortcut
		_super.constructor.call(this, 2);
		ok(this.x==2, "Child calls super constructor and the class properties are set properly");

		Child.prototype.Foo = function() {
			_super.Foo.call(this);
			ok(this.x==3, "Child calls super.Foo() and the super function executes properly");
			this.x = 4;
		}
		Child.prototype.Bar = function() {
			ok(true, "Child calls function only found in Child class");
			ok(_super.Woo(), "Child calls function only found in Parent class");
		}

		ok(true, "Child class defined");
	}
	Child.inherits(Parent); ok(true, "Child inherits Parent");
	throws(function() {Child.inherits(7);}, "Trying to inherit from an invalid class");
	var child = new Child(); ok(child, "Child object instantiated");
	ok(child instanceof Child, "Child object instance of Child");
	ok(child instanceof Parent, "Child object instance of Parent");
	child.Foo();
	child.Bar();
});