$( "document" ).ready( function() {
	var $mainSidebar = $( "#sidebar-main" );

	$mainSidebar.simplerSidebar( {
		attr: "sidebar-main",
		top: 56,
		mask: {
			display: false
		},
		selectors: {
			trigger: "#sidebar-main-trigger",
			quitter: ".quitter"
		},
		animation: {
			easing: "easeOutQuint"
		},
		events: {
			callbacks: {
				animation: {
					freezePage: false
				}
			}
		}
	} );
} );
