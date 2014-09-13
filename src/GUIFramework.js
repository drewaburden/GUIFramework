// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  GUIFramework.js
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
include('src/helpers/Class.js');
include('src/helpers/MathClamp.js');
include('src/ui/mixins/Mixins.js');
include('src/ui/mixins/Hoverable.js');
include('src/ui/mixins/Clickable.js');
include('src/ui/Destroyable.js');
include('src/ui/Drawable.js');
include('src/ui/NinePatch.js');
include('src/ui/TextAlign.js');
include('src/ui/components/Component.js');
include('src/ui/components/Image.js');
include('src/ui/components/Label.js');
include('src/ui/components/Button.js');
include('src/ui/components/Checkbox.js');
include('src/ui/components/Textbox.js');
include('src/ui/GUI.js');

/////////////
// Globals //
/////////////
/**
 * Canvas context
 * @global
 * @type {CanvasRenderingContext2D}
 */
var context = null;
var canvas = null;
var gui = null;
var fps = 30;
var unitTesting = false;
//////////
// Init //
//////////
function Init() {
    // Set up context references
    canvas = document.getElementById("maincanvas");
    context = canvas.getContext("2d");
    // Set up raw canvas events
	canvas.addEventListener('mousedown', 	MouseEvent.bind(null, OnMouseDown), false);	
	canvas.addEventListener('mouseup',   	MouseEvent.bind(null, OnMouseUp), false);	
	canvas.addEventListener('mousemove',   	MouseEvent.bind(null, OnMouseMove), false);

    setInterval(Update, 1000/fps.validate(Number)); // Start Update loop
}

function SetGUI(newGUI) {
    gui = newGUI.validate(GUI);
    canvas.width = gui.width;
    canvas.height = gui.height;
}

////////////
// Events //
////////////
function MouseEvent(handler, ev) {
	let x, y;
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
function OnMouseDown(x, y, button) { if (gui) gui.OnMouseDown(x, y, button); }
function OnMouseUp(x, y, button) { if (gui) gui.OnMouseUp(x, y, button); }
function OnMouseMove(x, y) { if (gui) gui.OnMouseMove(x, y); }
/////////////
// Drawing //
/////////////
function Update() {
    if (gui && context) {
        DrawRect(0, 0, gui.width, gui.height, true, gui.bgStyle); // Clear the screen
        
        gui.Draw(context);
    }
}
function DrawRect(x, y, width, height, filled, style) {
    if (filled) {
        context.fillStyle = style;
        context.fillRect(x, y, width, height);
    }
    else {
        context.strokeStyle = style;
        context.strokeRect(x, y, width, height);
    }
}