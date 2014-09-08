// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  .\MyGUI.js
//
//  Created by: 	Drew Burden (drewaburden@gmail.com)
//
//
//
// ================================================================================================

//////////////
// Includes //
//////////////
include('GUIFramework.js');

function main() {
    Init();
    
    var gui = CreateGUI();
    SetGUI(gui);

    StartRendering();
}

function CreateGUI() {
	// Create GUI
	var gui = new GUI(400, 400);

	// Create components
    var btnBg = new NinePatch("assets/buttonbg.png", 5, 5, 250, 50, 14, 14, 14, 14, true);
    var btnLabel = new Label("test", btnBg.x+btnBg.width/2, btnBg.y+btnBg.height/2, 150, 50,
    	"rgb(255, 255, 255)", "bold 18px Arial", TextHAlign.CENTER, TextVAlign.MIDDLE, true);
    
    // Add components to GUI
    gui.components.push(btnBg);
    gui.components.push(btnLabel);

	return gui;
}