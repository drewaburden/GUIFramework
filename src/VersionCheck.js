// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  VersionCheck.js
//
//  Created by: 	Drew Burden (drewaburden@gmail.com)
//  
//      Check the user's browser and version to make sure it's compatible. If it's not one of the
//      browser/version combos that is known to work, display a warning message, and try to keep
//      going with the app anyways.
//
// ================================================================================================

var testedOnVersions = ['Firefox/34.0', 'Firefox/35.0'];

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
            "35.0, at the time of writing).";
        console.log("Your browser: " + userAgent);
    }
}