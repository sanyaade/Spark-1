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
		fade: function(element, timeframe, easing, callback) {
			// Initialise any required variables
			var original = null;
			
			// Fade its opacity to its original
			element.animate({
				opacity: function() {
				    // Show the element and grab its opacity
				    original =  element.show().style('opacity');
				    
				    // Set its opacity to 0
				    element.style('opacity', 0);
				    
				    // Return the original
				    return original;
				}
			}, timeframe, easing, function() {
				// Run the callback if there is one
				if(callback) {
					callback();
				}
			});
		},
		slide: function(element, timeframe, easing, callback) {
			// Initialise any required variables
			var originalHeight = null,
				originalOverflow = null;
			
			// Set the height to 0 and the overflow to hidden and then slide it to its original
			element.animate({
				height: function() {
				    // Show the element and get its height
				    originalHeight = element.show().style('height');
				    
				    // Grab its overflow and default to visible
				    originalOverflow = element.style('overflow') || 'visible';
				    
				    // Set height to 0 and overflow to hidden
				    element.style({
					height: 0,
					overflow: 'hidden'
				    });
				    
				    // Slide height to its original
				    return originalHeight;
				}
			}, timeframe, easing, function() {
				// Set the overflow to its original
				element.style('overflow', originalOverflow);
				
				// Run the callback if there is one
				if(callback) {
					callback();
				}
			});
		},
		smooth: function(element, timeframe, easing, callback) {
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
			}, timeframe, easing, function() {
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
		fade: function(element, timeframe, easing, callback) {
			// Initialise any required variables
			var original = null;
			
			// Fade the opacity to 0, set it back to its original
			element.animate({
				opacity: function() {
				    // Get the opacity
				    original = element.style('opacity');
				    
				    // Fade to 0
				    return 0;
				}
			}, timeframe, easing, function() {
				// Hide it
				element.style('opacity', original).hide();
				
				// Run the callback if there is one
				if(callback) {
					callback();
				}
			});
		},
		slide: function(element, timeframe, easing, callback) {
			// Initialise any required variables
			var originalHeight = null,
				originalOverflow = null;
			
			// Set its overflow to hidden and slide its height to 0
			element.animate({
				height: function() {
				    // Grab its height
				    originalHeight = element.style('height');
				    
				    // Grab its overflow and default to visible
				    originalOverflow = element.style('overflow') || 'visible';
				    
				    // Set the overflow to hidden
				    element.style('overflow', 'hidden');
				    
				    // Animate the height to 0
				    return 0;
				}
			}, timeframe, easing, function() {
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
		smooth: function(element, timeframe, easing, callback) {
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
			}, timeframe, easing, function() {
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
