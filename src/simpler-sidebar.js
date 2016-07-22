;( function( $, window, document, undefined ) {

  "use strict";

		// Set the plugin name
		// Change this name according to the package you want to build
		var pluginName = "simplerSidebar";

		$.fn[ pluginName ] = function( options ) {

			// Default settings
			// Options are fully commented in the options.yaml file
			var cfg = $.extend( true, {
				attr: "sidebarbones",
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

					// Set anything else than "left" to "right"
					align = ( "left" === cfg.align ) ? "left" : "right",

					duration = cfg.animation.duration,
					easing = cfg.animation.easing,
					animation = {},

					// Set anything else then true to false
					freezePage = ( true === cfg.events.callbacks.animation.freezePage ) ? true : false,

					// Selectors
					$sidebar = $( this ),
					$trigger = $( cfg.selectors.trigger ),
					$quitter = ( !cfg.selectors.quitter ) ? "a" : $( cfg.selectors.quitter ),
					$mask = $( "<div>" ).attr( attr, "mask" ),

					w = $( window ).width(),

					// Calculate sidebar width
					setSidebarWidth = function( w ) {
							if ( w < ( cfg.sidebar.width + cfg.gap ) ) {
								return w - cfg.gap;
							} else {
								return cfg.sidebar.width;
							}
					},

					// Check if the sidebar attribute is set to "opened" or "closed"
					sidebarStatus = function() {
						return $sidebar.attr( attr );
					},

					// Change sidebar sidebarStatus
					changeSidebarStatus = function( status ) {
						$sidebar.attr( attr, status );
					},

					// Create mask
					createMask = function() {
						$mask
							.appendTo( "body" )
							.css( maskStyle );
					},

					// $mask animations
					// animations are put into functions in order the make them easily tweakable
					showMask = function() {
						$mask.fadeIn( duration );
					},
					hideMask = function() {
						$mask.fadeOut( duration );
					},

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
									if ( true === freezePage ) {
										$( "body, html" ).css( "overflow", "hidden" );
									}

									cfg.events.callbacks.animation.open();
								},
								close: function() {
									if ( true === freezePage ) {
										$( "body, html" ).css( "overflow", "auto" );
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

				// Apply style to the sidebar
				$sidebar
					.css( sbStyle )
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

				// Merge the Mask private and custom style but keep private style unchangeable
				maskStyle = $.extend( true, pvtMaskStyle, cfg.mask.css );

				// Create Mask if required
				// Mask is appended to body
				if ( true === cfg.mask.display ) {
					createMask();
				}

				// Apply animations
				$trigger.click( function() {
					if ( "opened" === sidebarStatus() ) {
						animateClose();
					} else if ( "closed" === sidebarStatus() ) {
						animateOpen();
					}
				} );

				$mask.click( animateClose );
				$sidebar.on( "click", $quitter, animateClose );

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

} )( jQuery, window, document );
