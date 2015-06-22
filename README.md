# simpler-sidebar 

[![Flattr Button](https://button.flattr.com/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=dcdeiv&url=https%3A%2F%2Fgithub.com%2Fdcdeiv%2Fsimpler-sidebar)

The second generation of [simple-sidebar](http://www.github.com/dcdeiv/simple-sidebar), A simple jQuery sidebar.

[![NPM](https://nodei.co/npm/simpler-sidebar.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/simpler-sidebar/)

**Bower**: `bower install simpler-sidebar`.

## Demo:
* [HomePage](http://dcdeiv.github.io/simpler-sidebar);
* [Demo Right](http://dcdeiv.github.io/simpler-sidebar/right);
* [Demo Right-Top](http://dcdeiv.github.io/simpler-sidebar/right-top);
* [Demo Left](http://dcdeiv.github.io/simpler-sidebar/left);
* [Demo Left-Top](http://dcdeiv.github.io/simpler-sidebar/left-top);

### Update:
* Added support to AJAX;
* New options:
 * **dataNate** changed to **attr**;
 * **mask.display**.

### simple-sidebar vs. simpler-sidebar
* Stop supporting `subwrapper`;
* Animating only the sidebar and not the entire page;

#### Why this changes?
* You should know how to let the sidebar content overflow (if not check out the [set-up tips](#set-up-tips)) so to shrink the code I decided to get rid of this feature;
* Animating the entire content was often an issue, `position: fixed` and `position: absolute` elements didn't animate the way they should, so I decided to only animate the sidebar;

## Set-Up tips:
This version is simpler than the first one because you won't need to do much more than this:

1) Create your sidebar:

    <div class="sidebar" id="sidebar">
    </div>
  
2) TIP:
To let the content of your sidebar overflow (especially when you have a lot of content in it), you have to add a `wrapper` that wraps all content.

    <div class="sidebar" id="sidebar">
      <div class="sidebar-wrapper" id="sidebar-wrapper">
      </div>
    </div>

And give it these css attributes:

    .sidebar-wrapper {
      position: relative;
      height: 100%;
      overflow: auto
     }

3) Create your navigation bar. I suggest to position this navbar fixed to the top of the page so that it can be alway reachable.

    <div class="navbar" id="navbar">
    </div>
    
4) Include a button to trigger the animation. This button must be alinged to left or right according to the sidebar align (see [options](#options):

    <div class="navbar" id="navbar">
      <span id="open-sidebar" class="button menu icon icon-hamburger"></span>
    </div>

5) Include the plugin just after the jQuery library, use the minified version for lighten up the code:
  
    <script src="simpler-sidebar/simpler-sidebar.min.js"></script>

6) See [Options](#options) for the last step.

## OPTIONS
Here is an example of usage with all the available options. Pay attention, these options are similar but not the same as [simple-sidebar](http://www.github.com/dcdeiv/simple-sidebar)'s options:

    $( '#sidebar' ).simplerSidebar({
        opener: undefined,
        attr: 'simplersidebar',
        top: 0,
        animation: {
            duration: 500,
            easing: 'swing'
        },
        sidebar: {
            align: undefined,
            width: 350,
            gap: 64,
            closingLinks: 'a',
            css: {
                zIndex: 3000
            }
        },
        mask: {
            display: true,
            css: {
                backgroundColor: 'black',
                opacity: 0.5,
                filter: 'Alpha(opacity=50)'
            }
        }
    });

### How to use the public access to plugin options:
The base api is `$.fn.simplerSidebar.settings` see [option list](#option-list) to the full list of apis available.
	
	    $.fn.simplerSidebar.settings.top = 60,
		$.fn.simplerSidebar.settings.opener = '#the-button-selector';
		$.fn.simplerSidebar.settings.sidebar.align = 'right';
		$.fn.simplerSidebar.settings.sidebar.width = '300';
		$.fn.simplerSidebar.settings.sidebar.closingLinks = '.clode-sidebar';
		$.fn.simplerSidebar.settings.sidebar.css.zIndex = '3000';
		$.fn.simplerSidebar.settings.mask.display = 'false'
		
		$( '#sidebar' ).simpleSidebar();

If you want to override multiple options:
This way can be buggy, especially when you try to override `sidebar`, the plugin will crash.

		$.fn.simplerSidebar.settings.mask.css = {
			//your style
		};

### Option List
* **opener**: is the selector for the button/icon that will trigger the animation, see [Set-Up tips #3](#set-up-tips);
* **attr**: is the `data-*` attribute to make the plugin works. If `ssbv2` is somehow causing you issues, you can change it;
* **top**: is the `position-top` of the entire plugin. You can choose whatever number you want (better if you choose it according to the navbar's height) or let it to be 0;
* **animation**
  * **duration**: the duration of the animation in milliseconds;
  * **easing**: the type of animation. For more animations include the `jQuery-UI` library and check out [this page](https://jqueryui.com/easing/). I strongly suggest not to play with easing because they haven't been tested all yet. I suggest to use simple easing like `easeOutQuint`;
* **sidebar**
  * **align**: default is `undefined` which means that is aligned to the *right*, if you want to align it to the left, wright `left`;
  * **width**: the max width of the sidebar, this option is default to 350, please change it as you please;
  * **gap**: the gap is the space between the left margin of the sidebar and the left side of the window. It is useful when you position the plugin `top: 0`, so that the user can click that space to close the sidebar;
  * **closingLinks**: are all links or elements that close the sidebar. I suggest to choose a class and give it to all links and other elements such as icons, banner, images, etc, that are links. By default it is `a` so every link in the sidebar will close the sidebar;
  * **css** here you can store all css, anyway I suggest not to add more css attributes to the one below;
    * **zIndex**: by default is is 3000 but you have to change it to the higher z-index number in your css plus 1;
* **mask**
  * **display**: `true` or `false` when false will remove this option;
  * **css** here you can store all css attributes to give the mask div. However I suggest to do it in your css file except for these below. You can call this div by its data attribute ex: `[data-simplersidebar="mask"]`;
    * **backgroundColor** the color of the mask. By default is `'black'`;
    * **opacity** by default is 0.5;
    * **filter** IE opacity 0.5 = 50 and so on: `'Alpha(opacity=50)'`.

## Enjoy!
