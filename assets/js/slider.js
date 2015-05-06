(function( $ ) {
$.fn.slider = function(options) {
	var $wrap, $figures, $imgs, $imgFirst, URLimgFirst, realW, realH, imgAR, $wrapH, $active, $nonactive, $next, lenght, i,
		def = {
			dataName: 'slider',
			css: {
				wrap: {
					position: 'relative',
					margin: '0 auto',
					padding: 0,
					backgroundColor: 'inherit',
					overflow: 'hidden'
				},
				figure: {
					position: 'absolute',
					top: 0,
					right: 0,
					margin: 0,
					padding: 0,
					border: 0,
					borderImageWidth: 0
				},
				img: {}
			}
		},
		cfg = $.extend(true, def, options),
		data = cfg.dataName,
		$this = this;
		
	$this.wrapInner( '<div data-' + data + '="wrap"/>' );
	
	$wrap = $( '[data-' + data + '="wrap"]' );
	$figures = $wrap.children();
	$imgs = $figures.children();
	$imgFirst = $figures.first().children();
	URLimgFirst = $imgFirst.attr( 'src' );
	
	//GET real size of first picture
	//Resize $wrap and make it responsive
	$( '<img/>' )
		.attr( 'src', URLimgFirst )
		.load(function(){
			realW = this.width;
			realH = this.height;
			imgAR = realW / realH;
			
			$( window ).resize(function() {
				wrapW = $wrap.width();
				wrapNewH = wrapW / imgAR;
				
				$this.height( wrapNewH );
				$wrap.height( wrapNewH );
			});
			$( window ).resize();
		});
	
	//animating pictures
	
	//Active class to the first element
	$figures.first().attr( 'data-' + data, 'active' );
	
	$active = $( '[data-' + data + '="active"]' );
	
	$figures.not( $active ).attr( 'data-' + data, 'nonactive' );
	
	$nonactive = $( '[data-' + data + '="nonactive"]' );
	
	$nonactive.hide();
	
	function slider( e ) {
		var $next,
			active = $( e );

		if (active.next().length === 0) {
			$next = $figures.first();
		} else {
			$next = active.next();
		}

		active.fadeOut(1000, function() {
			$(this).attr( 'data-' + data, 'nonactive' );
		});
		$next.fadeIn(1000, function() {
			$(this).attr( 'data-' + data, 'active' );
		});
	}

	setTimeout(setInterval(function() {
		slider( '[data-' + data + '="active"]' );
	}, 4000), 5000);
	
	return this;
};
})(jQuery);
