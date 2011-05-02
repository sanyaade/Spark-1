/**
 * Extendible object of transitions for use with the show and hide functions
 */
Spark.extend('transitions', {
	show: {
		fade: function(element) {
			// Show the element and grab its opacity
			var original = element.show().style('opacity');
			
			// Set the opacity to 0 and fade its opacity to its original
			element.style('opacity', 0).animate({
				opacity: original
			});
		},
		slide: function(element) {
			// Show the element and grab its height
			var originalHeight = element.show().style('height'),
				// Grab its overflow and default to visible
				originalOverflow = element.style('overflow') || 'visible';
			
			// Set the height to 0 and the overflow to hidden and then slide it to its original. Then set the overflow to its original
			element.style({
				height: 0,
				overflow: 'hidden'
			}).animate({
				height: originalHeight
			}, false, false, function() {
				element.style('overflow', originalOverflow);
			});
		},
		smooth: function(element) {
			// Show the element and grab its height
			var originalHeight = element.show().style('height'),
				// Grab its width
				originalWidth = element.style('width'),
				// Grab its opacity
				originalOpacity = element.style('opacity'),
				// Grab its overflow and default to visible
				originalOverflow = element.style('overflow') || 'visible';
			
			// Set the height, width and opacity to 0. Set the overflow to hidden and then animate everything to its original values. Finally, set the overflow to its original value
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
				element.style('overflow', originalOverflow);
			});
		}
	},
	hide: {
		fade: function(element) {
			// Grab its opacity
			var original = element.style('opacity');
			
			// Fade the opacity to 0, set it back to its original and then hide it
			element.animate({
				opacity: 0
			}, false, false, function() {
				element.style('opacity', original).hide();
			});
		},
		slide: function(element) {
			// Grab its height
			var originalHeight = element.style('height'),
				// Grab its overflow and default to visible
				originalOverflow = element.style('overflow') || 'visible';
			
			// Set its overflow to hidden and slide its height to 0, then set everything back to their defaults and hide it
			element.style('overflow', 'hidden').animate({
				height: 0
			}, false, false, function() {
				element.style({
					height: originalHeight,
					overflow: originalOverflow
				}).hide();
			});
		}
	}
});