//Simple-Sidebar v.2.0.0
//http://www.github.com/dcdeiv/simplesidebar-v2
// GPLv2 http://www.gnu.org/licenses/gpl-2.0-standalone.html
(function($) {
	$.fn.simpleSidebar = function(options) {
		var ssbInit, ssbStyle, sbw, maskInit, maskStyle, overflowFalse, overflowTrue, $mask,
			defaults = {
				opener: undefined,
				dataName: 'ssbv2',
				animation: {
					duration: 500,
					easing: 'swing'
				},
				sidebar: {
					width: 350,
					top: 60,
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
				},
			},
			cfg = $.extend(true, defaults, options),
			data = cfg.dataName,
			$sidebar = $(this),
			$opener = $(cfg.opener),
			$links = $(cfg.sidebar.closingLinks),
			$mask = $('[data-' + data + '="mask"]'),
			duration = cfg.animation.duration,
			easing = cfg.animation.easing,
			sbMaxW = cfg.sidebar.width,
			gap = cfg.sidebar.gap,
			winMaxW = sbMaxW + gap,
			w = $(window).width(),
			clicks = 0;

		//Sidebar style
		if (w < winMaxW) {
			sbw = w - gap;
		} else {
			sbw = sbMaxW;
		}

		ssbInit = {
			position: 'fixed',
			top: cfg.sidebar.top,
			right: -sbw,
			bottom: 0,
			width: sbw
		};
		ssbStyle = $.extend(true, ssbInit, cfg.sidebar.css);

		$sidebar.css(ssbStyle);

		//Mask style
		maskInit = {
			position: 'fixed',
			top: cfg.sidebar.top,
			right: 0,
			bottom: 0,
			left: 0,
			zIndex: cfg.sidebar.css.zIndex - 1,
			display: 'none'
		};
		maskStyle = $.extend(true, maskInit, cfg.mask.css);

		$('body').append($('<div data-' + data + '="mask"/>').css(maskStyle));
		
		$mask = $( '[data-' + data + '="mask"]' );

		//complete functions
		overflowFalse = function() {
			$('body, html').css({
				overflow: 'hidden'
			});

			clicks = 1;
		};
		overflowTrue = function() {
			$('body, html').css({
				overflow: 'auto'
			});

			clicks = 0;
		};

		$opener.click(function() {
			clicks++;
			var nclick = function(e) {
					return (e % 2 === 0) ? true : false;
				},
				nsbw = $sidebar.width();

			if (false === nclick(clicks)) {
				$sidebar.animate({
					right: '+=' + nsbw
				}, {
					duration: duration,
					easing: easing,
					complete: overflowFalse
				});
				
				$mask.fadeIn(duration);

			} else if (true === nclick(clicks)) {
				$sidebar.animate({
					right: '-=' + nsbw
				}, {
					duration: duration,
					easing: easing,
					complete: overflowTrue
				});

				$mask.fadeOut(duration);
			}
		});

		//closing sidebar when a link is clicked
		$sidebar.on('click', $links, function() {
			var asbw = $sidebar.width();

			$sidebar.animate({
				right: '-=' + asbw
			}, {
				duration: duration,
				easing: easing,
				complete: overflowTrue
			});

			$mask.fadeOut(function() {
				$(this).remove();
			});
		});
		
		//closing sidebar when mask is clicked
		$mask.click(function() {
			var asbw = $sidebar.width();

			$sidebar.animate({
				right: '-=' + asbw
			}, {
				duration: duration,
				easing: easing,
				complete: overflowTrue
			});

			$(this).fadeOut();
		});

		//Adjusting width;
		$(window).resize(function() {
			var rsbw,
				nw = $(window).width();

			if (nw < winMaxW) {
				rsbw = nw - gap;
			} else {
				rsbw = sbMaxW;
			}

			$sidebar
				.animate({
						right: -rsbw
					},
					clicks = 0)
				.css({
					width: rsbw,
					right: -rsbw
				});
		});

		return this;
	};
})(jQuery);
