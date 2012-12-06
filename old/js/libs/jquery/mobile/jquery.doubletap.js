/* File Created: July 7, 2012 */


(function ($) {
    $.fn.doubleTap = function(dta, doubleTapCallback) {
        return this.each(function() {
            var elm = this;
            var data = dta;
            var lastTap = 0;
            $(elm).bind('tap', data, function (e) {
                var now = (new Date()).valueOf();
                var diff = (now - lastTap);
                lastTap = now;
                if (diff < 250) {
                    if ($.isFunction(doubleTapCallback)) {
                        doubleTapCallback.call(elm,e);
                    }
                }
            });
        });
    };
})(jQuery);
