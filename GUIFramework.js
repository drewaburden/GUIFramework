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
include('helpers/DefaultVal.js');
include('ui/Drawable.js');
include('ui/NinePatch.js');
include('ui/TextAlign.js');
include('ui/components/Component.js');
include('ui/components/Label.js');
function include(file) {
	var script = document.createElement('script');
	script.src = file;
    script.defer = true;
	document.getElementsByTagName('head').item(0).appendChild(script);
}
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
    btnBg = new NinePatch("assets/buttonbg.png", 5, 5, 150, 50, 14, 14, 14, 14, true);
    btnLabel = new Label("test", btnBg.x+btnBg.width/2, btnBg.y+btnBg.height/2, 150, 50,
    	"rgb(255, 255, 255)", "bold 12px Arial", TextHAlign.CENTER, true);
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
	handler(x, y);
}
function OnMouseDown(x, y) {
}
function OnMouseUp(x, y) {
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
    btnBg.draw();
    btnLabel.draw();
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