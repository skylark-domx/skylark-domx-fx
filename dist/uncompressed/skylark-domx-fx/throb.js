define([
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