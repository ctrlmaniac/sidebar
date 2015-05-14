//Simpler-Sidebar v.1.1.0
//https://github.com/dcdeiv/simpler-sidebar
// GPLv2 http://www.gnu.org/licenses/gpl-2.0-standalone.html
(function($) {
	$.fn.simpleSidebarV2 = function(options) {
		var ssbInit, ssbStyle, sbw, maskInit, maskStyle, overflowFalse, overflowTrue, $mask, align,
			defaults = {
				opener: undefined,
				dataName: 'ssbv2',
				top: 0,
				animation: {
					duration: 500,
					easing: 'swing'
				},
				sidebar: {
				    align: undefined,
					width: 350,
					gap: 64,
					closingLinks: 'a',
					css: {
						zIndex: 3000
					}
				},
				mask: {
					css: {
						backgroundColor: 'black',
						opacity: 0.5,
						filter: 'Alpha(opacity=50)'
					}
				}
			},
			cfg = $.extend(true, defaults, options),
			data = cfg.dataName,
			$sidebar = $(this),
			$opener = $(cfg.opener),
			$links = $(cfg.sidebar.closingLinks),
			duration = cfg.animation.duration,
			easing = cfg.animation.easing,
			sbMaxW = cfg.sidebar.width,
			gap = cfg.sidebar.gap,
			winMaxW = sbMaxW + gap,
			defAlign = cfg.sidebar.align,
			w = $(window).width(),
			animationStart = {},
			animationReset = {};

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
		
		//Checking if the Sidebar is aligned to right or to left
		if ( defAlign === 'undefined' || defAlign === 'right' ) {
		    align = 'right';
		} else if ( defAlign === 'left' ) {
		    align = 'left';
		}
		
		ssbInit[align] = -sbw;
		animationStart[align] = 0;
		
		ssbStyle = $.extend(true, ssbInit, cfg.sidebar.css);

		$sidebar.css(ssbStyle).attr('data-' + data, 'disabled');

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

		$('body').append($('<div data-' + data + '="mask"/>').css(maskStyle));
		$mask = $('[data-' + data + '="mask"]');

		//complete functions
		overflowFalse = function() {
			$('body, html').css({
				overflow: 'hidden'
			});
		};
		overflowTrue = function() {
			$('body, html').css({
				overflow: 'auto'
			});
		};

		$opener.click(function() {
			var isWhat = $sidebar.attr('data-' + data),
			    csbw = $sidebar.width();
			
			animationReset[align] = - csbw;

			if (isWhat === 'disabled') {
				$sidebar
					.animate( animationStart, {
						duration: duration,
						easing: easing,
						complete: overflowFalse
					})
					.attr('data-' + data, 'active');

				$mask.fadeIn(duration);
			} else if (isWhat === 'active') {
				$sidebar
					.animate( animationReset, {
						duration: duration,
						easing: easing,
						complete: overflowTrue
					})
					.attr('data-' + data, 'disabled');

				$mask.fadeOut(duration);
			}
		});

		$links.add($mask).each(function() {
			$(this).click(function() {
				var isWhat = $sidebar.attr('data-' + data),
				    csbw = $sidebar.width();
				
				animationReset[align] = - csbw;

				if (isWhat === 'active') {
					$sidebar
						.animate( animationReset, {
							duration: duration,
							easing: easing,
							complete: overflowTrue
						})
						.attr('data-' + data, 'disabled');

					$mask.fadeOut(duration);
				}
			});
		});


		//Adjusting width;
		$(window).resize(function() {
			var rsbw, reset,
				nw = $(window).width();

			if (nw < winMaxW) {
				rsbw = nw - gap;
			} else {
				rsbw = sbMaxW;
			}
			
			reset = { width: rsbw };
			reset[align] = -rsbw;

			$sidebar
				.attr('data-' + data, 'disabled')
				.css( reset );

			$mask.fadeOut(duration);

			$('body, html').css({
				overflow: 'auto'
			});
		});

		return this;
	};
})(jQuery);
