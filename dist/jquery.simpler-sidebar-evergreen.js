/*! simpler-sidebar-evergreen v1.5.1 ()
** Justin Marrington (@howlingeverett)
** (c) 2015-2015 Licensed under GPL-2.0
*/
(function($) {
    $.fn.simplerSidebar = function(options) {
        var cfg = $.extend(true, $.fn.simplerSidebar.settings, options);

        return this.each(function() {
            var align, sbw, ssbInit, ssbStyle, maskInit, maskStyle, maskActive,
                maskInactive,
                attr = cfg.attr,
                $sidebar = $(this),
                $opener = $(cfg.opener),
                $links = cfg.sidebar.closingLinks,
                sbMaxW = cfg.sidebar.width,
                gap = cfg.sidebar.gap,
                winMaxW = sbMaxW + gap,
                w = $(window).width(),

                animationStart = {},
                animationEnd = {},

                animateOpen = function() {
                    $sidebar
                      .css(animationEnd)
                      .attr('data-' + attr, 'active');

                    $mask.css('display', 'block');
                    setTimeout(function() {
                        $mask.css(maskActive);
                    }, 0);
                },
                animateClose = function() {
                    $sidebar
                      .css(animationStart)
                      .attr('data-' + attr, 'disabled');

                    $mask.css(maskInactive);
                },
                closeSidebar = function() {
                    var isWhat = $sidebar.attr('data-' + attr);

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
            animationStart.transform = 'translateX(0)';
            var translateValue = align === 'left' ? sbw : -sbw;
            animationEnd.transform = 'translateX(' + translateValue + 'px)';

            cfg.sidebar.css.transition = 'transform ' + cfg.animation.duration +
              ' ' + cfg.animation.easing;
            ssbStyle = $.extend(true, ssbInit, cfg.sidebar.css);

            $sidebar.css(ssbStyle)
                .attr('data-' + attr, 'disabled');
            $sidebar.css(animationStart);

            //Mask style
            maskInit = {
                position: 'fixed',
                top: cfg.top,
                right: 0,
                bottom: 0,
                left: 0,
                zIndex: cfg.sidebar.css.zIndex - 1,
                display: 'none',
                opacity: 0,
                transition: 'opacity ' + cfg.animation.duration + ' ' +
                    cfg.animation.easing
            };

            maskStyle = $.extend(true, maskInit, cfg.mask.css);
            maskActive = {
                display: 'block',
                opacity: cfg.mask.opacity
            };
            maskInactive = {
                opacity: 0
            };

            //Appending Mask if mask.display is true
            if (true === cfg.mask.display) {
                $mask.appendTo('body').css(maskStyle);
            }

            //Opening and closing the Sidebar when $opener is clicked
            $opener.click(function() {
                var isWhat = $sidebar.attr('data-' + attr);

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

            // Fully hide mask when transition ends
            $mask.on('transitionend', function() {
                if ($mask.css('opacity') === "0") {
                    $mask.css('display', 'none');
                }
            });

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
            duration: '0.3s',
            easing: 'ease-in-out'
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
            opacity: 0.5,
            css: {
                backgroundColor: 'black',
                filter: 'Alpha(opacity=50)'
            }
        }
    };
})(jQuery);
