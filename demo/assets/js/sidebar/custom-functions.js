$( "document" ).ready( function() {
	var $mainSidebar = $( "#sidebar-main" ),
		$secSidebar = $( "#sidebar-secondary" ),
		callopen = function() {
			alert( "callback called after the sidebar's been opened" );
		},
		callclose = function() {
			alert( "callback called after the sidebar's been closed" );
		},
		callboth = function() {
			alert( "callback called after both animations" );
		},
		onopen = function() {
			alert( "function called while the sidebar is opening" );
		},
		onclose = function() {
			alert( "function called while the sidebar is closing" );
		},
		onboth = function() {
			alert( "function called while both animations are triggered" );
		};

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
		},
		events: {
			on: {
				animation: {
					open: onopen,
					close: onclose,
					both: onboth
				}
			},
			callbacks: {
				animation: {
					open: callopen,
					close: callclose,
					both: callboth
				}
			}
		}
	} );
} );
