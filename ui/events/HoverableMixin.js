// ==================== Copyright (c) 2014, Drew Burden. All rights reserved. =====================
//
//  ui\events\Hoverable.js
//
//  Created by:     Drew Burden (drewaburden@gmail.com)
//
//      
//
// ================================================================================================

/**
 *
 * @mixin
 */
var Hoverable = (function() {
	return {
		isOver: false,
		OnMouseIn: function(x, y, isOver) {
			this.isOver = true;
			console.log("test");
		},
		OnMouseOut: function(x, y) {
			this.isOver = false;
		}
	};
})();