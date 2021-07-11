/**
 * skylark-domx-fx - The skylark fx library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-transits/transit","skylark-domx-animates/animation","./fx"],function(n,a,t,i){return i.animate=function(i,r,s,e,k,l){return n.isString(r)?t(i,r,s,e,k,l):a(i,r,s,e,k,l)}});
//# sourceMappingURL=sourcemaps/animate.js.map
