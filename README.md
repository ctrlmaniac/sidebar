simpler-sidebar
===
[![Join the chat at https://gitter.im/simple-sidebar/simpler-sidebar](https://badges.gitter.im/simple-sidebar/simpler-sidebar.svg)](https://gitter.im/simple-sidebar/simpler-sidebar?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/simple-sidebar/simpler-sidebar.svg?branch=master)](https://travis-ci.org/simple-sidebar/simpler-sidebar)
[![GitHub version](https://badge.fury.io/gh/simple-sidebar%2Fsimpler-sidebar.svg)](https://badge.fury.io/gh/simple-sidebar%2Fsimpler-sidebar)
[![Bower version](https://badge.fury.io/bo/simpler-sidebar.svg)](https://badge.fury.io/bo/simpler-sidebar)
[![npm version](https://badge.fury.io/js/simpler-sidebar.svg)](https://badge.fury.io/js/simpler-sidebar)
[![MIT and GPL-2.0 license](https://img.shields.io/badge/license-MIT%20and%20GPL--2.0-blue.svg)](#license)


A jQuery plugin that allows to *create a side nav* as in modern mobile apps. It aims to *simplicity* so that *everybody can use it* no matter if expert programmers or not.

## Latest Release
* **v2.0.1** (2016-07-26):
  * Improved options list.
  * Fix the multiple instances bug.
  * Add the ability to set custom functions to run when/after all the animations are triggered. [#21](https://github.com/simple-sidebar/simpler-sidebar/issues/21)-[#22](https://github.com/simple-sidebar/simpler-sidebar/pull/22).
  * Add the ability to scroll the page when the sidebar is opened. [#16](https://github.com/simple-sidebar/simpler-sidebar/issues/16).
  * Add more detailed and improved docs stored in the [doc](https://github.com/simple-sidebar/simpler-sidebar/tree/master/doc) folder.

Before updating your local simpler-sidebar package, be sure to read the [changelog](https://github.com/simple-sidebar/simpler-sidebar/blob/master/doc/changelogs). **Upgrading without migrating will broke your scripts**.

## Navigate
- [Download](#download)
- [Getting Started](#getting-started)
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
            trigger: ".toggle-sidebar",
            quitter: "close-sidebar"
          }
        } );
    } );
</script>
```

## Options
To customize the plugin, add the desired option in the plugin itself.

The options are stored in a javascript object, so you have to take care of javascript grammar while tweaking the plugin.

```javascript
$( "#sidebar" ).simplerSidebar( {
    selectors: {
        trigger: ".toggle-sidebar",
        quitter: "close-sidebar"
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
Help me improve simplerSidebar and make it as perfect as possible, but first read the [contribution guidelines](https://github.com/simple-sidebar/simpler-sidebar/blob/master/doc/CONTRIBUTING.md).

## Release History
Check out all releases in the [Release History](https://github.com/simple-sidebar/simpler-sidebar/blob/master/doc/RELEASES.md) documentation page.

Before updating your local simpler-sidebar package, be sure to read the [changelog](https://github.com/simple-sidebar/simpler-sidebar/blob/master/doc/changelogs) too. **Upgrading without migrating will broke your scripts**.

## License
Copyright (c) 2015 - 2016 simple-sidebar, Davide Di Criscito.

Dual licensed under the [MIT](LICENSE-MIT) and [GPL-2.0](LICENSE-GPL) licenses.
