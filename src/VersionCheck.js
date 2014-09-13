// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  VersionCheck.js
//
//  Created by: 	Drew Burden (drewaburden@gmail.com)
//  
//  
//
// ================================================================================================

var testedOnVersions = ['Firefox/34.0'];

var matchingVersion = false;
// Version check
var userAgent = window.navigator.userAgent;
for (version of testedOnVersions) {
    if (userAgent.search(version) >= 0) {
        matchingVersion = true;
        break;
    }
}
if (!matchingVersion) {
    var error = document.getElementById('error');
    if (error) {
        error.style.display = 'block';
        error.textContent = "Warning: This framework has not been tested on your browser and/or the version " +
            "of your browser. It will likely not work correctly on your browser. This framework requires some " + 
            "very experimental EMCAScript 6 features, and was tested on the Aurora build of Firefox (version " + 
            "34.0, at the time of writing).";
        console.log("Your browser: " + userAgent);
    }
}