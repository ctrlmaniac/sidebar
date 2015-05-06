(function( $ ) {
	$.fn.showHide = function() {
		var topDoc,
			$this = $( this ); //logo
		
		$( document ).scroll( function() {
			topDoc = $( document ).scrollTop();
			
			if ( topDoc > 100 ) {
            	$this.fadeIn();
            } else {
                $this.fadeOut();
            }
        });
        $( document ).scroll();          
	};
})(jQuery);
