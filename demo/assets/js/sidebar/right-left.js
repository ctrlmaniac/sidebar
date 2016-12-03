$( "document" ).ready( function() {
	var $mainSidebar = $( "#sidebar-main" ),
		$secSidebar = $( "#sidebar-secondary" );

	$mainSidebar.simplerSidebar( {
		attr: "sidebar-main",
		align: "left",
		selectors: {
			trigger: "#sidebar-main-trigger",
			quitter: ".quitter"
		},
		sidebar: {
			width: 500
		},
		animation: {
			easing: "easeOutQuint"
		}
	} );

	$secSidebar.simplerSidebar( {
		attr: "sidebar-secondary",
		top: 56,
		selectors: {
			trigger: "#sidebar-secondary-trigger",
			quitter: ".quitter"
		},
		animation: {
			easing: "easeOutQuint"
		}
	} );
} );
