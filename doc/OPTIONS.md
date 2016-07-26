# OPTIONS

The options are stored in a javascript object.

```javascript
var options = {
  attr: "simplersidebar",
  init: "closed",
  top: 0,
  align: "right",
  gap: 64,
  animation: {
    duration: 500,
    easing: "swing"
  },
  selectors: {
    trigger: "",
    quitter: "a"
  },
  sidebar: {
    width: 300
  },
  mask: {
    display: true,
    css: {
      backgroundColor: "black",
      opacity: 0.5,
      filter: "Alpha(opacity=50)"
    }
  },
  events: {
    on: {
      animation: {
        open: "",
        close: "",
        both: ""
      }
    },
    callbacks: {
      animation: {
        open: "",
        close: "",
        both: "",
        freezePage: true
      }
    }
  }
};
```
You can store your options in a variable and pass it to the plugin or write them directly in it. See [demos](https://github.com/simple-sidebar/simpler-sidebar/tree/master/demo).

## attr
Type: `String`
Default: `simplersidebar`

The html attr that is added to specific elements in order to make them selecteble and tweakable. Assign different values to attr if you run multiple instances.


## init
Type: `String`
Default: `closed`

Values:
- `opened` - the sidebar is opened when the page is loaded for the first time
- `closed` - the sidebar is closed when the page is loaded for the first time

The first initialization of the plugin.

## top
Type: `Number`
Default: `0`

Add the amount of px used by the top navbar if you want the navbar to be always displayed.

## align
Type: `String`
Default: `right`

Values:
- `right`
- `left`

Change the sidebar position.

## gap
Type: `Number`
Default: `64`

The gap in pixel between the window and the sidebar left side (or right according to the chosen align, ie: right-aligned side left, left-aligned right side).

## animation
Type: `Object`
Default :
```javascript
animation: {
    duration: 500,
    easing: `easeOutQuint`
}
```

The object that stores all animations option.

### animation.duration
Type: `Number`
Default: `500`

Milliseconds.

### animation.easing
Type: `String`
Default: `swing`

Include `jquery-ui` for better easing. The best easing is `easeOutQuint` which is only available in the `jquery-ui` library.

## selectors
Type: `Object`
Default:
```javascript
selectors: {
    trigger: "",
    quitter: "a"
}
```

**required**
The object that stores all available selectors.

### selectors.trigger
Type: `String`
Default: `""`
**required**

This select the html item that will trigger the animation. The item can be a menu icon for example. See the [demo](https://github.com/simple-sidebar/simpler-sidebar/tree/master/demo) page for a proper example.

### selectors.quitter
Type: `String`
Default: `a`
**recommended**

By default it will select all `a` elements in the sidebar. However you should choose assign a class to all elements in the sidebar that will trigger the closing animation, even links, in order to avoid using the `a` selector. See the [demo](https://github.com/simple-sidebar/simpler-sidebar/tree/master/demo) page for a proper example.

## sidebar
Type: `Object`
Default:
```javascript
sidebar: {
    width: 300
}
```

All sidebar options.

### sidebar.width
Type: `Number`
Default: `300`

The width musn't be overridden by common stylesheets on inline css. If you want to change the sidebar width, just edit the amount in pixels.

# mask:
Type: `Object`
Default:
```javascript
mask: {
    display: true,
    css: {
        backgroundColor: "black"
        opacity: 0.5
        filter: "Alpha(opacity=50)" // IE opacity fix
    }
}
```

The *mask* is a div that will add an overlay to the content beneath the sidebar while the sidebar is opened.

### mask.display
Type: `Boolean`
Default: `true`

Values:
- `true` - shows the mask
- `false` - hide the mask

### mask.css
Type: `Object`
Default:
```javascript
mask: {
    css: {
    backgroundColor: "black"
    opacity: 0.5
    filter: "Alpha(opacity=50)" // IE opacity fix
}
```

A javascript object that stores all css attributes. If you don't need to change the attributes above, use a simple stylesheet.

## events
Type: `Object`
Default:
```javascript
events: {
    on: {
        animation: {
            open: function() {},
            close: function() {},
            both: function() {}
        }
    },
    callbacks: {
        animation: {
            open: function() {},
            close: function() {},
            both: function() {},
            freezePage: true
        }
    }
},
```

The object that stores all custom events that are triggered when/after another not custom event, for example an animation.
**All events must be functions**.

### events.on
Type: `Object`
Default:
```javascript
events: {
    on: {
        animation: {
            open: function() {},
            close: function() {},
            both: function() {}
        }
    }
}
```

Events fired along with an event.

#### events.on.animation
Type: `Object`
Default:
```javascript
events: {
    on: {
        animation: {
            open: function() {},
            close: function() {},
            both: function() {}
        }
    }
}
```

Events fired along the animations.

##### events.on.animation.open
Type: `Function`
Default: `function() {}`

Events fired along the opening animation.

##### events.on.animation.close
Type: `Function`
Default: `function() {}`

Events fired along the closing animation.

##### events.on.animation.both
Type: `Function`
Default: `function() {}`

Events fired along both opening and closing animations.

### events.callbacks
Type: `Object`
Default:
```javascript
events: {
    callbacks: {
        animation: {
            open: function() {},
            close: function() {},
            both: function() {}
            freezePage: true
        }
    }
}
```

Events fired after an event.

#### events.callbacks.animation
Type: `Object`
Default:
```javascript
events: {
    callbacks: {
        animation: {
            open: function() {},
            close: function() {},
            both: function() {}
            freezePage: true
        }
    }
}
```

Events fired after the animations.

##### events.callbacks.animation.open
Type: `Function`
Default: `function() {}`

Events fired after the opening animation.

##### events.callbacks.animation.close
Type: `Function`
Default: `function() {}`

Events fired after the closing animation.

##### events.callbacks.animation.both
Type: `Function`
Default: `function() {}`

Events fired after both opening and closing animations.

##### events.callbacks.animation.freezePage
Type: `Boolean`
Default: `true`

Values:
- `true` - Freeze the page while the sidebar is opened in order to disallow scrolling
- `false` - Allow scrolling
