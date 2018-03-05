// Uses CommonJS, AMD or browser globals to create a jQuery plugin.
( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [ "jquery" ], factory );
	} else if ( typeof module === "object" && module.exports ) {

		// Node/CommonJS
		module.exports = function( root, jQuery ) {
			if ( jQuery === undefined ) {
				if ( typeof window !== "undefined" ) {
					jQuery = require( "jquery" );
				}			else {
					jQuery = require( "jquery" )( root );
				}
			}
			factory( jQuery );
			return jQuery;
		};
	} else {

		// Browser globals
		factory( jQuery );
	}
}( function( $ ) {

	// Set the plugin name
	var pluginName = "simplerSidebar";

	$.fn[ pluginName ] = function( options ) {

		// Default settings
		var cfg = $.extend( true, {
			attr: "simplersidebar",
			top: 0,
			gap: 64,
			zIndex: 3000,

			sidebar: {
				width: 300
			},

			animation: {
				duration: 500,
				easing: "swing"
			},

			// Changing these options will break the plugin
			events: {
				on: {
					animation: {
						open: function() {},
						close: function() {},
						both: function() {}
					}
				},
				callbacks: {
					animation: {
						open: function() {},
						close: function() {},
						both: function() {},
						freezePage: true
					}
				}
			},

			mask: {
				display: true,
				css: {
					backgroundColor: "black",
					opacity: 0.5,
					filter: "Alpha(opacity=50)"
				}
			}
		}, options );

		// Keep chainability
		return this.each( function() {
			var sbStyle, pvtMaskStyle, maskStyle,
				attr = "data-" + cfg.attr,

				// Set anything else than "opened" to "closed"
				init = ( "opened" === cfg.init ) ? "opened" : "closed",

				// Set the overflow setting to initial
				htmlOverflow = cfg.overflow ? cfg.overflow : $( "html" ).css( "overflow" ),
				bodyOverflow = cfg.overflow ? cfg.overflow : $( "body" ).css( "overflow" ),

				// Set anything else than "left" to "right"
				align = ( "left" === cfg.align ) ? "left" : "right",

				duration = cfg.animation.duration,
				easing = cfg.animation.easing,
				animation = {},

				// Set anything else then true to false
				scrollCfg = ( true === cfg.events.callbacks.animation.freezePage ) ?
					true : false,
				freezePage = function() {
					$( "body, html" ).css( "overflow", "hidden" );
				},
				unfreezePage = function() {
					$( "html" ).css( "overflow", htmlOverflow );
					$( "body" ).css( "overflow", bodyOverflow );
				},

				// Sidebar helpers
				$sidebar = $( this ),
				setSidebarWidth = function( w ) {

					// Calculate sidebar width
					if ( w < ( cfg.sidebar.width + cfg.gap ) ) {
						return w - cfg.gap;
					} else {
						return cfg.sidebar.width;
					}
				},
				sidebarStatus = function() {

					// Check if the sidebar attribute is set to "opened" or "closed"
					return $sidebar.attr( attr );
				},
				changeSidebarStatus = function( status ) {
					$sidebar.attr( attr, status );
				},

				// Mask helpers
				$mask = $( "<div>" ).attr( attr, "mask" ),
				createMask = function() {

					// Create mask
					$mask.appendTo( "body" )
						.css( maskStyle );
				},
				showMask = function() {
					$mask.fadeIn( duration );
				},
				hideMask = function() {
					$mask.fadeOut( duration );
				},

				$trigger = $( cfg.selectors.trigger ),
				quitter = !cfg.selectors.quitter ? "a" : cfg.selectors.quitter,

				w = $( window ).width(),

				// Other functions that must be run along the animation
				events = {

				// Events triggered with the animations
					on: {
						animation: {
							open: function() {
								showMask();
								changeSidebarStatus( "opened" );

								cfg.events.on.animation.open();
							},
							close: function() {
								hideMask();
								changeSidebarStatus( "closed" );

								cfg.events.on.animation.close();
							},
							both: function() {
								cfg.events.on.animation.both();
							}
						}
					},

					// Events triggered after the animations
					callbacks: {
						animation: {
							open: function() {
								if ( scrollCfg ) {
									freezePage();
								}

								cfg.events.callbacks.animation.open();
							},
							close: function() {
								if ( scrollCfg ) {
									unfreezePage();
								}

								cfg.events.callbacks.animation.close();
							},
							both: function() {
								cfg.events.callbacks.animation.both();
							}
						}
					}
				},

				// Create animations
				animateOpen = function() {
					var callbacks = function() {
						events.callbacks.animation.open();
						events.callbacks.animation.both();
					};

					// Define the animation
					animation[ align ] = 0;

					// Apply the animation, the options and the callbacks
					$sidebar.animate( animation, duration, easing, callbacks );

					events.on.animation.open();
					events.on.animation.both();
				},
				animateClose = function() {
					var callbacks = function() {
						events.callbacks.animation.close();
						events.callbacks.animation.both();
					};

					// Define the animation
					animation[ align ] = -$sidebar.width();

					// Apply the animation, the options and the callbacks
					$sidebar.animate( animation, duration, easing, callbacks );

					events.on.animation.close();
					events.on.animation.both();
				};

			// Create the sidebar style
			sbStyle = {
				position: "fixed",
				top: parseInt( cfg.top ),
				bottom: 0,
				width: setSidebarWidth( w ),
				zIndex: cfg.zIndex
			};

			// Set initial position
			sbStyle[ align ] = ( "closed" === init ) ? -setSidebarWidth( w ) : 0;

			// freeze page if sidebar is opened
			if ( scrollCfg && "opened" === init ) {
				freezePage();
			}

			// Apply style to the sidebar
			$sidebar.css( sbStyle )
				.attr( attr, init ); // apply init

			// Create the private mask style
			pvtMaskStyle = {
				position: "fixed",
				top: parseInt( cfg.top ),
				right: 0,
				bottom: 0,
				left: 0,
				zIndex: cfg.zIndex - 1,
				display: "none"
			};

			// Hide or show the mask
			// according to the chosen init option
			pvtMaskStyle.display = ( "opened" === init ) ?
				"block" :
				"none";

			// Merge the Mask private and custom style but keep private style unchangeable
			maskStyle = $.extend( true, pvtMaskStyle, cfg.mask.css );

			// Create Mask if required
			// Mask is appended to body
			if ( cfg.mask.display ) {
				createMask();
			}

			// Apply animations
			$trigger.click( function() {
				switch ( sidebarStatus() ) {
				case "opened":
					animateClose();
					break;
				case "closed":
					animateOpen();
					break;
				}
			} );

			$mask.click( animateClose );
			$sidebar.on( "click", quitter, animateClose );

			// Make the sidebar responsive
			$( window ).resize( function() {
				var w = $( window ).width();

				// Fix width on resize
				$sidebar.css( "width", setSidebarWidth( w ) );

				if ( "closed" === sidebarStatus() ) {
					$sidebar.css( align, -$sidebar.width() );
				}
			} );
		} );
	};
} ) );
