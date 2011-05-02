/**
 * Extendible object of transitions for use with the show and hide functions
 * 
 * To add a transition you can use the following template
 * 
 *     Spark.transitions.show.transitionName(function(element, callback) {
 *         // Do your stuff for showing and call the callback if one was passed
 *     });
 * 
 *     Spark.transitions.hide.transitionName(function(element, callback) {
 *         // Do your stuff for hiding and call the callback if one was passed
 *     });
 * 
 * Remember to check for the callback first before calling it and try to put things back how they where
 */
Spark.extend('transitions', {
	show: {
		fade: function(element, callback) {
			// Show the element and grab its opacity
			var original = element.show().style('opacity');
			
			// Set the opacity to 0 and fade its opacity to its original
			element.style('opacity', 0).animate({
				opacity: original
			}, false, false, function() {
				// Run the callback if there is one
				if(callback) {
					callback();
				}
			});
		},
		slide: function(element, callback) {
			// Show the element and grab its height
			var originalHeight = element.show().style('height'),
				// Grab its overflow and default to visible
				originalOverflow = element.style('overflow') || 'visible';
			
			// Set the height to 0 and the overflow to hidden and then slide it to its original
			element.style({
				height: 0,
				overflow: 'hidden'
			}).animate({
				height: originalHeight
			}, false, false, function() {
				// Set the overflow to its original
				element.style('overflow', originalOverflow);
				
				// Run the callback if there is one
				if(callback) {
					callback();
				}
			});
		},
		smooth: function(element, callback) {
			// Show the element and grab its height
			var originalHeight = element.show().style('height'),
				// Grab its width
				originalWidth = element.style('width'),
				// Grab its opacity
				originalOpacity = element.style('opacity'),
				// Grab its overflow and default to visible
				originalOverflow = element.style('overflow') || 'visible';
			
			// Set the height, width and opacity to 0. Set the overflow to hidden and then animate everything to its original values
			element.style({
				height: 0,
				width: 0,
				opacity: 0,
				overflow: 'hidden'
			}).animate({
				height: originalHeight,
				width: originalWidth,
				opacity: originalOpacity
			}, false, false, function() {
				// Set the overflow to its original value
				element.style('overflow', originalOverflow);
				
				// Run the callback if there is one
				if(callback) {
					callback();
				}
			});
		}
	},
	hide: {
		fade: function(element, callback) {
			// Grab its opacity
			var original = element.style('opacity');
			
			// Fade the opacity to 0, set it back to its original
			element.animate({
				opacity: 0
			}, false, false, function() {
				// Hide it
				element.style('opacity', original).hide();
				
				// Run the callback if there is one
				if(callback) {
					callback();
				}
			});
		},
		slide: function(element, callback) {
			// Grab its height
			var originalHeight = element.style('height'),
				// Grab its overflow and default to visible
				originalOverflow = element.style('overflow') || 'visible';
			
			// Set its overflow to hidden and slide its height to 0
			element.style('overflow', 'hidden').animate({
				height: 0
			}, false, false, function() {
				element.style({
					// Set everything back to their defaults and hide it
					height: originalHeight,
					overflow: originalOverflow
				}).hide();
				
				// Run the callback if there is one
				if(callback) {
					callback();
				}
			});
		},
		smooth: function(element, callback) {
			// Grab its height
			var originalHeight = element.style('height'),
				// Grab its width
				originalWidth = element.style('width'),
				// Grab its opacity
				originalOpacity = element.style('opacity'),
				// Grab its overflow and default to visible
				originalOverflow = element.style('overflow') || 'visible';
			
			// Set its overflow to hidden and animate everything to 0
			element.style('overflow', 'hidden').animate({
				height: 0,
				width: 0,
				opacity: 0
			}, false, false, function() {
				// Set everything back to their defaults and hide it
				element.style({
					height: originalHeight,
					width: originalWidth,
					opacity: originalOpacity,
					overflow: originalOverflow
				}).hide();
				
				// Run the callback if there is one
				if(callback) {
					callback();
				}
			});
		}
	}
});