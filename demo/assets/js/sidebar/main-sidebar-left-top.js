$( "document" ).ready( function() {
	var $mainSidebar = $( "#sidebar-main" );

	$mainSidebar.simplerSidebar( {
		align: "left",
		attr: "sidebar-main",
		top: 56,
		selectors: {
			trigger: "#sidebar-main-trigger",
			quitter: ".quitter"
		},
		animation: {
			easing: "easeOutQuint"
		}
	} );
} );
