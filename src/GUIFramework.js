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
Util.include('src/ui/input/Input.js');
Util.include('src/ui/input/Keys.js');
Util.include('src/ui/Destroyable.js');
Util.include('src/ui/Drawable.js');
Util.include('src/ui/TextAlign.js');
Util.include('src/ui/components/Component.js');
Util.include('src/ui/components/Image.js');
Util.include('src/ui/components/NinePatch.js');
Util.include('src/ui/components/Label.js');
Util.include('src/ui/components/Button.js');
Util.include('src/ui/components/Checkbox.js');
Util.include('src/ui/components/Caret.js');
Util.include('src/ui/components/Textbox.js');
Util.include('src/ui/GUI.js');

/**
 * @namespace
 */
var UI = UI || {};

///////////////
// Variables //
///////////////
UI.fps = 30;
UI.context = null;
UI.canvas = null;
UI.gui = null;
UI.unitTesting = false;
UI.preventNextDefaultKeyPressAction = false;

///////////////
// Functions //
///////////////
/**
 * Initialize the GUIFramework. This must be done before any other parts of GUIFramework will
 * work properly.
 */
UI.Init = function() {
    // Set up context references
    UI.canvas = document.getElementById("maincanvas");
    UI.context = UI.canvas.getContext("2d");

    // Set up raw canvas events
	UI.canvas.addEventListener('mousedown', UI.MouseEvent.bind(null, UI.OnMouseDown), false);	
	UI.canvas.addEventListener('mouseup',   UI.MouseEvent.bind(null, UI.OnMouseUp), false);	
	UI.canvas.addEventListener('mousemove', UI.MouseEvent.bind(null, UI.OnMouseMove), false);
    UI.canvas.addEventListener('keydown',   UI.KeyEvent.bind(null, UI.OnKeyDown), false); 
    UI.canvas.addEventListener('keyup',     UI.KeyEvent.bind(null, UI.OnKeyUp), false);
    UI.canvas.addEventListener('keypress',  UI.KeyEvent.bind(null, UI.OnKeyPress), false); 
    window.addEventListener('resize',       UI.OnResize, false);
    UI.canvas.focus(); // Focus the canvas for key input

    setInterval(UI.Update, 1000/UI.fps.validate(Number)); // Start Update loop
}
/**
 * Provides GUIFramework with a {@link UI.GUI} to render.
 * @param {UI.GUI} gui
 */
UI.SetGUI = function(gui) {
    UI.gui = gui.validate(UI.GUI);
    UI.OnResize();
}
/**
 * @param {number} fps - How many times per second GUIFramework should update what is displayed on the screen.
 */
UI.SetFPS = function(fps) { UI.fps = fps.validate(Number); }
/**
 * @returns {number} How many times per second GUIFramework should update what is displayed on the screen.
 */
UI.GetFPS = function(fps) { return UI.fps; }

////////////
// Events //
////////////
UI.MouseEvent = function(handler, ev) { 
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
UI.OnMouseDown = function(x, y, button) { if (UI.gui) UI.gui.OnMouseDown(x, y, button); }
UI.OnMouseUp = function(x, y, button) { if (UI.gui) UI.gui.OnMouseUp(x, y, button); }
UI.OnMouseMove = function(x, y) { if (UI.gui) UI.gui.OnMouseMove(x, y); }
UI.KeyEvent = function(handler, ev) { handler(ev); }
UI.OnKeyDown = function(ev) {
    if (Input.CapturedKeys.indexOf(ev.keyCode) >= 0) UI.preventNextDefaultKeyPressAction = true;
    if (UI.gui) UI.gui.OnKeyDown(ev.keyCode, ev.shiftKey, ev.altKey, ev.ctrlKey);
}
UI.OnKeyUp = function(ev) {
    if (UI.gui) UI.gui.OnKeyUp(ev.keyCode, ev.shiftKey, ev.altKey, ev.ctrlKey);
}
UI.OnKeyPress = function(ev) {
    if (UI.preventNextDefaultKeyPressAction) {
        ev.preventDefault();
        UI.preventNextDefaultKeyPressAction = false;
    }
    if (ev.which && !ev.altKey && !ev.ctrlKey && !ev.metaKey) {
        if (UI.gui) UI.gui.OnKeyPress(ev.which, ev.shiftKey, ev.altKey, ev.ctrlKey);
    }
}
UI.OnResize = function(ev) {
    UI.canvas.width = document.body.clientWidth;
    UI.canvas.height = document.body.clientHeight;
    if (UI.gui) UI.gui.Resize(document.body.clientWidth, document.body.clientHeight, true);
}

/////////////
// Drawing //
/////////////
UI.Update = function() {
    if (UI.gui && UI.context) {
        UI.DrawRect(0, 0, UI.gui.width, UI.gui.height, true, UI.gui.bgStyle); // Clear the canvas
        
        UI.gui.Draw(UI.context);
    }
}
UI.DrawRect = function(x, y, width, height, filled, style) {
    if (filled) {
        UI.context.fillStyle = style;
        UI.context.fillRect(x, y, width, height);
    }
    else {
        UI.context.strokeStyle = style;
        UI.context.strokeRect(x, y, width, height);
    }
}