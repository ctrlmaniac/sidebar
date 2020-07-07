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
    // Default settings
    var cfg = $.extend(
      true,
      {
        attr: "simplersidebar",
        top: 0,
        align: "left",
        gap: 64,
        zIndex: 3000,
        sidebar: {
          width: 300,
        },
        animation: {
          duration: 500,
          easing: "swing",
        },
        events: {
          // Changing these options will break the plugin
          on: {
            animation: {
              open: function () {},
              close: function () {},
              both: function () {},
            },
          },
          callbacks: {
            animation: {
              open: function () {},
              close: function () {},
              both: function () {},
              freezePage: true,
            },
          },
        },
        mask: {
          display: true,
          css: {
            backgroundColor: "black",
            opacity: 0.5,
            filter: "Alpha(opacity=50)",
          },
        },
      },
      options
    );

    return this.each(function () {
      console.log(cfg);
    });
  };
});
