// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  MyGUI.js
//
//  Created by: 	Drew Burden (drewaburden@gmail.com)
//
//      This serves as the entry point for the app that demonstrates the GUIFramework.
//      It creates a GUI for the framework to render.
//
// ================================================================================================

function main() {
    Init();

    let gui = CreateGUI();
    SetGUI(gui);
}

function CreateGUI() {
	// Create GUI
	let gui = new GUI(400, 400, 'rgb(19, 19, 19)', true);

	// Create components
    let btn = new Button("test button", 25, 25, 125, 40, false);
    let checkbox = new Checkbox("test checkbox", 25, 75, 125, 24);
    
    // Add components to GUI
    gui.components.push(btn);
    gui.components.push(checkbox);

	return gui;
}