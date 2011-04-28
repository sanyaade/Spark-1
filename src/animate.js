/**
 * Animate styles of the specified elements
 * 
 * The minimal use of this function would be passing an object of animations like so
 * 
 *     $('p').animate({
 *         opacity: .5
 *     });
 * 
 * This will animate all p tags opacity to 0.5 over 600ms using the outQuad easing method.
 * 
 * You can pass a timeframe and easing like so.
 * 
 *     $('p').animate({
 *         opacity: .5
 *     }, 1000, 'inBounce');
 * 
 * This will obviously use inBounce as the easing method and will last for one second, or 1000 milliseconds.
 * 
 * You can also pass a callback function to be run when the animation completes like so.
 * 
 *     $('p').animate({
 *         opacity: .5
 *     }, 1000, 'inBounce', function() {
 *         console.log('Animation complete');
 *     });
 * 
 * If you pass false for the timeframe or easing then it will default to 600ms and outQuad.
 * 
 * If you chain animations then they will stack up. Even if it is called from a different chain then the animations will stack. For example, these animations will run one after another.
 * 
 *     $('p').animate({
 *         opacity: .5
 *     });
 *     
 *     $('p').animate({
 *         opacity: 1
 *     });
 * 
 * The following code will produce an identical outcome to the one above.
 * 
 *     $('p').animate({
 *         opacity: .5
 *     }).animate({
 *         opacity: 1
 *     });
 * 
 * @param {Object} style Name of the style you wish to animate and then what you want to animate to
 * @param {Number|Boolean} timeframe How many milliseconds you wish the animation to take, pass false to default to 600
 * @param {String|Boolean} easing The easing method to use either in, out or inOut followed by one of the following: Quad, Cubic, Quart, Quint, Sine, Expo, Circ, Elastic, Back or Bounce, pass false to default to outQuad. You can also use linear
 * @param {Function} callback Function to be run on completion of the animation
 * @returns {Object} Returns the Spark object for chaining
 */
Spark.extend('animate', function(animations, timeframe, easing, callback) {
	// Initialise any required variables
	var that = this,
		from = null,
		to = null,
		unit = null,
		difference = null,
		fps = 50,
		i = null,
		frames = null,
		found = null,
		calculated = null,
		callbackOffset = 0,
		colours = null,
		got = null,
		onlyUnits = /[^%|in|cm|mm|em|ex|pt|pc|px]/gi,
		easingMethods = {
			inQuad: function (t, b, c, d) {
				return c*(t/=d)*t + b;
			},
			outQuad: function (t, b, c, d) {
				return -c *(t/=d)*(t-2) + b;
			},
			inOutQuad: function (t, b, c, d) {
				if ((t/=d/2) < 1) {
					return c/2*t*t + b;
				}
				return -c/2 * ((--t)*(t-2) - 1) + b;
			},
			inCubic: function (t, b, c, d) {
				return c*(t/=d)*t*t + b;
			},
			outCubic: function (t, b, c, d) {
				return c*((t=t/d-1)*t*t + 1) + b;
			},
			inOutCubic: function (t, b, c, d) {
				if ((t/=d/2) < 1) {
					return c/2*t*t*t + b;
				}
				return c/2*((t-=2)*t*t + 2) + b;
			},
			inQuart: function (t, b, c, d) {
				return c*(t/=d)*t*t*t + b;
			},
			outQuart: function (t, b, c, d) {
				return -c * ((t=t/d-1)*t*t*t - 1) + b;
			},
			inOutQuart: function (t, b, c, d) {
				if ((t/=d/2) < 1) {
					return c/2*t*t*t*t + b;
				}
				return -c/2 * ((t-=2)*t*t*t - 2) + b;
			},
			inQuint: function (t, b, c, d) {
				return c*(t/=d)*t*t*t*t + b;
			},
			outQuint: function (t, b, c, d) {
				return c*((t=t/d-1)*t*t*t*t + 1) + b;
			},
			inOutQuint: function (t, b, c, d) {
				if ((t/=d/2) < 1) {
					return c/2*t*t*t*t*t + b;
				}
				return c/2*((t-=2)*t*t*t*t + 2) + b;
			},
			inSine: function (t, b, c, d) {
				return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
			},
			outSine: function (t, b, c, d) {
				return c * Math.sin(t/d * (Math.PI/2)) + b;
			},
			inOutSine: function (t, b, c, d) {
				return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
			},
			inExpo: function (t, b, c, d) {
				return (t === 0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
			},
			outExpo: function (t, b, c, d) {
				return (t === d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
			},
			inOutExpo: function (t, b, c, d) {
				if(t === 0) {
					return b;
				}
				else if(t === d) {
					return b + c;
				}
				else if((t/=d/2) < 1) {
					return c/2 * Math.pow(2, 10 * (t - 1)) + b;
				}
				return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
			},
			inCirc: function (t, b, c, d) {
				return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
			},
			outCirc: function (t, b, c, d) {
				return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
			},
			inOutCirc: function (t, b, c, d) {
				if ((t/=d/2) < 1) {
					return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
				}
				return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
			},
			inElastic: function (t, b, c, d, a, p) {
				var s = null;
				if(t === 0) {
					return b;
				} 
				else if((t/=d) === 1) {
					return b+c;
				}
				if(!p) {
					p=d*0.3;
				}
				if(a < Math.abs(c)) {
					a=c;
					s=p/4;
				}
				else {
					a = Math.abs(c);
					s = p/(2*Math.PI) * Math.asin(c/a);
				}
				return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			},
			outElastic: function (t, b, c, d, a, p) {
				var s = null;
				if(t === 0) {
					return b;
				}
				else if((t/=d) === 1) {
					return b+c;
				}
				else if (!p) {
					p=d*0.3;
				}
				if(a < Math.abs(c)) {
					a=c;
					s=p/4;
				}
				else {
					a=Math.abs(c);
					s= p/(2*Math.PI) * Math.asin (c/a);
				}
				return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
			},
			inOutElastic: function (t, b, c, d, a, p) {
				var s = null;
				if (t === 0) {
					return b;
				}
				else if ((t/=d/2) === 2) {
					return b+c;
				}
				else if (!p) {
					p=d*(0.3*1.5);
				}
				if (a < Math.abs(c)) {
					a=c;
					s=p/4;
				}
				else {
					a=Math.abs(c);
					s= p/(2*Math.PI) * Math.asin (c/a);
				}
				if (t < 1) {
					return -0.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
				}
				return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
			},
			inBack: function (t, b, c, d, s) {
				if(typeof s === 'undefined') {
					s = 1.70158;
				}
				return c*(t/=d)*t*((s+1)*t - s) + b;
			},
			outBack: function (t, b, c, d, s) {
				if (typeof s === 'undefined') {
					s = 1.70158;
				}
				return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
			},
			inOutBack: function (t, b, c, d, s) {
				if (typeof s === 'undefined') {
					s = 1.70158;
				}
				if ((t/=d/2) < 1) {
					return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
				}
				return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
			},
			inBounce: function (t, b, c, d) {
				return c - this.outBounce (d-t, 0, c, d) + b;
			},
			outBounce: function (t, b, c, d) {
				if ((t/=d) < (1/2.75)) {
					return c*(7.5625*t*t) + b;
				} 
				else if (t < (2/2.75)) {
					return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
				} 
				else if (t < (2.5/2.75)) {
					return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
				}
				else {
					return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
				}
			},
			inOutBounce: function (t, b, c, d) {
				if (t < d/2) {
					return this.inBounce (t*2, 0, c, d) * 0.5 + b;
				}
				return this.outBounce (t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
			},
			linear: function(frame, original, change, frames) {
				return original + (frame * (change / frames));
			}
		};
	
	// Set up defaults
	timeframe = (timeframe) ? timeframe : 600;
	easing = (easing) ? easing : 'outQuad';
	
	// Convert colors to arrays
	this.each(function(to, style) {
		// Check that it is a color
		if(style.toLowerCase().indexOf('color') !== -1) {
			// Convert it to an array
			animations[style] = that.color.toArray(to);
		}
	}, animations);
	
	function applyStyle(e, name, value, time) {
		setTimeout(function() {
			e.style(name, value);
		}, time);
	}
	
	function stackAnimation(e, animations, timeframe, easing, callback) {
		setTimeout(function() {
			e.noCallback = true;
			e.animate(animations, timeframe, easing, callback);
		}, e.data('SparkOffset'));
	}
	
	function reduceOffset(e, timeframe) {
		setTimeout(function() {
			e.data('SparkOffset', e.data('SparkOffset') - timeframe);
		}, timeframe);
	}
	
	function getDefault(style) {
		if(style === 'opacity') {
			return 1;
		}
		else {
			return 0;
		}
	}
	
	// Loop through all the elements
	this.each(function(e) {
		// Grab the element
		found = that.find(e);
		
		// Make sure there is an offset
		if(found.data('SparkOffset') === false) {
			found.data('SparkOffset', 0);
			found.data('SparkFullOffset', 0);
		}
		
		// Check if we can call now, or if we need to add it to the animation stack
		if(found.data('SparkOffset') > 0) {
			// Add it to the stack
			stackAnimation(found, animations, timeframe, easing, callback);
			
			// Return out of the loop
			return false;
		}
		
		// Set the offset
		found.data('SparkOffset', found.data('SparkOffset') + timeframe);
		found.data('SparkFullOffset', found.data('SparkFullOffset') + timeframe);
		
		// Reduce the offset
		reduceOffset(found, timeframe);
		
		that.each(function(to, style) {
			// Get the unit if the to is a string
			if(typeof to === 'string') {
				unit = to.replace(onlyUnits, '');
			}
			else {
				// Otherwise set it to an empty string
				unit = '';
			}
			
			if(to instanceof Array) {
				// Grab where we need to animate from
				from = that.color.toArray(found.style(style));
				
				// Work out the difference
				difference = [to[0] - from[0], to[1] - from[1], to[2] - from[2]];
			}
			else {
				// Convert to into a float
				to = parseFloat(to);
				
				// Grab where we need to animate from
				got = found.style(style);
				
				if(got !== '' && typeof got === 'string') {
					from = parseFloat(found.style(style));
				}
				else if(typeof got === 'number') {
					from = got;
				}
				else {
					from = getDefault(style);
				}
				
				// Work out the difference
				difference = to - from;
			}
			
			// Work out how many frames are required
			frames = timeframe / (1000 / fps);
			
			// Loop through all the frames
			for(i = 1; i <= frames; i++) {
				if(to instanceof Array) {
					// Work out the value
					calculated = that.color.toRgb([
						Math.floor(easingMethods[easing](i, from[0], difference[0], frames)),
						Math.floor(easingMethods[easing](i, from[1], difference[1], frames)),
						Math.floor(easingMethods[easing](i, from[2], difference[2], frames))
					]);
					
					// Set it to be applied
					applyStyle(found, style, calculated, i * (1000 / fps));
				}
				else {
					// Work out the value
					calculated = easingMethods[easing](i, from, difference, frames) + unit;
					
					// Set it to be applied
					applyStyle(found, style, (calculated.replace(onlyUnits, '').length === 0) ? parseFloat(calculated) : calculated, i * (1000 / fps));
				}
			}
		}, animations);
	});
	
	// Set the callback to be run if one was passed
	if(typeof callback === 'function' && this.noCallback !== true) {
		setTimeout(function() {
			// Loop through all the elements
			that.each(function(e) {
				// Grab the element
				found = that.find(e);
				
				if(found.data('SparkFullOffset') > callbackOffset) {
					callbackOffset = found.data('SparkFullOffset');
				}
			});
			
			setTimeout(function() {
				callback();
				
				that.each(function(e) {
					that.find(e).data('SparkFullOffset', 0);
				});
			}, (callbackOffset === timeframe) ? callbackOffset - timeframe : callbackOffset);
		}, timeframe);
	}
	
	// Return the Spark object
	return this;
});
