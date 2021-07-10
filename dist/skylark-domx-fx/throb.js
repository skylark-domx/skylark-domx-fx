/**
 * skylark-domx-fx - The skylark fx library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-domx-transits","./fx"],function(e,t){return t.throb=function(e,t){(t=t||{}).text,t.style;var n,r=t.time,o=t.callback,l=noder.createElement("div",{class:t.className||"throbber"}),s=function(){n&&(clearTimeout(n),n=null),l&&(noder.remove(l),l=null)};t.style&&styler.css(l,t.style);var a=t.content||'<span class="throb"></span>';return noder.html(l,a),e.appendChild(l),r&&(n=setTimeout(function(){s(),o&&o()},r)),{throbber:l,remove:s,update:function(e){e&&e.text&&l&&(textNode.nodeValue=e.text)}}}});
//# sourceMappingURL=sourcemaps/throb.js.map
