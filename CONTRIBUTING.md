# Contributing

## Important notes

Please don't edit files in the `dist` subdirectory as they are generated via Gulp. You'll find source code in the `src` subdirectory!

### Code style

Regarding code style like indentation and whitespace, **follow the conventions you see used in the source already** or read the **.editorconfig** file. Regarding the _.editorconfig_ file you should install in your favourite editor the **editorconfig** plugin. With this plugin it is also shipped a `eslint` configuration file. You should install a plugin for your editor, but this is not required since it will be installed as a dev-dependency and run with gulp.

## Modifying the code

First, ensure that you have the latest [Node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed.

Test that Gulp's CLI is installed by running `gulp --version`. If the command isn't found, run `npm install -g gulp-cli`. For more information about installing Gulp, see the [getting started guide](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md).

1. Fork and clone the repo.
2. Run `npm install` to install all dependencies (including Gulp).
3. Run `gulp` to build this project.
4. Run `gulp watch` to watch all changes.
5. Run `gulp lint` to check if there are errors.

All these commands are also available in these form:

1. `npm run gulp` => `gulp`.
2. `npm run build` => start `gulp build` and `npm run bundle`.
3. `npm run test` => `gulp lint`.
4. `npm run watch` => `gulp watch`.
5. `npm run bundle` => start browserify. This is really important to check if there are error with the `bundled.js` file. See `./demo/browserify.html` and `./demo/assets/js/bundle.js`.

Assuming that you don't see any red, you're ready to go. Just be sure to run `npm run build` and `npm run bundle` after making any changes, to ensure that nothing is broken.

## Submitting pull requests

1. Create a new branch. You should not work in your `master` branch directly.
1. Fix stuff.
1. Test changes in actual browser using all the pages in the `demo` folder.
1. Update the documentation to reflect any changes.
1. Push to your fork and submit a pull request.
