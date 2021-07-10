/**
 * skylark-domx-fx - The skylark fx library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-domx-transits","./fx"],function(i,t){return t.slide=function(i,e,n){langx.isFunction(e)&&(n=e,e={});var s=(e=e||{}).direction||"down",d="up"===s||"left"===s,o="up"===s||"down"===s,a=e.duration||t.speeds.normal,r=styler.css(i,"position");if(d){if(styler.isInvisible(i))return this}else styler.show(i),styler.css(i,{position:"absolute",visibility:"hidden"});if(o){var g=styler.css(i,"margin-top"),l=styler.css(i,"margin-bottom"),p=styler.css(i,"padding-top"),m=styler.css(i,"padding-bottom"),h=styler.css(i,"height");d?(styler.css(i,{visibility:"visible",overflow:"hidden",height:h,marginTop:g,marginBottom:l,paddingTop:p,paddingBottom:m}),animate(i,{height:0,marginTop:0,marginBottom:0,paddingTop:0,paddingBottom:0},{duration:a,queue:!1,complete:function(){styler.hide(i),styler.css(i,{visibility:"visible",overflow:"hidden",height:h,marginTop:g,marginBottom:l,paddingTop:p,paddingBottom:m}),n&&n.apply(i)}})):(styler.css(i,{position:r,visibility:"visible",overflow:"hidden",height:0,marginTop:0,marginBottom:0,paddingTop:0,paddingBottom:0}),animate(i,{height:h,marginTop:g,marginBottom:l,paddingTop:p,paddingBottom:m},{duration:a,complete:function(){n&&n.apply(i)}}))}else{var y=styler.css(i,"margin-left"),c=styler.css(i,"margin-right"),f=styler.css(i,"padding-left"),v=styler.css(i,"padding-right"),u=styler.css(i,"width");d?(styler.css(i,{visibility:"visible",overflow:"hidden",width:u,marginLeft:y,marginRight:c,paddingLeft:f,paddingRight:v}),animate(i,{width:0,marginLeft:0,marginRight:0,paddingLeft:0,paddingRight:0},{duration:a,queue:!1,complete:function(){styler.hide(i),styler.css(i,{visibility:"visible",overflow:"hidden",width:u,marginLeft:y,marginRight:c,paddingLeft:f,paddingRight:v}),n&&n.apply(i)}})):(styler.css(i,{position:r,visibility:"visible",overflow:"hidden",width:0,marginLeft:0,marginRight:0,paddingLeft:0,paddingRight:0}),animate(i,{width:u,marginLeft:y,marginRight:c,paddingLeft:f,paddingRight:v},{duration:a,complete:function(){n&&n.apply(i)}}))}return this}});
//# sourceMappingURL=sourcemaps/slide.js.map
