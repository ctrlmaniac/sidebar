simpler-sidebar
===
[![Join the chat at https://gitter.im/simple-sidebar/simpler-sidebar](https://badges.gitter.im/simple-sidebar/simpler-sidebar.svg)](https://gitter.im/simple-sidebar/simpler-sidebar?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/simple-sidebar/simpler-sidebar.svg?branch=master)](https://travis-ci.org/simple-sidebar/simpler-sidebar)
[![GitHub version](https://badge.fury.io/gh/simple-sidebar%2Fsimpler-sidebar.svg)](https://badge.fury.io/gh/simple-sidebar%2Fsimpler-sidebar)
[![Bower version](https://badge.fury.io/bo/simpler-sidebar.svg)](https://badge.fury.io/bo/simpler-sidebar)
[![npm version](https://badge.fury.io/js/simpler-sidebar.svg)](https://badge.fury.io/js/simpler-sidebar)
[![MIT and GPL-2.0 license](https://img.shields.io/badge/license-MIT%20and%20GPL--2.0-blue.svg)](#license)

A jQuery plugin that allows to *create a side nav* as in modern mobile apps. It aims to *simplicity* so that *everybody can use it* no matter if expert programmers or not.

## :muscle: works with
- [x] jQuery v1.12.4
- [x] jQuery v2.2.4
- [x] jQuery v3.1.0

## Latest Release
* **v2.2.4** (2018-01-03):
  * Change the 'unfreezePage' value of 'overflow' to support IE [#33](https://github.com/simple-sidebar/simpler-sidebar/issues/33).

* **v2.2.3** (2017-11-13):
  * Change the 'unfreezePage' value of 'overflow' to 'initial'.

### Important notes about the latest release
If you are still using the **v1.x.x**, please, consider to update the plugin to the latest **v2.x.x**.

Before updating your local simpler-sidebar package, be sure to read the [changelog](https://github.com/simple-sidebar/simpler-sidebar/blob/master/doc/changelogs) too, especially the [latest major update changelog](https://github.com/simple-sidebar/simpler-sidebar/blob/master/doc/changelogs/v2.0.2.md). **Upgrading without migrating will broke your scripts**.

## Navigate
- [Download](#download)
- [Getting Started](#getting-started)
  - [Browserify](#browserify)
- [Options](#options)
  - [Options List](#options-list)
- [Contributing](#contributing)
- [Release History](#release-history)
- [License](#license)

## Download
Run one of these commands in your bash according to your needs.

`git clone https://github.com/simple-sidebar/simpler-sidebar.git`

`bower install simpler-sidebar`

`npm install simpler-sidebar`

Or download the latest version from the [releases](https://github.com/simple-sidebar/simpler-sidebar/releases) page.

If you are updating, remember to read the [Release History](#release-history) and to check for incompatibility issues.

## Getting Started
You will need to prepare a specific HTML template in order to make it work properly. The code below is just an example from which you can and have to draw inspiration. Along with this plugin you are provided with some demo pages in the [demo](https://github.com/simple-sidebar/simpler-sidebar/tree/master/demo) directory.

```html
<div id="navbar">
  <!--
  #navbar is positioned fixed.

  It does not matter what kind of element #toggle-sidebar is.
  -->
  <span id="toggle-sidebar" class="button icon">ITEM</span>
</div>

<div id="sidebar">
  <!--
  simpler-sidebar will handle #sidebar's position.

  To let the content of your sidebar overflow, especially when you have a lot of content in it, you have to add a "wrapper" that wraps all content.

  TIP: provide a background color.
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
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
<script src="simpler-sidebar/dist/jquery.simpler-sidebar.min.js"></script>
```

Call the simpler-sidebar plugin function and fill it with the options you need. Here is an example of some required options. Read the [Options](#options) section for further informations.

```html
<script>
    $( document ).ready( function() {
        $( "#sidebar" ).simplerSidebar( {
            selectors: {
                trigger: "#toggle-sidebar",
                quitter: ".close-sidebar"
            }
        } );
    } );
</script>
```

### Browserify

If you wish to use the simpler-sidebar package with browserify you should do few things to make it work. Firstly you need to install `browserify`, `browserify-shim` and the `simpler-sidebar` packages.

In your `package.json` file you should add the `browserify-shim` options in this way:

```json
{
  "browser": {
    "jquery": "./path/to/jquery/jquery.js",
    "jquery-ui-browserify": "./path/to/jquery-ui/jquery-ui.js",
    "simpler-sidebar": "./path/to/simpler-sidebar/dist/jquery.simpler-sidebar.js"
  },
  "browserify-shim": {
    "jquery": "window.$",
    "three": "global:THREE",
    "jquery-ui-browserify": {
      "depends": ["jquery:window.$"],
      "exports": "window.$.ui"
    },
    "simpler-sidebar": {
      "depends": ["jquery:window.$"],
      "exports": "window.$.simplerSidebar"
    }
  },
  "browserify": {
    "transform": [ "browserify-shim" ]
  }
}
```

In the raw file to bundle you should put this code:

```javascript
// Jquery
window.$ = window.jQuery = require( "jquery" );

// Jquery-ui is currently unavailable with browserify
// You must use this module instead
window.$.ui = require( "jquery-ui-browserify" );

// Importing sidebarbones
window.$.sidebarBones = require( "simpler-sidebar" );

// custom options
$( "document" ).ready( function() {
	$( "#sidebar" ).simplerSidebar( {
		attr: "sidebar-main",
    selectors: {
        trigger: "#toggle-sidebar",
        quitter: ".close-sidebar"
    },
		animation: {
			easing: "easeOutQuint"
		}
	} );
} );
```

Then in the shell run this command `browserify -d raw-file.js > bundled.js`

## Options
To customize the plugin, add the desired option in the plugin itself.

The options are stored in a javascript object, so you have to take care of javascript grammar while tweaking the plugin.

```javascript
$( "#sidebar" ).simplerSidebar( {
    selectors: {
        trigger: "#toggle-sidebar",
        quitter: ".close-sidebar"
    },
    animation: {
        easing: "easeOutQuint"
    },
    sidebar: {
        width: 500
    },
    mask: {
        display: false
    }
} );
```

### Options List
Check out all available options in the [options list documentation](https://github.com/simple-sidebar/simpler-sidebar/blob/master/doc/OPTIONS.md) page too and use the example above as reference.

## Contributing
Help me improve simplerSidebar and make it as perfect as possible, but first read the [contribution guidelines](https://github.com/simple-sidebar/simpler-sidebar/blob/master/CONTRIBUTING.md).

## Release History
Check out all releases in the [Release History](https://github.com/simple-sidebar/simpler-sidebar/blob/master/doc/RELEASES.md) documentation page.

If you are still using the **v1.x.x**, please, consider to update the plugin to the latest **v2.x.x**.

Before updating your local simpler-sidebar package, be sure to read the [changelog](https://github.com/simple-sidebar/simpler-sidebar/blob/master/doc/changelogs) too, especially the [latest major update changelog](https://github.com/simple-sidebar/simpler-sidebar/blob/master/doc/changelogs/v2.0.2.md). **Upgrading without migrating will broke your scripts**.

## License
Copyright (c) 2015 - 2017 simple-sidebar, Davide Di Criscito.

Dual licensed under the [MIT](https://github.com/simple-sidebar/simpler-sidebar/blob/master/LICENSE-MIT) and [GPL-2.0](https://github.com/simple-sidebar/simpler-sidebar/blob/master/LICENSE-GPL) licenses.
