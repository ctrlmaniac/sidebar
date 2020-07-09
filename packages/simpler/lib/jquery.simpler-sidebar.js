/**
 * @ctrlmaniac/simpler-sidebar
 * @link https://github.com/ctrlmaniac/sidebar#readme
 * @license MIT
 */
(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else if (typeof module === "object" && module.exports) {
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
    factory(jQuery);
  }
})(function ($) {
  var pluginName = "simplerSidebar";

  $.fn[pluginName] = function (options) {
    var cfg = $.extend(
      true,
      {
        attr: "simplersidebar",
        top: 0,
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
      var sbStyle;
      var pvtMaskStyle;
      var maskStyle;
      var attr = "data-" + cfg.attr;

      var init = "opened" === cfg.init ? "opened" : "closed";

      var htmlOverflow = cfg.overflow
        ? cfg.overflow
        : $("html").css("overflow");
      var bodyOverflow = cfg.overflow
        ? cfg.overflow
        : $("body").css("overflow");

      var align = "left" === cfg.align ? "left" : "right";
      var duration = cfg.animation.duration;
      var easing = cfg.animation.easing;
      var animation = {};

      var scrollCfg =
        true === cfg.events.callbacks.animation.freezePage ? true : false;
      var freezePage = function () {
        $("body, html").css("overflow", "hidden");
      };
      var unfreezePage = function () {
        $("html").css("overflow", htmlOverflow);
        $("body").css("overflow", bodyOverflow);
      };

      var $sidebar = $(this);
      var setSidebarWidth = function (w) {
        if (w < cfg.sidebar.width + cfg.gap) {
          return w - cfg.gap;
        } else {
          return cfg.sidebar.width;
        }
      };
      var sidebarStatus = function () {
        return $sidebar.attr(attr);
      };
      var changeSidebarStatus = function (status) {
        $sidebar.attr(attr, status);
      };

      var $mask = $("<div>").attr(attr, "mask");
      var createMask = function () {
        $mask.appendTo("body").css(maskStyle);
      };
      var showMask = function () {
        $mask.fadeIn(duration);
      };
      var hideMask = function () {
        $mask.fadeOut(duration);
      };

      var $trigger = $(cfg.selectors.trigger);
      var quitter = !cfg.selectors.quitter ? "a" : cfg.selectors.quitter;
      var w = $(window).width();

      var events = {
        on: {
          animation: {
            open: function () {
              showMask();
              changeSidebarStatus("opened");

              cfg.events.on.animation.open();
            },
            close: function () {
              hideMask();
              changeSidebarStatus("closed");

              cfg.events.on.animation.close();
            },
            both: function () {
              cfg.events.on.animation.both();
            },
          },
        },

        callbacks: {
          animation: {
            open: function () {
              if (scrollCfg) {
                freezePage();
              }

              cfg.events.callbacks.animation.open();
            },
            close: function () {
              if (scrollCfg) {
                unfreezePage();
              }

              cfg.events.callbacks.animation.close();
            },
            both: function () {
              cfg.events.callbacks.animation.both();
            },
          },
        },
      };

      var animateOpen = function () {
        var callbacks = function () {
          events.callbacks.animation.open();
          events.callbacks.animation.both();
        };

        animation[align] = 0;

        $sidebar.animate(animation, duration, easing, callbacks);

        events.on.animation.open();
        events.on.animation.both();
      };
      var animateClose = function () {
        var callbacks = function () {
          events.callbacks.animation.close();
          events.callbacks.animation.both();
        };

        animation[align] = -$sidebar.width();

        $sidebar.animate(animation, duration, easing, callbacks);

        events.on.animation.close();
        events.on.animation.both();
      };

      sbStyle = {
        position: "fixed",
        top: parseInt(cfg.top),
        bottom: 0,
        width: setSidebarWidth(w),
        zIndex: cfg.zIndex,
      };

      sbStyle[align] = "closed" === init ? -setSidebarWidth(w) : 0;

      if (scrollCfg && "opened" === init) {
        freezePage();
      }

      $sidebar.css(sbStyle).attr(attr, init); 

      pvtMaskStyle = {
        position: "fixed",
        top: parseInt(cfg.top),
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: cfg.zIndex - 1,
        display: "none",
      };

      pvtMaskStyle.display = "opened" === init ? "block" : "none";

      maskStyle = $.extend(true, pvtMaskStyle, cfg.mask.css);

      if (cfg.mask.display) {
        createMask();
      }

      $trigger.click(function () {
        switch (sidebarStatus()) {
          case "opened":
            animateClose();
            break;
          case "closed":
            animateOpen();
            break;
        }
      });

      $mask.click(animateClose);
      $sidebar.on("click", quitter, animateClose);

      $(window).resize(function () {
        var w = $(window).width();

        $sidebar.css("width", setSidebarWidth(w));

        if ("closed" === sidebarStatus()) {
          $sidebar.css(align, -$sidebar.width());
        }
      });
    });
  };
});
