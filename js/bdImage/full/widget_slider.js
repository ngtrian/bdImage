//noinspection ThisExpressionReferencesGlobalObjectJS
!function ($) {

    XenForo.bdImage_Widget_Slider_Container = function ($container) {
        this.__construct($container);
    };

    XenForo.bdImage_Widget_Slider_Container.prototype =
    {
        __construct: function ($container) {
            var layout = $container.data('layout');
            var layoutOptions = $container.data('layoutOptions');

            if (layout === 'bxslider') {
                var bxsliderOptions = this.buildOptions({
                    auto: false,
                    autoControls: false,
                    autoControlsCombine: false,
                    autoHover: false,
                    captions: false,
                    controls: false,
                    infiniteLoop: true,
                    pager: false
                }, layoutOptions);

                if (bxsliderOptions.auto) {
                    if (bxsliderOptions.controls) {
                        bxsliderOptions.autoControls = true;
                        bxsliderOptions.autoControlsCombine = true;
                    }

                    bxsliderOptions.autoHover = true;
                }

                $container.find('.bdImage_Widget_Slider_Items').bxSlider(bxsliderOptions);
            }

            if (layout === 'owlcarousel') {
                var owlcarouselOptions = this.buildOptions({
                    autoplay: false,
                    autoplayHoverPause: false,
                    center: false,
                    dots: false,
                    items: 1,
                    lazyLoad: true,
                    loop: true,
                    margin: 10,
                    nav: false
                }, layoutOptions);

                if (owlcarouselOptions.autoplay) {
                    owlcarouselOptions.autoplayHoverPause = true;
                }

                if (owlcarouselOptions.items === 1
                    && typeof layoutOptions['dots'] === 'undefined') {
                    owlcarouselOptions.dots = true;
                }
                if (!owlcarouselOptions.dots && !owlcarouselOptions.nav) {
                    owlcarouselOptions.dots = true;
                }

                $container.find('.bdImage_Widget_Slider_Items').owlCarousel(owlcarouselOptions);
            }
        },

        buildOptions: function (defaultOptions, layoutOptions) {
            var options = $.extend({}, defaultOptions);

            for (var i in layoutOptions) {
                if (!layoutOptions.hasOwnProperty(i)) {
                    continue;
                }

                var typeOf = typeof options[i];

                switch (typeOf) {
                    case 'boolean':
                        options[i] = (layoutOptions[i] > 0);
                        break;
                    case 'number':
                        options[i] = parseInt(layoutOptions[i]);
                        break;
                }
            }

            return options;
        }
    };

    // *********************************************************************

    XenForo.register('.bdImage_Widget_Slider_Container', 'XenForo.bdImage_Widget_Slider_Container');

}(jQuery, this, document);
