"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
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
  $.fn.simplerSidebarCss3 = function (options) {
    var configs = $.extend(true, {
      quitter: "a",
      attr: "sidebar-main",
      open: false,
      align: "left",
      top: 0,
      width: 300,
      gap: 64,
      zIndex: 3000,
      freezePage: true,
      animation: {
        duration: 300,
        easing: "ease-out"
      },
      mask: {
        display: true,
        opacity: 0.5,
        css: {
          backgroundColor: "black"
        }
      },
      events: {
        onOpen: function onOpen() {},
        afterOpen: function afterOpen() {},
        onClose: function onClose() {},
        afterClose: function afterClose() {},
        always: function always() {}
      }
    }, options);
    return this.each(function () {
      var _$sidebar$attr$css;
      var $sidebar = $(this);
      var windowWidth = $(window).width();
      var baseAttr = "data-" + configs.attr;
      var sidebarAttrOpen = baseAttr + "-open";
      var setSidebarWidth = function setSidebarWidth(windowWidth) {
        return windowWidth < configs.width + configs.gap ? windowWidth - configs.gap : configs.width;
      };
      var isSidebarOpen = function isSidebarOpen() {
        return JSON.parse($sidebar.attr(sidebarAttrOpen));
      };
      var setSidebarAttrOpen = function setSidebarAttrOpen(status) {
        $sidebar.attr(sidebarAttrOpen, status);
      };
      $sidebar.attr(sidebarAttrOpen, configs.open).css((_$sidebar$attr$css = {
        display: "block",
        position: "fixed",
        top: parseInt(configs.top),
        bottom: 0,
        width: setSidebarWidth(windowWidth),
        zIndex: configs.zIndex
      }, _defineProperty(_$sidebar$attr$css, configs.align, configs.open ? 0 : -setSidebarWidth(windowWidth)), _defineProperty(_$sidebar$attr$css, "transition", "".concat(configs.align, " ").concat(configs.animation.duration / 1000, "s ").concat(configs.animation.easing)), _$sidebar$attr$css));
      var $mask = $("<div>").attr(baseAttr, "mask");
      var maskActive = {
        display: "block",
        opacity: configs.mask.opacity,
        filter: "Alpha(opacity=".concat(configs.mask.opacity * 100, ")")
      };
      var maskInactive = {
        display: "none",
        opacity: 0,
        filter: "Alpha(opacity=0)"
      };
      var maskInitialStatus = configs.open ? maskActive : maskInactive;
      var maskStyle = $.extend(true, _objectSpread(_objectSpread({
        position: "fixed",
        top: parseInt(configs.top),
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: configs.zIndex - 1
      }, maskInitialStatus), {}, {
        transition: "opacity ".concat(configs.animation.duration / 1000, "s ").concat(configs.animation.easing)
      }), configs.mask.css);
      if (configs.mask.display) {
        $mask.appendTo("body").css(maskStyle);
      }
      var onSidebarOpenEvent = function onSidebarOpenEvent() {
        if (configs.mask.display) {
          $mask.css(maskActive);
        }
        if (configs.freezePage) {
          $("body").css("overflow-y", "hidden");
        }
        setSidebarAttrOpen(true);
        configs.events.always();
        configs.events.onOpen();
      };
      var afterSidebarOpenEvent = function afterSidebarOpenEvent() {
        configs.events.always();
        configs.events.afterOpen();
      };
      var onSidebarCloseEvent = function onSidebarCloseEvent() {
        if (configs.mask.display) {
          $mask.css(maskInactive);
        }
        if (configs.freezePage) {
          $("body").css("overflow-y", "visible");
        }
        setSidebarAttrOpen(false);
        configs.events.always();
        configs.events.onClose();
      };
      var afterSidebarCloseEvent = function afterSidebarCloseEvent() {
        configs.events.always();
        configs.events.afterClose();
      };
      var openSidebar = function openSidebar() {
        onSidebarOpenEvent();
        $sidebar.css(configs.align, 0);
        setTimeout(afterSidebarOpenEvent, configs.animation.duration);
      };
      var closeSidebar = function closeSidebar() {
        onSidebarCloseEvent();
        $sidebar.css(configs.align, -setSidebarWidth(windowWidth));
        setTimeout(afterSidebarCloseEvent, configs.animation.duration);
      };
      $(configs.toggler).click(function () {
        if (isSidebarOpen()) {
          closeSidebar();
        } else {
          openSidebar();
        }
      });
      $mask.click(closeSidebar);
      $sidebar.on("click", configs.quitter, closeSidebar);
      $(window).resize(function () {
        var windowWidth = $(window).width();
        $sidebar.css("width", setSidebarWidth(windowWidth));
        if (!$sidebar.attr(sidebarAttrOpen)) {
          $sidebar.css(configs.align, -$sidebar.width());
        }
      });
    });
  };
});