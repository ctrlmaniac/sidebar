# Release History

Before updating your local simpler-sidebar package, be sure to read the [changelog](https://github.com/simple-sidebar/simpler-sidebar/blob/master/doc/changelogs) too, especially the [latest major update changelog](https://github.com/simple-sidebar/simpler-sidebar/blob/master/doc/changelogs/v2.0.2.md). **Upgrading without migrating will broke your scripts**.

## Latest Release
* **v2.2.5** (2018-03-05):
  * update dependencies

## Older Releases
* **v2.2.4** (2018-01-03):
  * Change the 'unfreezePage' value of 'overflow' to support IE [#33](https://github.com/simple-sidebar/simpler-sidebar/issues/33).
* **v2.2.3** (2017-11-13):
  * Change the 'unfreezePage' value of 'overflow' to 'initial'.
* **v2.2.2** (2017-06-22):
  * Add support to yarn.
* **v2.2.1** (2017-06-21):
  * Fix example and add a vital tip.
* **v2.2.0** (2016-12-05):
  * Add support for UMD/AMD.
  * Fix scroll disabled when init is set to opened.
  * Improve demos.
* **v2.1.4** (2016-08-13):
  * [#27](https://github.com/simple-sidebar/simpler-sidebar/issues/27) Fix "init: opened" issue
  * Tested with **jQuery v3.1.0**
  * Tested with **jQuery v2.2.4**
  * Update demo directory
* **v2.0.4** (2016-08-08):
  * Fixed `quitter` selector.
  * Add `grunt watch` task.
  * Add the issue template for github.
  * Move `CONTRIBUTING.md` to the root directory.
* **v2.0.2** (2016-07-26):
  * Improved options list.
  * Fix the multiple instances bug.
  * Add the ability to set custom functions to run when/after all the animations are triggered. [#21](https://github.com/simple-sidebar/simpler-sidebar/issues/21)-[#22](https://github.com/simple-sidebar/simpler-sidebar/pull/22);
  * Add the ability to scroll the page when the sidebar is opened. [#16](https://github.com/simple-sidebar/simpler-sidebar/issues/16);
  * Add more detailed and improved docs stored in the [doc](https://github.com/simple-sidebar/simpler-sidebar/tree/master/doc) folder.
  * Fix npm package which ignored the doc folder.
* **v1.4.11** (2016-05-02) -
  * Add support to Travis-ci.
  * Add support to jQuery v1.12.2.
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
