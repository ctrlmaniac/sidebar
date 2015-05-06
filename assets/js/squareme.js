(function($) {
	$.fn.squareme = function() {
		return this.each(function() {
			var w,
            	$element = $( this );
            
            $( window ).resize(function() {
            	w =	$element.width();
                
                $element.height( w );
            });
            $( window ).resize();
		});
	};
})(jQuery);
