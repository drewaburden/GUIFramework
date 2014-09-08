// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  .\GUIFramework.js
//
//  Created by: 	Drew Burden (drewaburden@gmail.com)
//
//      Easily and cleanly loads all necessary Javascript files, performs initialization
//		and runs the GUI's main draw loop.
//
// ================================================================================================

//////////////
// Includes //
//////////////
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
/////////////
// Globals //
/////////////
/**
 * Canvas context
 * @global
 * @type {CanvasRenderingContext2D}
 */
var context = null;
var gui = null;
//////////
// Init //
//////////
function Init() {
    // Version check
    var testedOnVersion = '37.0.2062.76';
    var currentVersion = window.navigator.appVersion.match(/Chrome\/(.*?) /)[1];
    if (currentVersion != testedOnVersion) {
        var body = document.getElementsByTagName('body').item(0);
        var p = document.createElement('p');
        p.style.font = "italic 10px Arial";
        p.textContent = "Warning: This framework has only been tested on Google Chrome version " + testedOnVersion +
            ", and you do not have a matching version. I cannot guarantee good results on your browser.";
        body.insertBefore(p, body.firstChild);
    }

    // Set up context references
    var canvas = document.getElementById("maincanvas");
    context = canvas.getContext("2d");
    // Set up raw canvas events
	canvas.addEventListener('mousedown', 	MouseEvent.bind(null, OnMouseDown), false);	
	canvas.addEventListener('mouseup',   	MouseEvent.bind(null, OnMouseUp), false);	
	canvas.addEventListener('mousemove',   	MouseEvent.bind(null, OnMouseMove), false);
}

function SetGUI(newGUI) {
    if (!(newGUI instanceof GUI)) {
        console.error("SetGUI: An invalid GUI object was passed.")
        return;
    }
    gui = newGUI;
}

function StartRendering() {
    setInterval(Update, 20); // Start Update loop
}
////////////
// Events //
////////////
function MouseEvent(handler, ev) {
	var x, y;
	// Get the mouse position relative to the canvas element.
	if (ev.layerX || ev.layerX == 0) { // Firefox
		x = ev.layerX;
		y = ev.layerY;
	} else if (ev.offsetX || ev.offsetX == 0) { // Opera
		x = ev.offsetX;
		y = ev.offsetY;
	}
	handler(x, y, ev.button);
}
function OnMouseDown(x, y, button) {
}
function OnMouseUp(x, y, button) {
}
function OnMouseMove(x, y) {
}
/////////////
// Drawing //
/////////////
function Update() {
    if (gui) {
        DrawRect(0, 0, gui.width, gui.height, true, gui.bgStyle); // Clear the screen
        gui.Draw(context);
    }
}
function DrawRect(x, y, width, height, filled, color) {
    if (filled) {
        context.fillStyle = color;
        context.fillRect(x, y, width, height);
    }
    else {
        context.strokeStyle = color;
        context.strokeRect(x, y, width, height);
    }
}