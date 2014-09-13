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

    /////////
    // btn //
    /////////
    let btn = new Button("test button", 25, 25, 125, 40, true);
    let btnTimesClicked = 0;
    let btnInfoState = new Label("normal", 
        125+btn.x+btn.width/2, btn.y+btn.height/2, 100, btn.height,
        '#d2d2d2', "normal 10px Share Tech Mono", TextHAlign.LEFT, TextVAlign.MIDDLE, true);
    let btnInfoTimesClicked = new Label("clicked " + btnTimesClicked + " times",
        85+btnInfoState.x, btnInfoState.y, 150, btnInfoState.height,
        '#d2d2d2', "normal 10px Share Tech Mono", TextHAlign.LEFT, TextVAlign.MIDDLE, true);
    ////////////////
    // btn events //
    ////////////////
    // OnMouseIn
    btn.onMouseIn.push(function(x, y) {
        if (btn.isDown) btnInfoState.text = "down hover";
        else btnInfoState.text = "hover";
    }.bind(this));
    // OnMouseOut
    btn.onMouseOut.push(function() {
        if (btn.isDown) btnInfoState.text = "down";
        else btnInfoState.text = "normal";
    }.bind(this));
    // OnMouseDown
    btn.onMouseDown.push(function(x, y, button) {
        btnInfoState.text = "down hover";
    }.bind(this));
    // OnMouseUp
    btn.onMouseUp.push(function(x, y, button) {
        if (btn.isOver) {
            btnInfoState.text = "hover";
            btnTimesClicked++;
            btnInfoTimesClicked.text = "clicked " + btnTimesClicked + " times";
        }
        else btnInfoState.text = "normal";
    }.bind(this));

    //////////////
    // checkbox //
    //////////////
    let checkbox = new Checkbox("test checkbox", 25, 100, 125, 24);
    let checkboxInfoState = new Label("normal", 
        125+checkbox.x+checkbox.width/2, checkbox.y+checkbox.height/2, 100, checkbox.height,
        '#d2d2d2', "normal 10px Share Tech Mono", TextHAlign.LEFT, TextVAlign.MIDDLE, true);
    let checkboxInfoChecked = new Label("checked: " + checkbox.checked,
        85+checkboxInfoState.x, checkboxInfoState.y, 150, checkboxInfoState.height,
        '#d2d2d2', "normal 10px Share Tech Mono", TextHAlign.LEFT, TextVAlign.MIDDLE, true);
    ////////////////
    // btn events //
    ////////////////
    // OnMouseIn
    checkbox.onMouseIn.push(function(x, y) {
        if (checkbox.isDown) checkboxInfoState.text = "down hover";
        else checkboxInfoState.text = "hover";
    }.bind(this));
    // OnMouseOut
    checkbox.onMouseOut.push(function() {
        if (checkbox.isDown) checkboxInfoState.text = "down";
        else checkboxInfoState.text = "normal";
    }.bind(this));
    // OnMouseDown
    checkbox.onMouseDown.push(function(x, y, button) {
        checkboxInfoState.text = "down hover";
    }.bind(this));
    // OnMouseUp
    checkbox.onMouseUp.push(function(x, y, button) {
        if (checkbox.isOver) {
            checkboxInfoState.text = "hover";
        }
        else checkboxInfoState.text = "normal";
    }.bind(this));
    // CheckedChange
    checkbox.onCheckedChange.push(function(checked) {
        checkboxInfoChecked.text = "checked: " + checked;
    }.bind(this));

    /////////////
    // textbox //
    /////////////
    let textbox = new Textbox("test textbox", 25, 160, 125, 30, true);

    // Add components to GUI
    gui.components.push(btn);
    gui.components.push(checkbox);
    gui.components.push(btnInfoState);
    gui.components.push(btnInfoTimesClicked);
    gui.components.push(checkboxInfoState);
    gui.components.push(checkboxInfoChecked);
    gui.components.push(textbox);

	return gui;
}