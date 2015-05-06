# simplesidebar-v2

The second generation of [simple-sidebar](http://www.github.com/dcdeiv/simple-sidebar), a simple plugin for jQuery sidebars.

## Support:
<a href="https://flattr.com/submit/auto?user_id=dcdeiv&url=https%3A%2F%2Fgithub.com%2Fdcdeiv%2Fsimplesidebar-v2%2F" target="_blank"><img src="//button.flattr.com/flattr-badge-large.png" alt="Flattr this" title="Flattr this" border="0"></a>

## [Demo](http://dcdeiv.github.io/simplesidebar-v2)

### simple-sidebar vs. simplesidebar-v2
* Stop supporting `subwrapper`;
* Animating only the sidebar and not the entire page;
* Support only for the right sidebar (in the future it will support the left sidebar too);

#### Why this changes?
* You should know how to let the sidebar content overflow (if not check out the [set-up tips](#set-up-tips) so to shrink the code I decided to get rid of this feature;
* Animating the entire content was often an issue, `position: fixed` and `position: absolute` elements didn't animate the way they should, so I decided to only animate the sidebar as it happens on Android;
* Support only the **right sidebar** but it will in the future!

## Set-Up tips:
This version is simpler than the first one because you won't need to do much more than this:

1) Create your sidebar:

    <div class="sidebar" id="sidebar">
    </div>
  
1.2) TIP:
To let the content of your sidebar overflow (especially when you have a lot of content in it), you have to add a `wrapper` that wraps all content.

    <div class="sidebar" id="sidebar">
      <div class="sidebar-wrapper" id="sidebar-wrapper">
      </div>
    </div>

And give it these css attributes:

    .sidebar {
      position: relative;
      height: 100%;
      overflow: auto
     }

2) Create your navigation bar. I suggest to position this navbar fixed to the top of the page so that it can be alway reachable.

    <div class="navbar" id="navbar">
    </div>
    
3) Include a button to trigger the animation:

    <div class="navbar" id="navbar">
      <span id="open-sidebar" class="button menu icon icon-hamburder"></span>
    </div>

4) Incluse the plugin just after the jQuery library, use the minified version for lighten up the code:
  
    <script src="jquery.simplesidebarv2.min.js"></script>

5) See [Options](#options) for the last step.

## OPTIONS
Here is an example of usage with all the available options. Pay attention, these options are similar but not the same as [simple-sidebar](http://www.github.com/dcdeiv/simple-sidebar)'s options:

    $( '#sidebar' ).simpleSidebarV2({
      opener: undefined,
      dataName: 'ssbv2',
    	top: 0,
    	animation: {
    		duration: 500,
    		easing: 'swing'
    	},
    	sidebar: {
    		width: 350,
    		gap: 64,
    		closingLinks: 'a',
    		css: {
    			zIndex: 3000
    		}
    	},
    	mask: {
    		css: {
    			backgroundColor: 'black',
    			opacity: 0.5,
    			filter: 'Alpha(opacity=50)'
    		}
    	}
    });

* **opener**: is the selector for the button/icon that will trigger the animation, see [Set-Up tips #3](#set-up-tips);
* **dataName**: is the `data-*` attribute to make the plugin works. If `ssbv2` is somehow causing you issues, you can change it;
* **top**: is the `position-top` of the entire plugin. You can choose whatever number you want (better if you choose it according to the navbar's height) or let it to be 0;
* **animation**
 * **duration**: the duration of the animation in milliseconds;
 * **easing**: the type of animation. For more animations include the `jQuery-UI` library and check out [this page](https://jqueryui.com/easing/). I strongly suggest not to play with easing because they haven't been tested all yet. I suggest to use simple easing like `easeOutQuit`;
* **sidebar**
 * **width**: the max width of the sidebar, this option is default to 350, please change it as you please;
 * **gap**: the gap is the space between the left margin of the sidebar and the left side of the window. It is useful if you position the plugin `top: 0`, so that the user can click that space to close the sidebar;
 * **closingLinks**: are all links or elements that close the sidebar. I suggest to choose a class and give it to all links and other elements such as icons, banner, images, etc, that are links. By default it is `a` so every link in the sidebar will close the sidebar;
 * **css** here you can store all css, anyway I suggest not to add more css attributes to the one below;
  * **zIndex*: by default is is 3000 but you have to change it to the higher z-index number in your css plus 1;
* **mask**
 * **css** here you can store all css attributes to give the mask div. However I suggest to do it in your css file except for these below. You can call this div by its data attribute ex: `[data-ssbv2="mask"]`;
  * **backgroundColor** the color of the mask. By default is `'black'`;
  * **opacity* by default is 0.5;
  * **filter** IE opacity 0.5 = 50 and so on: `'Alpha(opacity=50)'`.

## Enjoy!
