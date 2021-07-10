define([
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