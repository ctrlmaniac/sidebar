simpler-sidebar
===
[![Join the chat at https://gitter.im/dcdeiv/simpler-sidebar](https://badges.gitter.im/dcdeiv/simpler-sidebar.svg)](https://gitter.im/dcdeiv/simpler-sidebar?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![GitHub version](https://badge.fury.io/gh/dcdeiv%2Fsimpler-sidebar.svg)](https://badge.fury.io/gh/dcdeiv%2Fsimpler-sidebar)
[![Bower version](https://badge.fury.io/bo/simpler-sidebar.svg)](https://badge.fury.io/bo/simpler-sidebar)
[![npm version](https://badge.fury.io/js/simpler-sidebar.svg)](https://badge.fury.io/js/simpler-sidebar)
[![MIT and GPL-2 license](https://img.shields.io/badge/license-MIT%20and%20GPL--2.0-blue.svg)](#license)
[![Build Status](https://travis-ci.org/dcdeiv/simpler-sidebar.svg?branch=master)](https://travis-ci.org/dcdeiv/simpler-sidebar)

A jQuery plugin that allows to *create a side nav* as in modern mobile apps. It aims to *simplicity* so that *everybody can use it* no matter if expert programmers or not.

**simpler-sidebar** is a fork of [*simple-sidebar*](https://github.com/dcdeiv/simple-sidebar).

- [Download](#download)
- [Getting Started](#getting-started)
- [Options](#options)
  - [Options List](#options-list)
- [Contributing](#contributing)
- [Release History](#release-history)
- [License](#license)

***
## Download
Run one of these commands in your bash according to your needs.

`git clone https://github.com/dcdeiv/simpler-sidebar.git`

`bower install simpler-sidebar`

`npm install simpler-sidebar`

Or download the latest version from the [releases](https://github.com/dcdeiv/simpler-sidebar/releases) page.

If you are updating, remember to read the [Release History](#release-history) and to check for incompatibility issues.

## Getting Started
You will need to prepare a specific HTML template in order to make it work properly. The code below is just an example from which you can and have to draw inspiration. Along with this plugin you are provided with some demo pages in the [demo](/demo) directory.

```html
<div id="navbar">
  <!--
  #navbar is positioned fixed.

  It does not matter what element #toggle-sidebar is, give it a selector (in this example #toggle-sidebar).
  -->
  <span id="toggle-sidebar" class="button icon"></span>
</div>

<div id="sidebar">
  <!--
  simpler-sidebar will handle #sidebar's position.

  To let the content of your sidebar overflow, especially when you have a lot of content in it, you have to add a "wrapper" that wraps all content.
  -->
  <div id="sidebar-wrapper" class="sidebar-wrapper">
    <!--
    Links below are just an example. Give each clickable element, for example links, a class to trigger the closing animation.
    -->
    <a class="close-sidebar" href="#">Link</a>
    <a class="close-sidebar" href="#">Link</a>
    <a class="close-sidebar" href="#">Link</a>
    <a class="close-sidebar" href="#">Link</a>
  </div>
</div>
```

If you add the sidebar-wrapper (and you should), remember to give it this style attributes:

```css
.sidebar-wrapper {
  position: relative;
  height: 100%;
  overflow: auto;
}
```

At the bottom of the web page, just before the `</body>` tag, include the **jQuery** library. If you are interested in better *easing*, include the **jQuery-UI** library too. Eventually include simpler-sidebar.

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
<script src="simpler-sidebar/dist/jquery.simpler-sidebar.min.js"></script>
```

Call the simpler-sidebar plugin function and fill it with the options you need. Here is an example of some required options. Read the [Options](#options) section for further informations.

```html
<script>
    $( document ).ready( function() {
        $( "#sidebar" ).simplerSidebar( {
            opener: "#toggle-sidebar",
            sidebar: {
                align: "left", //or "right" - This option can be ignored, the sidebar will automatically align to right.
                width: 300, //You can ignore this option, the sidebar will automatically size itself to 300px.
                closingLinks: ".close-sidebar" // If you ignore this option, the plugin will look for all links and this can be buggy. Choose a class for every object inside the sidebar that once clicked will close the sidebar.
            }
        } );
    } );
</script>
```

## Options
You can access options in two ways.

The first way is to add an option in the plugin itself. For example:

```javascript
$( "#sidebar" ).simplerSidebar( {
    opener: "#toggle-sidebar",
    animation: {
        duration: 1000,
        easing: "easeOutQuint"
    },
    sidebar: {
        align: "right",
        width: 500,
        closingLinks: ".close"
    },
    mask: {
        display: false
    }
} );
```

The second way to access options is by using the following key:

`$.fn.simplerSidebar.settings`

After this key, you have to add the proper option, for example:

`$.fn.simplerSidebar.settings.animation.duration = 1000`

All keys must be put above the main plugin function and there should not be duplicates between them since keys override the options in the plugin function. Read the [Options List](#options-list) for further informations about all available options.

According to the example above, here is the other way to tweak options by using the key:

```javascript
$.fn.simplerSidebar.settings.animation.duration = 1000;

$.fn.simplerSidebar.settings.animation.easing = "easeOutQuint";
$.fn.simplerSidebar.settings.sidebar.align = "right";
$.fn.simplerSidebar.settings.sidebar.width = 500;
$.fn.simplerSidebar.settings.sidebar.closingLinks = ".close";
$.fn.simplerSidebar.settings.mask.display = false;

$( "#sidebar" ).simplerSidebar( {
    opener: "#toggle-sidebar",
} );
```

You can also override multiple options by using the key but it is not safe and it could be buggy, especially when you try to override `sidebar`. However you can safely override `css` such as `$.fn.simplerSidebar.settings.mask.css`, for example:

```javascript
$.fn.simplerSidebar.settings.mask.css = {
    backgroundColor: "black",
    opacity: 0.5,
    filter: "Alpha(opacity=50)"
};
```

### Options List
* **opener**: selector for the button/icon that will trigger the animation.
* **attr**: is the `data-*` attribute that makes the plugin works. If `simplersidebar` is somehow causing you issues, you can change it.
* **top**: is the `position-top` of the entire plugin. You can choose whatever number you want (better if you choose it according to the navbar"s height) or let it be 0 by ignoring it.
* **animation**:
  * **duration**: the duration of the animation in milliseconds.
  * **easing**: the type of animation. For more animations include the *jQuery-UI* library and check out [this page](https://jqueryui.com/easing/). I strongly suggest not to play with easing because they haven"t been tested all yet. I suggest to use simple easing like `easeOutQuint`.
* **sidebar**:
  * **align**: default is `undefined` which means that is aligned to *right*. If you want to align it to left, write `left`.
  * **width**: the max width of the sidebar, this option is default to 300, please change it as you please.
  * **gap**: the gap is the space between the left margin of the sidebar and the left side of the window (and viceversa). It is useful so that the user can click that space to close the sidebar.
  * **closingLinks**: links or elements that close the sidebar. I suggest to choose a class and give it to all links and other elements such as icons, banner, images, etc, that are links or that are supposed to be clicked. By default it is `a` so every link in the sidebar will close the sidebar. You can use multiple selectors too but, avoid using nested selector otherwise the function will be triggered twice. For example you can select `"a, .close-sidebar"` but if an element is `<a class=".close-sidebar">` the animation will be triggered twice.
  * **css**: here you can store all css, anyway I suggest not to add more css attributes to the one below.
    * **zIndex**: by default is is 3000 but you have to change it to the higher z-index number in your css plus 1.
* **mask**:
  * **display**: `true` or `false`. `false` will remove this option.
  * **css**: here you can store all css attributes to give the mask div. However I suggest to do it in your css file except for these below. You can call this div by its data attribute for example: `[data-simplersidebar="mask"]`.
    * **backgroundColor**: the color of the mask. By default is `"black"`.
    * **opacity**: by default is 0.5.
    * **filter**: IE opacity 0.5 = 50 and so on: `"Alpha(opacity=50)"`.

## Contributing
Help me improve simpler-sidebar and make it as perfect as possible, but first read the [contribution guidelines](CONTRIBUTING.md).

## Release History
* **v1.4.9** (2016-02-17) -
  * Add Gitter chat badge. Join the chat [here](https://gitter.im/dcdeiv/simpler-sidebar).
  * Add `.editorconfig` to maintain consistency in the coding style.
    * Please, download the [editorconfig plugin](http://editorconfig.org/#download) for your favourite editor if you want to contribute.
  * Fix coding style according to the jQuery coding style guidelines.
  * Add console errors for `sidebar.align` and `mask.display`.
* **v1.4.5** (2016-01-22) -
  * Update copyright.
  * Add support to jQuery v1.12.0.
* **v1.4.3** (2015-12-13) -
  * Add support to jQuery v1.11.3.
  * Rename `tests` folder to `demo`.
  * Rename demo pages.
  * Fix README ([#14](https://github.com/dcdeiv/simpler-sidebar/issues/14)).
  * Release under MIT and GPL-2.0 licenses.
* **v1.4.0** (2015-08-19) - Fix resize issue [#7](https://github.com/dcdeiv/simpler-sidebar/issues/7).
* **v1.3.4** (2015-07-08) - Enhancement in the README.md, package.json, and bower.json files.
* **v1.3.3** (2015-07-02) -
  * Add Grunt. Simpler-Sidebar files are moved to `dist/` and renamed to *jquery.simpler-sidebar.js* and *jquery.simpler-sidebar.min.js*.
  * Fix *sidebar.closingLinks* and *sidebar.align*.
* **v1.2.3** (2015-06-23) - Fix animations functions.
* **v1.2.2** (2015-06-16) - Add jQuery as dependency of NPM and Bower ([#3](https://github.com/dcdeiv/simpler-sidebar/pull/3))
* **v1.2.0** (2015-05-18) - Add support to AJAX and *mask.display*, change *dataName* to *attr*;
* **v1.1.1** (2015-05-15) - Add support to *left sidebar*.
* **v1.0.0** (2015-05-14) - Initial release.

## License
Copyright (c) 2015 - 2016 Davide Di Criscito

Dual licensed under the [MIT](LICENSE-MIT) and [GPL-2.0](LICENSE-GPL) licenses.
