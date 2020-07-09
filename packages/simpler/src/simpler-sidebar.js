// Uses CommonJS, AMD or browser globals to create a jQuery plugin.
(function (factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["jquery"], factory);
  } else if (typeof module === "object" && module.exports) {
    // Node/CommonJS
    module.exports = function (root, jQuery) {
      if (jQuery === undefined) {
        if (typeof window !== "undefined") {
          jQuery = require("jquery");
        } else {
          jQuery = require("jquery")(root);
        }
      }
      factory(jQuery);
      return jQuery;
    };
  } else {
    // Browser globals
    factory(jQuery);
  }
})(function ($) {
  $.fn.simplerSidebar = function (options) {
    // Default values
    // These values can be overwritten
    var configs = $.extend(
      true,
      {
        // selectors: {} // defined by user
        attr: "sidebar-main",
        open: false,
        align: "left",
        top: 0,
        width: 300,
        gap: 64,
        zIndex: 3000,
      },
      options
    );

    // return this to keep chainability
    return this.each(function () {
      var $sidebar = $(this);
      var windowWidth = $(window).width();
      var attr = "data-" + configs.attr;

      /**  */
      var setSidebarWidth = function (windowWidth) {
        return windowWidth < configs.width + configs.gap
          ? windowWidth - configs.gap
          : configs.width;
      };

      // Define sidebar style
      var sidebarStyle = {
        position: "fixed",
        top: parseInt(configs.top), // default: 64px
        bottom: 0, // don't change this value
        width: setSidebarWidth(windowWidth),
        zIndex: configs.zIndex,
        [configs.align]: configs.open ? 0 : -setSidebarWidth(windowWidth),
      };

      // apply style and init attribute
      $sidebar.attr(attr + "-open", configs.initialStatus).css(sidebarStyle);
    });
  };
});
