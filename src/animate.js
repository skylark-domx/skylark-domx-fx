define([
    "skylark-langx/langx",
    "skylark-domx-transits/transit",
    "skylark-domx-animates/animate",
    "./fx"
], function(langx, transit,_animate,fx) {

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
            return _animate(elm,properties,duration,ease,callback,delay);
        } else {
            return transit(elm,properties,duration,ease,callback,delay);
        }

    }

    return fx.animate = animate;

});