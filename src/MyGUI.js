// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  MyGUI.js
//
//  Created by: 	Drew Burden (drewaburden@gmail.com)
//
//      This serves as the entry point for the app that demonstrates the GUIFramework.
//      It creates a GUI for the framework to render and handle.
//
// ================================================================================================

// Web app entry-point
function main() {
    UI.Init();

    let gui = CreateGUI();
    UI.SetGUI(gui);
}

// Create the GUI and its Components
function CreateGUI() {
	// Create GUI
	let gui = new GUI(400, 400, 'rgb(19, 19, 19)', true);

    ////////////
    // button //
    ////////////
    let button = new Button("test button", 25, 25, 120, 35, true);
    let buttonTimesClicked = 0;
    let buttonFocusedState = new Label("unfocused", 
        150+button.x+button.width/2, button.y+button.height/2, 100, button.height,
        '#d2d2d2', "normal 10px Share Tech Mono", TextHAlign.LEFT, TextVAlign.MIDDLE, true);
    let buttonMouseState = new Label("normal", 
        115+buttonFocusedState.x, button.y+button.height/2, 100, button.height,
        '#d2d2d2', "normal 10px Share Tech Mono", TextHAlign.LEFT, TextVAlign.MIDDLE, true);
    let buttonInfoTimesClicked = new Label("clicked " + buttonTimesClicked + " times",
        85+buttonMouseState.x, buttonMouseState.y, 150, buttonMouseState.height,
        '#d2d2d2', "normal 10px Share Tech Mono", TextHAlign.LEFT, TextVAlign.MIDDLE, true);
    ///////////////////
    // button events //
    ///////////////////
    // OnFocusChange
    button.AddListener(Component.OnFocusChange, function(focused) {
        if (focused) buttonFocusedState.text = "focused";
        else buttonFocusedState.text = "unfocused";
    }.bind(this));
    // OnMouseIn
    button.onMouseIn.push(function(x, y) {
        if (button.isMouseDown) buttonMouseState.text = "down hover";
        else buttonMouseState.text = "hover";
    }.bind(this));
    // OnMouseOut
    button.onMouseOut.push(function(x, y) {
        if (button.isMouseDown) buttonMouseState.text = "down";
        else buttonMouseState.text = "normal";
    }.bind(this));
    // OnMouseDown
    button.onMouseDown.push(function(x, y, mouseButton) {
        buttonMouseState.text = "down hover";
    }.bind(this));
    // OnMouseUp
    button.onMouseUp.push(function(x, y, mouseButton) {
        if (button.isMouseOver) {
            buttonMouseState.text = "hover";
            buttonTimesClicked++;
            buttonInfoTimesClicked.text = "clicked " + buttonTimesClicked + " times";
        }
        else buttonMouseState.text = "normal";
    }.bind(this));

    //////////////
    // checkbox //
    //////////////
    let checkbox = new UI.Checkbox("test checkbox", 25, 100, 120, 24);
    let checkboxFocusedState = new Label("unfocused", 
        150+checkbox.x+checkbox.width/2, checkbox.y+checkbox.height/2, 100, checkbox.height,
        '#d2d2d2', "normal 10px Share Tech Mono", TextHAlign.LEFT, TextVAlign.MIDDLE, true);
    let checkboxMouseState = new Label("normal", 
        115+checkboxFocusedState.x, checkbox.y+checkbox.height/2, 100, checkbox.height,
        '#d2d2d2', "normal 10px Share Tech Mono", TextHAlign.LEFT, TextVAlign.MIDDLE, true);
    let checkboxInfoChecked = new Label("checked: " + checkbox.checked,
        85+checkboxMouseState.x, checkboxMouseState.y, 150, checkboxMouseState.height,
        '#d2d2d2', "normal 10px Share Tech Mono", TextHAlign.LEFT, TextVAlign.MIDDLE, true);
    /////////////////////
    // checkbox events //
    /////////////////////
    // OnFocusChange
    checkbox.AddListener(Component.OnFocusChange, function(focused) {
        if (focused) checkboxFocusedState.text = "focused";
        else checkboxFocusedState.text = "unfocused";
    }.bind(this));
    // OnMouseIn
    checkbox.onMouseIn.push(function(x, y) {
        if (checkbox.isMouseDown) checkboxMouseState.text = "down hover";
        else checkboxMouseState.text = "hover";
    }.bind(this));
    // OnMouseOut
    checkbox.onMouseOut.push(function(x, y) {
        if (checkbox.isMouseDown) checkboxMouseState.text = "down";
        else checkboxMouseState.text = "normal";
    }.bind(this));
    // OnMouseDown
    checkbox.onMouseDown.push(function(x, y, mouseButton) {
        checkboxMouseState.text = "down hover";
    }.bind(this));
    // OnMouseUp
    checkbox.onMouseUp.push(function(x, y, mouseButton) {
        if (checkbox.isMouseOver) {
            checkboxMouseState.text = "hover";
        }
        else checkboxMouseState.text = "normal";
    }.bind(this));
    // CheckedChange
    checkbox.onCheckedChange.push(function(checked) {
        checkboxInfoChecked.text = "checked: " + checked;
    }.bind(this));

    /////////////
    // textbox //
    /////////////
    let textbox = new Textbox("test textbox test textbox test textbox", 25, 160, 120, 30, true);
    let textboxFocusedState = new Label("unfocused", 
        150+textbox.x+textbox.width/2, textbox.y+textbox.height/2, 100, textbox.height,
        '#d2d2d2', "normal 10px Share Tech Mono", TextHAlign.LEFT, TextVAlign.MIDDLE, true);
    let textboxMouseState = new Label("normal", 
        115+textboxFocusedState.x, textbox.y+textbox.height/2, 100, textbox.height,
        '#d2d2d2', "normal 10px Share Tech Mono", TextHAlign.LEFT, TextVAlign.MIDDLE, true);
    let textboxKeyState = new Label("normal",
        85+textboxMouseState.x, textboxMouseState.y, 150, textboxMouseState.height,
        '#d2d2d2', "normal 10px Share Tech Mono", TextHAlign.LEFT, TextVAlign.MIDDLE, true);
    ////////////////////
    // textbox events //
    ////////////////////
    // OnFocusChange
    textbox.AddListener(Component.OnFocusChange, function(focused) {
        if (focused) textboxFocusedState.text = "focused";
        else textboxFocusedState.text = "unfocused";
    }.bind(this));
    // OnMouseIn
    textbox.onMouseIn.push(function(x, y) {
        if (textbox.isMouseDown) textboxMouseState.text = "down hover";
        else textboxMouseState.text = "hover";
    }.bind(this));
    // OnMouseOut
    textbox.onMouseOut.push(function(x, y) {
        if (textbox.isMouseDown) textboxMouseState.text = "down";
        else textboxMouseState.text = "normal";
    }.bind(this));
    // OnMouseDown
    textbox.onMouseDown.push(function(x, y, mouseButton) {
        textboxMouseState.text = "down hover";
    }.bind(this));
    // OnMouseUp
    textbox.onMouseUp.push(function(x, y, mouseButton) {
        if (textbox.isMouseOver) {
            textboxMouseState.text = "hover";
        }
        else textboxMouseState.text = "normal";
    }.bind(this));
    // OnKeyDown
    textbox.onKeyDown.push(function(key, shift, alt, ctrl) {
        textboxKeyState.text = "key down";
    }.bind(this));
    // OnKeyUp
    textbox.onKeyUp.push(function(key, shift, alt, ctrl) {
        if (!shift && !alt && !ctrl) textboxKeyState.text = "normal";
    }.bind(this));
    

    // Add components to GUI
    gui.components.push(button);
    gui.components.push(checkbox);
    gui.components.push(buttonFocusedState);
    gui.components.push(buttonMouseState);
    gui.components.push(buttonInfoTimesClicked);
    gui.components.push(checkboxFocusedState);
    gui.components.push(checkboxMouseState);
    gui.components.push(checkboxInfoChecked);
    gui.components.push(textbox);
    gui.components.push(textboxFocusedState);
    gui.components.push(textboxMouseState);
    gui.components.push(textboxKeyState);

	return gui;
}