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
Util.include('src/util/Class.js');
Util.include('src/util/MathClamp.js');
Util.include('src/ui/mixins/Mixins.js');
Util.include('src/ui/mixins/Observable.js');
Util.include('src/ui/mixins/Hoverable.js');
Util.include('src/ui/mixins/Clickable.js');
Util.include('src/ui/mixins/Typeable.js');
Util.include('src/ui/Keys.js');
Util.include('src/ui/Destroyable.js');
Util.include('src/ui/Drawable.js');
Util.include('src/ui/NinePatch.js');
Util.include('src/ui/TextAlign.js');
Util.include('src/ui/components/Component.js');
Util.include('src/ui/components/Image.js');
Util.include('src/ui/components/Label.js');
Util.include('src/ui/components/Button.js');
Util.include('src/ui/components/Checkbox.js');
Util.include('src/ui/components/Caret.js');
Util.include('src/ui/components/Textbox.js');
Util.include('src/ui/GUI.js');

/**
 * @namespace
 */
var GUIFramework = GUIFramework || {};

///////////////
// Variables //
///////////////
/**
 * How many times per second GUIFramework should update what is displayed on the screen.
 * @type {number}
 */
GUIFramework.fps = 30;
GUIFramework.context = null;
GUIFramework.canvas = null;
GUIFramework.gui = null;
GUIFramework.unitTesting = false;
GUIFramework.preventNextDefaultKeyPressAction = false;

///////////////
// Functions //
///////////////
/**
 * Initialize the GUIFramework. This must be done before any other parts of GUIFramework will
 * work properly.
 */
GUIFramework.Init = function() {
    // Set up context references
    GUIFramework.canvas = document.getElementById("maincanvas");
    GUIFramework.context = GUIFramework.canvas.getContext("2d");

    // Set up raw canvas events
	GUIFramework.canvas.addEventListener('mousedown', GUIFramework.MouseEvent.bind(null, GUIFramework.OnMouseDown), false);	
	GUIFramework.canvas.addEventListener('mouseup',   GUIFramework.MouseEvent.bind(null, GUIFramework.OnMouseUp), false);	
	GUIFramework.canvas.addEventListener('mousemove', GUIFramework.MouseEvent.bind(null, GUIFramework.OnMouseMove), false);
    GUIFramework.canvas.addEventListener('keydown',   GUIFramework.KeyEvent.bind(null, GUIFramework.OnKeyDown), false); 
    GUIFramework.canvas.addEventListener('keyup',     GUIFramework.KeyEvent.bind(null, GUIFramework.OnKeyUp), false);
    GUIFramework.canvas.addEventListener('keypress',  GUIFramework.KeyEvent.bind(null, GUIFramework.OnKeyPress), false); 
    window.addEventListener('resize',       GUIFramework.OnResize, false);
    GUIFramework.canvas.focus(); // Focus the canvas for key input

    setInterval(GUIFramework.Update, 1000/GUIFramework.fps.validate(Number)); // Start Update loop
}
/**
 * Provides GUIFramework with a GUI to render.
 * @param {GUI} gui
 */
GUIFramework.SetGUI = function(gui) {
    GUIFramework.gui = gui.validate(GUI);
    GUIFramework.OnResize();
}

////////////
// Events //
////////////
GUIFramework.MouseEvent = function(handler, ev) { 
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
GUIFramework.OnMouseDown = function(x, y, button) { if (GUIFramework.gui) GUIFramework.gui.OnMouseDown(x, y, button); }
GUIFramework.OnMouseUp = function(x, y, button) { if (GUIFramework.gui) GUIFramework.gui.OnMouseUp(x, y, button); }
GUIFramework.OnMouseMove = function(x, y) { if (GUIFramework.gui) GUIFramework.gui.OnMouseMove(x, y); }
GUIFramework.KeyEvent = function(handler, ev) { handler(ev); }
GUIFramework.OnKeyDown = function(ev) {
    if (CapturedKeys.indexOf(ev.keyCode) >= 0) GUIFramework.preventNextDefaultKeyPressAction = true;
    if (GUIFramework.gui) GUIFramework.gui.OnKeyDown(ev.keyCode, ev.shiftKey, ev.altKey, ev.ctrlKey);
}
GUIFramework.OnKeyUp = function(ev) {
    if (GUIFramework.gui) GUIFramework.gui.OnKeyUp(ev.keyCode, ev.shiftKey, ev.altKey, ev.ctrlKey);
}
GUIFramework.OnKeyPress = function(ev) {
    if (GUIFramework.preventNextDefaultKeyPressAction) {
        ev.preventDefault();
        preventNextDefaultKeyPressAction = false;
    }
    if (ev.which && !ev.altKey && !ev.ctrlKey && !ev.metaKey) {
        if (GUIFramework.gui) GUIFramework.gui.OnKeyPress(ev.which, ev.shiftKey, ev.altKey, ev.ctrlKey);
    }
}
GUIFramework.OnResize = function(ev) {
    GUIFramework.canvas.width = document.body.clientWidth;
    GUIFramework.canvas.height = document.body.clientHeight;
    if (GUIFramework.gui) GUIFramework.gui.Resize(document.body.clientWidth, document.body.clientHeight, true);
}

/////////////
// Drawing //
/////////////
GUIFramework.Update = function() {
    if (GUIFramework.gui && GUIFramework.context) {
        GUIFramework.DrawRect(0, 0, GUIFramework.gui.width, GUIFramework.gui.height, true, GUIFramework.gui.bgStyle); // Clear the canvas
        
        GUIFramework.gui.Draw(GUIFramework.context);
    }
}
GUIFramework.DrawRect = function(x, y, width, height, filled, style) {
    if (filled) {
        GUIFramework.context.fillStyle = style;
        GUIFramework.context.fillRect(x, y, width, height);
    }
    else {
        GUIFramework.context.strokeStyle = style;
        GUIFramework.context.strokeRect(x, y, width, height);
    }
}