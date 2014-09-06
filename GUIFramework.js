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
/////////////
// Globals //
/////////////
/**
 * Canvas context
 * @global
 * @type {CanvasRenderingContext2D}
 */
var context = null;
// Test vars
var btnBg = null;
var btnLabel = null;
//////////
// Init //
//////////
function Init() {
    var canvas = document.getElementById("maincanvas");
    context = canvas.getContext("2d");
	canvas.addEventListener('mousedown', 	MouseEvent.bind(null, OnMouseDown), false);	
	canvas.addEventListener('mouseup',   	MouseEvent.bind(null, OnMouseUp), false);	
	canvas.addEventListener('mousemove',   	MouseEvent.bind(null, OnMouseMove), false);
    btnBg = new NinePatch("assets/buttonbg.png", 5, 5, 250, 50, 14, 14, 14, 14, true);
    btnLabel = new Label("test", btnBg.x+btnBg.width/2, btnBg.y+btnBg.height/2, 150, 50,
    	"rgb(255, 255, 255)", "bold 18px Arial", TextHAlign.CENTER, TextVAlign.MIDDLE, true);
    setInterval(Update, 20); // Start Update loop

    btnBg.OnMouseIn();
    console.log(typeof btnBg);
    console.log(Mixins.HasMixins(btnBg, Hoverable));
}

function SetGUI(gui) {

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
    DrawRect(0, 0, 400, 400, true, "rgb(255, 255, 255)"); // Clear the screen
    DrawGUI();
}
function DrawGUI() {
    btnBg.Draw();
    btnLabel.Draw();
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