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
		fps = 50,
		i = null,
		element = null,
		notUnit = /[\d\.\-]/g,
		stack = null,
		from = null,
		to = null,
		unit = null,
		difference = null,
		a = null,
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
	
	function doFrame(element, name, value, time) {
		// Set the timeout
		setTimeout(function() {
			// Apply the style
			element.style(name, value);
		}, time);
	}
	
	function animate(element) {
		// Grab the animation stack
		stack = element.data('SparkAnimations');
		
		// Make sure we have some animations
		if(stack.length > 0) {
			// Check if the first one is not running
			if(stack[0].running === false) {
				// It is not, we need to animate it, so copy the first stack into a
				a = stack[0];
				
				// Set running to true
				a.running = true;
				
				// Loop through the animations
				that.each(function(value, name) {
					// Get the from value
					from = parseFloat(element.style(name));
					
					// Get the to value
					to = parseFloat(value);
					
					// Get the unit
					if(typeof value === 'string') {
						unit = value.replace(notUnit, '');
					}
					else {
						unit = 0;
					}
					
					// Work out the difference
					difference = to - from;
					
					// Loop over all frames
					for(i = 1; i <= a.frames; i++) {
						// Pass this information to doFrame function
						doFrame(element, name, easingMethods[a.easing](i, from, difference, a.frames) + unit, i * (1000 / fps));
					}
				}, a.animations);
			}
		}
	}
	
	// Loop through all elements
	this.each(function(e) {
		// Adopt the element into an instance
		element = that.find(e);
		
		// Make sure the element has an animations array
		if(element.data('SparkAnimations') === false) {
			element.data('SparkAnimations', []);
		}
		
		// Push a new animation object into it
		element.data('SparkAnimations').push({
			animations: animations,
			frames: ((timeframe) ? timeframe : 600) / (1000 / fps),
			easing: (easing) ? easing : 'outQuad',
			callback: callback,
			running: false
		});
		
		// Call the animate function and pass the element
		animate(element);
	});
	
	// Return the Spark object
	return this;
});
