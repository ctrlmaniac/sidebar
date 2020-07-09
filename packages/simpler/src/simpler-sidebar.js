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
        top: 56,
        width: 300,
        gap: 64,
        zIndex: 3000,
        animation: {
          duration: 500,
          easing: "swing",
        },
      },
      options
    );

    // return this to keep chainability
    return this.each(function () {
      var $sidebar = $(this);
      var $toggler = $(configs.selectors.trigger);
      var windowWidth = $(window).width();
      var baseAttr = "data-" + configs.attr;
      var sidebarAttrOpen = baseAttr + "-open";

      /**
       * Set the sidebar width according to the current window width
       * @param {number} windowWidth - $(window).width()
       * @return {number}
       */
      var setSidebarWidth = function (windowWidth) {
        return windowWidth < configs.width + configs.gap
          ? windowWidth - configs.gap
          : configs.width;
      };

      /**
       * Return the current sidebar open attr
       * @return {bool}
       */
      var isSidebarOpen = function () {
        return JSON.parse($sidebar.attr(sidebarAttrOpen));
      };

      /**
       * change sidebar attr `open` status
       * @param {boolean} status
       */
      var setSidebarAttrOpen = function (status) {
        $sidebar.attr(sidebarAttrOpen, status);
      };

      // Define sidebar style
      var sidebarStyle = {
        display: "block",
        position: "fixed",
        top: parseInt(configs.top), // default: 64px
        bottom: 0, // don't change this value
        width: setSidebarWidth(windowWidth),
        zIndex: configs.zIndex,
        [configs.align]: configs.open ? 0 : -setSidebarWidth(windowWidth),
      };

      // apply style and init attribute
      $sidebar.attr(sidebarAttrOpen, configs.open).css(sidebarStyle);

      // Events definition
      var events = {
        on: {
          open: function () {
            setSidebarAttrOpen(true);
          },
          close: function () {
            setSidebarAttrOpen(false);
          },
        },
      };

      /** triggers sidebar action open */
      var openSidebar = function () {
        $sidebar.animate(
          { [configs.align]: 0 },
          configs.animation.duration,
          configs.animation.easing
        );

        events.on.open();
      };

      /** triggers sidebar action close */
      var closeSidebar = function () {
        $sidebar.animate(
          { [configs.align]: -$sidebar.width() },
          configs.animation.duration,
          configs.animation.easing
        );

        events.on.close();
      };

      // APPLY ACTIONS//Events
      $toggler.click(function () {
        console.log(isSidebarOpen());

        if (isSidebarOpen()) {
          closeSidebar();
        } else {
          openSidebar();
        }
      });

      // Fixes on window resize
      $(window).resize(function () {
        var windowWidth = $(window).width();

        // Fix width on window resize
        $sidebar.css("width", setSidebarWidth(windowWidth));

        if (!$sidebar.attr(sidebarAttrOpen)) {
          $sidebar.css(configs.align, -$sidebar.width());
        }
      });
    });
  };
});
