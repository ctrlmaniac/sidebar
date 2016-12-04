// Jquery
window.$ = window.jQuery = require( "jquery" );

// Jquery-ui is currently unavailable with browserify
// You must use this module instead
window.$.ui = require( "jquery-ui-browserify" );

// Importing sidebarbones
window.$.sidebarBones = require( "simpler-sidebar" );

// Importing custom options
require( "./sidebar/main-sidebar-right.js" );
