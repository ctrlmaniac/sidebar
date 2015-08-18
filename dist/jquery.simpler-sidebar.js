/*! simpler-sidebar v1.4.0 (https://dcdeiv.github.io/simpler-sidebar)
** Davide Di Criscito <davide.dicriscito@gmail.com> (http://github.com/dcdeiv)
** (c) 2015-2015 Licensed under GPL-2.0
*/
(function($) {
    $.fn.simplerSidebar = function(options) {
        var cfg = $.extend(true, $.fn.simplerSidebar.settings, options);

        return this.each(function() {
            var align, sbw, ssbInit, ssbStyle, maskInit, maskStyle,
                attr = cfg.attr,
                $sidebar = $(this),
                $opener = $(cfg.opener),
                $links = cfg.sidebar.closingLinks,
                duration = cfg.animation.duration,
                sbMaxW = cfg.sidebar.width,
                gap = cfg.sidebar.gap,
                winMaxW = sbMaxW + gap,
                w = $(window).width(),

                animationStart = {},
                animationReset = {},

                hiddenFlow = function() {
                    $('body, html').css('overflow', 'hidden');
                },
                autoFlow = function() {
                    $('body, html').css('overflow', 'auto');
                },

                activate = {
                    duration: duration,
                    easing: cfg.animation.easing,
                    complete: hiddenFlow
                },
                deactivate = {
                    duration: duration,
                    easing: cfg.animation.easing,
                    complete: autoFlow
                },

                animateOpen = function() {
                    $sidebar
                        .animate(animationStart, activate)
                        .attr('data-' + attr, 'active');

                    $mask.fadeIn(duration);
                },
                animateClose = function() {
                    $sidebar
                        .animate(animationReset, deactivate)
                        .attr('data-' + attr, 'disabled');

                    $mask.fadeOut(duration);
                },
                closeSidebar = function() {
                    var isWhat = $sidebar.attr('data-' + attr),
                        csbw = $sidebar.width();

                    animationReset[align] = -csbw;

                    if (isWhat === 'active') {
                        animateClose();
                    }
                },

                $mask = $('<div>').attr('data-' + attr, 'mask');

            //Checking sidebar align
            if (cfg.sidebar.align === undefined || cfg.sidebar.align === 'right') {
                align = 'right';
            } else if (cfg.sidebar.align === 'left') {
                align = 'left';
            }

            //Sidebar style
            if (w < winMaxW) {
                sbw = w - gap;
            } else {
                sbw = sbMaxW;
            }

            ssbInit = {
                position: 'fixed',
                top: cfg.top,
                bottom: 0,
                width: sbw
            };

            ssbInit[align] = -sbw;
            animationStart[align] = 0;

            ssbStyle = $.extend(true, ssbInit, cfg.sidebar.css);

            $sidebar.css(ssbStyle)
                .attr('data-' + attr, 'disabled');

            //Mask style
            maskInit = {
                position: 'fixed',
                top: cfg.top,
                right: 0,
                bottom: 0,
                left: 0,
                zIndex: cfg.sidebar.css.zIndex - 1,
                display: 'none'
            };

            maskStyle = $.extend(true, maskInit, cfg.mask.css);

            //Appending Mask if mask.display is true
            if (true === cfg.mask.display) {
                $mask.appendTo('body').css(maskStyle);
            }

            //Opening and closing the Sidebar when $opener is clicked
            $opener.click(function() {
                var isWhat = $sidebar.attr('data-' + attr),
                    csbw = $sidebar.width();

                animationReset[align] = -csbw;

                if (isWhat === 'disabled') {
                    animateOpen();
                } else if (isWhat === 'active') {
                    animateClose();
                }
            });

            //Closing Sidebar when the mask is clicked
            $mask.click(closeSidebar);

            //Closing Sidebar when a link inside of it is clicked
            $sidebar.on('click', $links, closeSidebar);

            //Adjusting width;
            $(window).resize(function() {
                var rsbw, update,
                    isWhat = $sidebar.attr('data-' + attr),
                    nw = $(window).width();

                if (nw < winMaxW) {
                    rsbw = nw - gap;
                } else {
                    rsbw = sbMaxW;
                }

                update = {
                    width: rsbw
                };

                if (isWhat === 'disabled') {
                    update[align] = -rsbw;
                    $sidebar.css(update);
                } else if (isWhat === 'active') {
                    $sidebar.css(update);
                }
            });

        });
    };

    $.fn.simplerSidebar.settings = {
        attr: 'simplersidebar',
        top: 0,
        animation: {
            duration: 500,
            easing: 'swing'
        },
        sidebar: {
            width: 300,
            gap: 64,
            closingLinks: 'a',
            css: {
                zIndex: 3000
            }
        },
        mask: {
            display: true,
            css: {
                backgroundColor: 'black',
                opacity: 0.5,
                filter: 'Alpha(opacity=50)'
            }
        }
    };
})(jQuery);
