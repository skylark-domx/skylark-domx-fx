/**
 * skylark-domx-fx - The skylark fx library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx-ns");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-domx-fx/fx',[
    "skylark-langx/skylark",
    "skylark-langx/langx"
], function(skylark,langx) {

    function fx() {
        return fx;
    }

    langx.mixin(fx, {
        off: false,
        speeds: {
            normal: 400,
            fast: 200,
            slow: 600
        }
    });

    return skylark.attach("domx.fx", fx);
});
define('skylark-domx-fx/animate',[
    "skylark-langx/langx",
    "skylark-domx-transits/transit",
    "skylark-domx-animates/animation",
    "./fx"
], function(langx, transit,animation,fx) {

    /*   
     * Perform a custom animation of a set of CSS properties.
     * @param {Object} elm  
     * @param {Number or String} properties
     * @param {String} ease
     * @param {Number or String} duration
     * @param {Function} callback
     * @param {Number or String} delay
     */
    function animate(elm, properties, duration, ease, callback, delay) {
        if (langx.isString(properties)) {
            return animation(elm,properties,duration,ease,callback,delay);
        } else {
            return transit(elm,properties,duration,ease,callback,delay);
        }

    }

    return fx.animate = animate;

});
define('skylark-domx-fx/bounce',[
    "skylark-domx-transits",
    "./fx"
],function(transits,fx) {
    return fx.bounce = transits.bounce;
});
define('skylark-domx-fx/emulateTransitionEnd',[
    "skylark-domx-transits",
    "./fx"
],function(transits,fx) {
    return fx.emulateTransitionEnd = transits.emulateTransitionEnd;
});
define('skylark-domx-fx/explode',[
    "skylark-domx-transits",
    "./fx"
],function(transits,fx) {
	return fx.explode = transits.explode;
});

define('skylark-domx-fx/fadeIn',[
    "skylark-domx-transits",
    "./fx"
],function(transits,fx) {

    return fx.fadeIn = transits.fadeIn;
});
define('skylark-domx-fx/fadeOut',[
    "skylark-domx-transits",
    "./fx"
],function(transits,fx) {

    return fx.fadeOut = transits.fadeOut;
});
define('skylark-domx-fx/fade',[
    "skylark-domx-transits",
    "./fx"
],function(transits,fx) {

    return fx.fade = transits.fade;
});
define('skylark-domx-fx/fadeToggle',[
    "skylark-domx-transits",
    "./fx"
],function(transits,fx) {

    return fx.fadeToggle = transits.fadeToggle;
});
define('skylark-domx-fx/hide',[
    "skylark-domx-transits",
    "./fx"
],function(transits,fx) {

    return fx.hide = transits.hide;
});
define('skylark-domx-fx/pulsate',[
    "skylark-domx-transits",
    "./fx"
],function(transits,fx) {

	return fx.pulsate = transits.pulsate;

});

define('skylark-domx-fx/shake',[
    "skylark-domx-transits",
    "./fx"
],function(transits,fx) {

	return fx.shake = transits.shake;

});

define('skylark-domx-fx/show',[
    "skylark-domx-transits",
    "./fx"
],function(transits,fx) {

    return fx.show = transits.show;
});
define('skylark-domx-fx/slide',[
    "skylark-domx-transits",
    "./fx"
],function(transits,fx) {

    function slide(elm,options,callback ) {
    	if (langx.isFunction(options)) {
    		callback = options;
    		options = {};
    	}
    	options = options || {};
		var direction = options.direction || "down",
			isHide = ( direction === "up" || direction === "left" ),
			isVert = ( direction === "up" || direction === "down" ),
			duration = options.duration || fx.speeds.normal;


        // get the element position to restore it then
        var position = styler.css(elm, 'position');

        if (isHide) {
            // active the function only if the element is visible
        	if (styler.isInvisible(elm)) {
        		return this;
        	}
        } else {
	        // show element if it is hidden
	        styler.show(elm);        	
	        // place it so it displays as usually but hidden
	        styler.css(elm, {
	            position: 'absolute',
	            visibility: 'hidden'
	        });
        }



        if (isVert) { // up--down
	        // get naturally height, margin, padding
	        var marginTop = styler.css(elm, 'margin-top');
	        var marginBottom = styler.css(elm, 'margin-bottom');
	        var paddingTop = styler.css(elm, 'padding-top');
	        var paddingBottom = styler.css(elm, 'padding-bottom');
	        var height = styler.css(elm, 'height');

	        if (isHide) {  	// slideup
	            // set initial css for animation
	            styler.css(elm, {
	                visibility: 'visible',
	                overflow: 'hidden',
	                height: height,
	                marginTop: marginTop,
	                marginBottom: marginBottom,
	                paddingTop: paddingTop,
	                paddingBottom: paddingBottom
	            });

	            // animate element height, margin and padding to zero
	            animate(elm, {
	                height: 0,
	                marginTop: 0,
	                marginBottom: 0,
	                paddingTop: 0,
	                paddingBottom: 0
	            }, {
	                // callback : restore the element position, height, margin and padding to original values
	                duration: duration,
	                queue: false,
	                complete: function() {
	                    styler.hide(elm);
	                    styler.css(elm, {
	                        visibility: 'visible',
	                        overflow: 'hidden',
	                        height: height,
	                        marginTop: marginTop,
	                        marginBottom: marginBottom,
	                        paddingTop: paddingTop,
	                        paddingBottom: paddingBottom
	                    });
	                    if (callback) {
	                        callback.apply(elm);
	                    }
	                }
	            });
	        } else {     	// slidedown
		        // set initial css for animation
		        styler.css(elm, {
		            position: position,
		            visibility: 'visible',
		            overflow: 'hidden',
		            height: 0,
		            marginTop: 0,
		            marginBottom: 0,
		            paddingTop: 0,
		            paddingBottom: 0
		        });

		        // animate to gotten height, margin and padding
		        animate(elm, {
		            height: height,
		            marginTop: marginTop,
		            marginBottom: marginBottom,
		            paddingTop: paddingTop,
		            paddingBottom: paddingBottom
		        }, {
		            duration: duration,
		            complete: function() {
		                if (callback) {
		                    callback.apply(elm);
		                }
		            }
		        });

	        }

        } else { // left--right
	        // get naturally height, margin, padding
	        var marginLeft = styler.css(elm, 'margin-left');
	        var marginRight = styler.css(elm, 'margin-right');
	        var paddingLeft = styler.css(elm, 'padding-left');
	        var paddingRight = styler.css(elm, 'padding-right');
	        var width = styler.css(elm, 'width');

	        if (isHide) {  	// slideleft
	            // set initial css for animation
	            styler.css(elm, {
	                visibility: 'visible',
	                overflow: 'hidden',
	                width: width,
	                marginLeft: marginLeft,
	                marginRight: marginRight,
	                paddingLeft: paddingLeft,
	                paddingRight: paddingRight
	            });

	            // animate element height, margin and padding to zero
	            animate(elm, {
	                width: 0,
	                marginLeft: 0,
	                marginRight: 0,
	                paddingLeft: 0,
	                paddingRight: 0
	            }, {
	                // callback : restore the element position, height, margin and padding to original values
	                duration: duration,
	                queue: false,
	                complete: function() {
	                    styler.hide(elm);
	                    styler.css(elm, {
	                        visibility: 'visible',
	                        overflow: 'hidden',
	                        width: width,
	                        marginLeft: marginLeft,
	                        marginRight: marginRight,
	                        paddingLeft: paddingLeft,
	                        paddingRight: paddingRight
	                    });
	                    if (callback) {
	                        callback.apply(elm);
	                    }
	                }
	            });
	        } else {     	// slideright
		        // set initial css for animation
		        styler.css(elm, {
		            position: position,
		            visibility: 'visible',
		            overflow: 'hidden',
		            width: 0,
		            marginLeft: 0,
		            marginRight: 0,
		            paddingLeft: 0,
		            paddingRight: 0
		        });

		        // animate to gotten width, margin and padding
		        animate(elm, {
		            width: width,
		            marginLeft: marginLeft,
		            marginRight: marginRight,
		            paddingLeft: paddingLeft,
		            paddingRight: paddingRight
		        }, {
		            duration: duration,
		            complete: function() {
		                if (callback) {
		                    callback.apply(elm);
		                }
		            }
		        });

	        }       	
        }

        return this;
    }

    return fx.slide = slide;

});

define('skylark-domx-fx/slideDown',[
    "skylark-domx-transits",
    "./fx"
],function(transits,fx) {
    /*   
     * Display an element with a sliding motion.
     * @param {Object} elm  
     * @param {Number or String} duration
     * @param {Function} callback
     */
    function slideDown(elm, duration, callback) {
        return slide(elm,{
            direction : "down",
            duration : duration
        },callback);
    }

    return fx.slideDown = slideDown;
});
define('skylark-domx-fx/slideToggle',[
    "skylark-domx-transits",
    "./fx"
],function(transits,fx) {

    /*   
     * Display or hide an element with a sliding motion.
     * @param {Object} elm  
     * @param {Number or String} duration
     * @param {Function} callback
     */
    function slideToggle(elm, duration, callback) {

        // if the element is hidden, slideDown !
        if (geom.height(elm) == 0) {
            slideDown(elm, duration, callback);
        }
        // if the element is visible, slideUp !
        else {
            slideUp(elm, duration, callback);
        }
        return this;
    }

    return fx.slideToggle = slideToggle;
});
define('skylark-domx-fx/slideUp',[
    "skylark-domx-transits",
    "./fx"
],function(transits,fx) {
    /*   
     * Hide an element with a sliding motion.
     * @param {Object} elm  
     * @param {Number or String} duration
     * @param {Function} callback
     */
    function slideUp(elm, duration, callback) {
        return slide(elm,{
            direction : "up",
            duration : duration
        },callback);
    }



    return fx.slideUp = slideUp;
});
define('skylark-domx-fx/throb',[
    "skylark-domx-transits",
    "./fx"
],function(transits,fx) {
    
    /*   
     * Replace an old node with the specified node.
     * @param {HTMLElement} elm
     * @param {Node} params
     */
    function throb(elm, params) {
        params = params || {};

        var self = this,
            text = params.text,
            style = params.style,
            time = params.time,
            callback = params.callback,
            timer,

            throbber = noder.createElement("div", {
                "class": params.className || "throbber"
            }),
            //_overlay = overlay(throbber, {
            //    "class": 'overlay fade'
            //}),
            remove = function() {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
                if (throbber) {
                    noder.remove(throbber);
                    throbber = null;
                }
            },
            update = function(params) {
                if (params && params.text && throbber) {
                    textNode.nodeValue = params.text;
                }
            };

        if (params.style) {
            styler.css(throbber,params.style);
        }

        //throb = noder.createElement("div", {
        //   "class": params.throb && params.throb.className || "throb"
        //}),
        //textNode = noder.createTextNode(text || ""),
 
        var content = params.content ||  '<span class="throb"></span>';

        //throb.appendChild(textNode);
        //throbber.appendChild(throb);

        noder.html(throbber,content);
        
        elm.appendChild(throbber);

        var end = function() {
            remove();
            if (callback) callback();
        };
        if (time) {
            timer = setTimeout(end, time);
        }

        return {
            throbber : throbber,
            remove: remove,
            update: update
        };
    }

    return fx.throb = throb;
});
define('skylark-domx-fx/toggle',[
    "skylark-domx-transits",
    "./fx"
],function(transits,fx) {
    /*   
     * Display or hide an element.
     * @param {Object} elm  
     * @param {Number or String} speed
     * @param {Function} callbacke
     */
    function toggle(elm, speed, callback) {
        if (styler.isInvisible(elm)) {
            show(elm, speed, callback);
        } else {
            hide(elm, speed, callback);
        }
        return this;
    }

    return fx.toggle = toggle;
});
define('skylark-domx-fx/main',[
	"./fx",
    "./animate",
    "./bounce",
    "./emulateTransitionEnd",
    "./explode",
    "./fadeIn",
    "./fadeOut",
    "./fade",
    "./fadeToggle",
    "./hide",
    "./pulsate",
    "./shake",
    "./show",
    "./slide",
    "./slideDown",
    "./slideToggle",
    "./slideUp",
    "./throb",
    "./toggle"
],function(fx){

	return fx;
});
define('skylark-domx-fx', ['skylark-domx-fx/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-domx-fx.js.map
