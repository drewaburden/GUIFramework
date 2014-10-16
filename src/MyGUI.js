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
	let gui = new UI.GUI(400, 400, 'rgb(19, 19, 19)', true);

    ////////////
    // button //
    ////////////
    let button = new UI.Button("test button", 25, 25, 120, 35, true);
    let buttonTimesClicked = 0;
    let buttonFocusedState = new UI.Label("unfocused", 
        150+button.x+button.width/2, button.y+button.height/2, 100, button.height,
        '#d2d2d2', "normal 10px Share Tech Mono", TextHAlign.LEFT, TextVAlign.MIDDLE, true);
    let buttonMouseState = new UI.Label("normal", 
        115+buttonFocusedState.x, button.y+button.height/2, 100, button.height,
        '#d2d2d2', "normal 10px Share Tech Mono", TextHAlign.LEFT, TextVAlign.MIDDLE, true);
    let buttonInfoTimesClicked = new UI.Label("clicked " + buttonTimesClicked + " times",
        85+buttonMouseState.x, buttonMouseState.y, 150, buttonMouseState.height,
        '#d2d2d2', "normal 10px Share Tech Mono", TextHAlign.LEFT, TextVAlign.MIDDLE, true);
    ///////////////////
    // button events //
    ///////////////////
    button.AddListener('focuschanged', function(event) {
        if (event.detail.focused) buttonFocusedState.SetText("focused");
        else buttonFocusedState.SetText("unfocused");
    }.bind(this));
    button.AddListener('mousein', function(event) {
        if (button.IsMouseDown()) buttonMouseState.SetText("down hover");
        else buttonMouseState.SetText("hover");
    }.bind(this));
    button.AddListener('mouseout', function(event) {
        if (button.IsMouseDown()) buttonMouseState.SetText("down");
        else buttonMouseState.SetText("normal");
    }.bind(this));
    button.AddListener('mousedown', function(event) {
        buttonMouseState.SetText("down hover");
    }.bind(this));
    button.AddListener('mouseup', function(event) {
        if (button.IsMouseOver()) buttonMouseState.SetText("hover");
        else buttonMouseState.SetText("normal");
    }.bind(this));
    button.AddListener('clicked', function(event) {
        buttonTimesClicked++;
        buttonInfoTimesClicked.SetText("clicked " + buttonTimesClicked + " times");
    }.bind(this));

    //////////////
    // checkbox //
    //////////////
    let checkbox = new UI.Checkbox("test checkbox", 25, 100, 120, 24);
    let checkboxFocusedState = new UI.Label("unfocused", 
        150+checkbox.x+checkbox.width/2, checkbox.y+checkbox.height/2, 100, checkbox.height,
        '#d2d2d2', "normal 10px Share Tech Mono", TextHAlign.LEFT, TextVAlign.MIDDLE, true);
    let checkboxMouseState = new UI.Label("normal", 
        115+checkboxFocusedState.x, checkbox.y+checkbox.height/2, 100, checkbox.height,
        '#d2d2d2', "normal 10px Share Tech Mono", TextHAlign.LEFT, TextVAlign.MIDDLE, true);
    let checkboxInfoChecked = new UI.Label("checked: " + checkbox.IsChecked(),
        85+checkboxMouseState.x, checkboxMouseState.y, 150, checkboxMouseState.height,
        '#d2d2d2', "normal 10px Share Tech Mono", TextHAlign.LEFT, TextVAlign.MIDDLE, true);
    /////////////////////
    // checkbox events //
    /////////////////////
    checkbox.AddListener('focuschanged', function(event) {
        if (event.detail.focused) checkboxFocusedState.SetText("focused");
        else checkboxFocusedState.SetText("unfocused");
    }.bind(this));
    checkbox.AddListener('mousein', function(event) {
        if (checkbox.IsMouseDown()) checkboxMouseState.SetText("down hover");
        else checkboxMouseState.SetText("hover");
    }.bind(this));
    checkbox.AddListener('mouseout', function(event) {
        if (checkbox.IsMouseDown()) checkboxMouseState.SetText("down");
        else checkboxMouseState.SetText("normal");
    }.bind(this));
    checkbox.AddListener('mousedown', function(event) {
        checkboxMouseState.SetText("down hover");
    }.bind(this));
    checkbox.AddListener('mouseup', function(event) {
        if (checkbox.IsMouseOver()) checkboxMouseState.SetText("hover");
        else checkboxMouseState.SetText("normal");
    }.bind(this));
    checkbox.AddListener('checkedchanged', function(event) {
        checkboxInfoChecked.SetText("checked: " + event.detail.checked);
    }.bind(this));

    /////////////
    // textbox //
    /////////////
    let textbox = new UI.Textbox("test textbox test textbox test textbox", 25, 160, 120, 30, true);
    let textboxFocusedState = new UI.Label("unfocused", 
        150+textbox.x+textbox.width/2, textbox.y+textbox.height/2, 100, textbox.height,
        '#d2d2d2', "normal 10px Share Tech Mono", TextHAlign.LEFT, TextVAlign.MIDDLE, true);
    let textboxMouseState = new UI.Label("normal", 
        115+textboxFocusedState.x, textbox.y+textbox.height/2, 100, textbox.height,
        '#d2d2d2', "normal 10px Share Tech Mono", TextHAlign.LEFT, TextVAlign.MIDDLE, true);
    let textboxKeyState = new UI.Label("normal",
        85+textboxMouseState.x, textboxMouseState.y, 150, textboxMouseState.height,
        '#d2d2d2', "normal 10px Share Tech Mono", TextHAlign.LEFT, TextVAlign.MIDDLE, true);
    ////////////////////
    // textbox events //
    ////////////////////
    textbox.AddListener('focuschanged', function(event) {
        if (event.detail.focused) textboxFocusedState.SetText("focused");
        else textboxFocusedState.SetText("unfocused");
    }.bind(this));
    textbox.AddListener('mousein', function(event) {
        if (textbox.IsMouseDown()) textboxMouseState.SetText("down hover");
        else textboxMouseState.SetText("hover");
    }.bind(this));
    textbox.AddListener('mouseout', function(event) {
        if (textbox.IsMouseDown()) textboxMouseState.SetText("down");
        else textboxMouseState.SetText("normal");
    }.bind(this));
    textbox.AddListener('mousedown', function(event) {
        textboxMouseState.SetText("down hover");
    }.bind(this));
    textbox.AddListener('mouseup', function(event) {
        if (textbox.IsMouseOver()) {
            textboxMouseState.SetText("hover");
        }
        else textboxMouseState.SetText("normal");
    }.bind(this));
    textbox.AddListener('keydown', function(event) {
        textboxKeyState.SetText("key down");
    }.bind(this));
    textbox.AddListener('keyup', function(event) {
        if (!event.detail.shift && !event.detail.alt && !event.detail.ctrl) textboxKeyState.SetText("normal");
    }.bind(this));
    

    // Add components to GUI
    gui.AddComponent(button);
    gui.AddComponent(checkbox);
    gui.AddComponent(buttonFocusedState);
    gui.AddComponent(buttonMouseState);
    gui.AddComponent(buttonInfoTimesClicked);
    gui.AddComponent(checkboxFocusedState);
    gui.AddComponent(checkboxMouseState);
    gui.AddComponent(checkboxInfoChecked);
    gui.AddComponent(textbox);
    gui.AddComponent(textboxFocusedState);
    gui.AddComponent(textboxMouseState);
    gui.AddComponent(textboxKeyState);

	return gui;
}