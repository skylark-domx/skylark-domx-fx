define([
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