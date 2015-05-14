//Simple-Sidebar v.2.0.0
//http://www.github.com/dcdeiv/simplesidebar-v2
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
			w = $(window).width();
		
		//Checking if the Sidebar is aligned to right or to left
		if ( defAlign === 'undefined' || defAlign === 'right' ) {
		    align = 'right';
		
		else if ( defAlign === 'left' ) {
		    align = 'left'
		}
		
		console.log( align );

		//Sidebar style
		if (w < winMaxW) {
			sbw = w - gap;
		} else {
			sbw = sbMaxW;
		}

		ssbInit = {
			position: 'fixed',
			top: cfg.top,
			right: -sbw,
			bottom: 0,
			width: sbw
		};
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
			var isWhat = $sidebar.attr('data-' + data);
			var csbw = $sidebar.width();

			if (isWhat === 'disabled') {
				$sidebar
					.animate({
						right: 0
					}, {
						duration: duration,
						easing: easing,
						complete: overflowFalse
					})
					.attr('data-' + data, 'active');

				$mask.fadeIn(duration);
			} else if (isWhat === 'active') {
				$sidebar
					.animate({
						right: -csbw
					}, {
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
				var isWhat = $sidebar.attr('data-' + data);
				var csbw = $sidebar.width();

				if (isWhat === 'active') {
					$sidebar
						.animate({
							right: -csbw
						}, {
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
			var rsbw,
				nw = $(window).width();

			if (nw < winMaxW) {
				rsbw = nw - gap;
			} else {
				rsbw = sbMaxW;
			}

			$sidebar
				.attr('data-' + data, 'disabled')
				.css({
					width: rsbw,
					right: -rsbw
				});

			$mask.fadeOut(duration);

			$('body, html').css({
				overflow: 'auto'
			});
		});

		return this;
	};
})(jQuery);
