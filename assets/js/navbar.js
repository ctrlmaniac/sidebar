//toggle-navbar
(function($){
	$.fn.toggleMainNavbar = function(options) {
	var ww, navOl,
		def = {
			media: 800,
			button: undefined,
			sidebar: undefined,
			content: undefined
		},
		cfg		= $.extend( true, def, options ),
		media = cfg.media,
		$nav	= this,
		$ico	= $( cfg.button ),
		$sbr	= $( cfg.sidebar ),
		$cont	= $( cfg.content );
		
		$( window ).resize(function(){
			ww			= $(window).width();
			
			$nav.hide();
			$ico.hide();
			
			if ( ww <= media ) {
				$ico.show();
				$sbr.show();
				$nav.hide();
			} else {
				$ico.hide();
				$sbr.hide();
				$nav.show();
			}
		});
		
		$( window ).resize();
		
	return this;
	
	};
})(jQuery);
